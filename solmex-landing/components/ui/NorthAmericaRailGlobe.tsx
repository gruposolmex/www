'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

/**
 * COBE globe: corredor ferroviario integrado México–EE. UU.–Canadá.
 * Marcadores en puertos, cruces fronterizos e intercambiadores clave;
 * arcos como visualización ilustrativa de flujo de carga hacia puntos de procesamiento.
 */

const ORANGE: [number, number, number] = [1, 0.58, 0.23];
const ORANGE_MID: [number, number, number] = [1, 0.5, 0.2];
const ORANGE_DIM: [number, number, number] = [0.85, 0.48, 0.22];

/** Velocidad del “tren de onda” sobre la red (ilustrativo). */
const FLOW_SPEED = 1.65;
/** Desfase entre arcos para sensación de propagación. */
const ARC_STAGGER = 0.38;
const BASE_ARC_WIDTH = 0.42;
const BASE_ARC_HEIGHT = 0.26;

type ArcDef = {
  from: [number, number];
  to: [number, number];
  color: [number, number, number];
};

/**
 * Ajusta brillo RGB para pulsar el flujo (sin canal alpha en COBE).
 *
 * @param rgb - Color base en 0–1
 * @param factor - Multiplicador acotado (~0.4–1.2)
 */
function pulseRgb(
  rgb: [number, number, number],
  factor: number
): [number, number, number] {
  const f = Math.max(0.42, Math.min(1.18, factor));
  return [
    Math.min(1, rgb[0] * f + 0.04 * (f - 0.85)),
    Math.min(1, rgb[1] * f + 0.02 * (f - 0.85)),
    Math.min(1, rgb[2] * f),
  ];
}

/**
 * Construye la lista de arcos con fase animada (onda direccional ilustrativa).
 *
 * @param defs - Definiciones estáticas
 * @param t - Tiempo en segundos
 */
function arcsWithFlowPulse(defs: ArcDef[], t: number) {
  return defs.map((a, i) => {
    const wave =
      0.52 +
      0.48 * Math.sin(t * FLOW_SPEED + i * ARC_STAGGER);
    return {
      from: a.from,
      to: a.to,
      color: pulseRgb(a.color, 0.72 + 0.38 * wave),
    };
  });
}

/** Hubs ferroviarios / intermodales — lat, lng */
const H = {
  // México — puertos y corredor
  lazaro: [17.9581, -102.2003] as [number, number],
  manzanillo: [19.0543, -104.3188] as [number, number],
  veracruz: [19.1738, -96.1342] as [number, number],
  altamira: [22.3923, -97.9431] as [number, number],
  cdmx: [19.4326, -99.1332] as [number, number],
  guadalajara: [20.6597, -103.3496] as [number, number],
  monterrey: [25.6866, -100.3161] as [number, number],
  nuevoLaredo: [27.4861, -99.5072] as [number, number],
  // EE. UU. — cinturón ferroviario
  la: [34.0522, -118.2437] as [number, number],
  houston: [29.7604, -95.3698] as [number, number],
  dallas: [32.7767, -96.797] as [number, number],
  kansasCity: [39.0997, -94.5786] as [number, number],
  chicago: [41.8781, -87.6298] as [number, number],
  memphis: [35.1495, -90.049] as [number, number],
  laredoTx: [27.5306, -99.4803] as [number, number],
  elPaso: [31.7619, -106.485] as [number, number],
  // Canadá — Pacífico y corredor este
  vancouver: [49.2827, -123.1207] as [number, number],
  princeRupert: [54.3159, -130.3209] as [number, number],
  calgary: [51.0447, -114.0719] as [number, number],
  toronto: [43.6532, -79.3832] as [number, number],
  montreal: [45.5017, -73.5673] as [number, number],
};

/**
 * Arcos base: orden importa para el desfase visual del pulso.
 */
const ARC_DEFINITIONS: ArcDef[] = [
  { from: H.vancouver, to: H.calgary, color: ORANGE_DIM },
  { from: H.princeRupert, to: H.calgary, color: ORANGE_DIM },
  { from: H.calgary, to: H.chicago, color: ORANGE_MID },
  { from: H.toronto, to: H.chicago, color: ORANGE_DIM },
  { from: H.montreal, to: H.toronto, color: ORANGE_DIM },
  { from: H.chicago, to: H.kansasCity, color: ORANGE_MID },
  { from: H.kansasCity, to: H.memphis, color: ORANGE_DIM },
  { from: H.kansasCity, to: H.dallas, color: ORANGE_DIM },
  { from: H.dallas, to: H.houston, color: ORANGE_DIM },
  { from: H.dallas, to: H.laredoTx, color: ORANGE_MID },
  { from: H.la, to: H.elPaso, color: ORANGE_MID },
  { from: H.elPaso, to: H.monterrey, color: ORANGE },
  { from: H.houston, to: H.monterrey, color: ORANGE },
  { from: H.laredoTx, to: H.nuevoLaredo, color: ORANGE },
  { from: H.laredoTx, to: H.monterrey, color: ORANGE },
  { from: H.lazaro, to: H.cdmx, color: ORANGE },
  { from: H.manzanillo, to: H.guadalajara, color: ORANGE },
  { from: H.guadalajara, to: H.monterrey, color: ORANGE_MID },
  { from: H.veracruz, to: H.cdmx, color: ORANGE_MID },
  { from: H.altamira, to: H.monterrey, color: ORANGE_MID },
  { from: H.cdmx, to: H.monterrey, color: ORANGE },
  { from: H.monterrey, to: H.nuevoLaredo, color: ORANGE },
];

interface NorthAmericaRailGlobeProps {
  className?: string;
  size?: number;
}

export default function NorthAmericaRailGlobe({
  className = '',
  size = 720,
}: NorthAmericaRailGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  /** Enfoca rotación inicial hacia Norteamérica */
  const phiRef = useRef(2.85);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const onResize = useCallback(() => {
    if (canvasRef.current && globeRef.current) {
      const w = canvasRef.current.offsetWidth;
      globeRef.current.update({
        width: w * 2,
        height: w * 2,
      });
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const markers = [
      // México — nodos de procesamiento / puertos (más visibles)
      { location: H.lazaro, size: 0.065, color: ORANGE },
      { location: H.manzanillo, size: 0.065, color: ORANGE },
      { location: H.veracruz, size: 0.06, color: ORANGE },
      { location: H.altamira, size: 0.055, color: ORANGE_MID },
      { location: H.cdmx, size: 0.055, color: ORANGE_MID },
      { location: H.guadalajara, size: 0.05, color: ORANGE_MID },
      { location: H.monterrey, size: 0.06, color: ORANGE },
      { location: H.nuevoLaredo, size: 0.07, color: ORANGE },
      // EE. UU.
      { location: H.chicago, size: 0.075, color: ORANGE },
      { location: H.kansasCity, size: 0.055, color: ORANGE_MID },
      { location: H.memphis, size: 0.05, color: ORANGE_DIM },
      { location: H.la, size: 0.06, color: ORANGE_MID },
      { location: H.houston, size: 0.055, color: ORANGE_MID },
      { location: H.dallas, size: 0.052, color: ORANGE_DIM },
      { location: H.laredoTx, size: 0.065, color: ORANGE },
      { location: H.elPaso, size: 0.055, color: ORANGE_MID },
      // Canadá
      { location: H.vancouver, size: 0.058, color: ORANGE_MID },
      { location: H.princeRupert, size: 0.055, color: ORANGE_DIM },
      { location: H.calgary, size: 0.052, color: ORANGE_MID },
      { location: H.toronto, size: 0.055, color: ORANGE_MID },
      { location: H.montreal, size: 0.05, color: ORANGE_DIM },
    ];

    const t0 = performance.now() / 1000;
    const arcs = arcsWithFlowPulse(ARC_DEFINITIONS, t0);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: phiRef.current,
      theta: 0.2,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 22000,
      mapBrightness: 4.2,
      baseColor: [0.12, 0.12, 0.12],
      markerColor: ORANGE,
      glowColor: [0.06, 0.05, 0.02],
      markers,
      arcs,
      arcColor: ORANGE_MID,
      arcWidth: BASE_ARC_WIDTH,
      arcHeight: BASE_ARC_HEIGHT,
      markerElevation: 0.012,
      scale: 1.06,
      offset: [0, 0],
    });

    globeRef.current = globe;

    let animationId: number;
    const animate = () => {
      if (pointerInteracting.current !== null) {
        phiRef.current += pointerInteractionMovement.current / 200;
      } else {
        phiRef.current += 0.0016;
      }
      const t = performance.now() / 1000;
      const breath = Math.sin(t * 0.95);
      globe.update({
        phi: phiRef.current,
        arcs: arcsWithFlowPulse(ARC_DEFINITIONS, t),
        arcWidth: BASE_ARC_WIDTH + 0.07 * (0.5 + 0.5 * breath),
        arcHeight: BASE_ARC_HEIGHT + 0.045 * (0.5 + 0.5 * Math.sin(t * 0.75 + 0.4)),
      });
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      globe.destroy();
      globeRef.current = null;
      window.removeEventListener('resize', onResize);
    };
  }, [size, onResize]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          cursor: 'grab',
        }}
        width={size * 2}
        height={size * 2}
        role="img"
        aria-label="Globo del corredor ferroviario México, Estados Unidos y Canadá; arcos animados muestran flujo de carga ilustrativo entre nodos de la red"
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            pointerInteractionMovement.current =
              e.clientX - pointerInteracting.current;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            pointerInteractionMovement.current =
              e.touches[0].clientX - pointerInteracting.current;
          }
        }}
      />
    </div>
  );
}
