'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

/**
 * LATAM logistics globe powered by COBE v2.
 * Markers on Mexican logistics hubs with arcs
 * depicting operational flows across the region.
 */

const MEXICO_HUBS: [number, number][] = [
  [19.4326, -99.1332],   // CDMX
  [19.1738, -96.1342],   // Veracruz
  [25.6866, -100.3161],  // Monterrey
  [20.6597, -103.3496],  // Guadalajara
  [17.9581, -102.2003],  // Lázaro Cárdenas
  [19.0543, -104.3188],  // Manzanillo
  [22.3923, -97.9431],   // Altamira
  [18.1344, -94.458],    // Coatzacoalcos
];

const LATAM_NODES: [number, number][] = [
  [-23.5505, -46.6333],  // São Paulo
  [4.711, -74.0721],     // Bogotá
  [-12.0464, -77.0428],  // Lima
  [8.9824, -79.5199],    // Panamá
  [29.7604, -95.3698],   // Houston
  [10.4806, -66.9036],   // Caracas
];

const ORANGE: [number, number, number] = [1, 0.58, 0.23];
const ORANGE_DIM: [number, number, number] = [1, 0.45, 0.15];

interface LatamGlobeProps {
  className?: string;
  size?: number;
}

export default function LatamGlobe({
  className = '',
  size = 600,
}: LatamGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(1.75);
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
      ...MEXICO_HUBS.map((loc) => ({
        location: loc as [number, number],
        size: 0.06,
        color: ORANGE,
      })),
      ...LATAM_NODES.map((loc) => ({
        location: loc as [number, number],
        size: 0.04,
        color: ORANGE_DIM,
      })),
    ];

    const arcs = [
      { from: MEXICO_HUBS[0], to: MEXICO_HUBS[1], color: ORANGE },
      { from: MEXICO_HUBS[0], to: MEXICO_HUBS[2], color: ORANGE },
      { from: MEXICO_HUBS[0], to: MEXICO_HUBS[3], color: ORANGE },
      { from: MEXICO_HUBS[1], to: MEXICO_HUBS[7], color: ORANGE_DIM },
      { from: MEXICO_HUBS[4], to: MEXICO_HUBS[5], color: ORANGE_DIM },
      { from: MEXICO_HUBS[6], to: MEXICO_HUBS[2], color: ORANGE_DIM },
      { from: MEXICO_HUBS[1], to: LATAM_NODES[3], color: ORANGE_DIM },
      { from: MEXICO_HUBS[0], to: LATAM_NODES[0], color: ORANGE_DIM },
      { from: MEXICO_HUBS[2], to: LATAM_NODES[4], color: ORANGE },
      { from: MEXICO_HUBS[0], to: LATAM_NODES[1], color: ORANGE_DIM },
      { from: MEXICO_HUBS[4], to: LATAM_NODES[2], color: ORANGE_DIM },
    ];

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 1.75,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: ORANGE,
      glowColor: [0.08, 0.06, 0.03],
      markers,
      arcs,
      arcColor: ORANGE,
      arcWidth: 0.4,
      arcHeight: 0.25,
      markerElevation: 0.01,
      scale: 1.05,
      offset: [0, 0],
    });

    globeRef.current = globe;

    let animationId: number;
    const animate = () => {
      if (pointerInteracting.current !== null) {
        phiRef.current += pointerInteractionMovement.current / 200;
      } else {
        phiRef.current += 0.002;
      }
      globe.update({ phi: phiRef.current });
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
