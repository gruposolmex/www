'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

const LatamGlobe = dynamic(() => import('@/components/ui/LatamGlobe'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full aspect-square max-w-[min(100%,420px)] bg-[#131313] animate-pulse"
      aria-hidden
    />
  ),
});

/** Indicadores en español claro (estilo tablero). */
const TICKER = [
  { value: 'Una sola red', label: 'TERMINALES_Y_PATIOS' },
  { value: 'Carga asignada', label: 'PROTOCOLOS_ESTABLECIDOS' },
  { value: 'Operación activa', label: 'SEGUIMIENTO' },
  { value: 'Con comprobante', label: 'ENTREGA' },
] as const;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.25 }
    )
      .fromTo(
        globeWrapRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.85 },
        '-=0.3'
      )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.55'
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.25'
      )
      .fromTo(tickerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col bg-[#0A0A0A] overflow-hidden"
      id="top"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,148,59,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,148,59,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="page-shell w-full flex-1 flex flex-col justify-center py-20 sm:py-24 lg:py-28 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col items-start text-left min-w-0">
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-3 mb-10 flex-wrap"
                style={{ opacity: 0 }}
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-[#FF943B] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 bg-[#FF943B]" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#8E9192] font-bold">
                  Coordinación de carga &middot; Terminales y patios &middot; Mismo
                  estándar para todos
                </span>
              </div>

              <h1
                ref={headlineRef}
                className="font-display text-[clamp(2.25rem,6vw,4.5rem)] xl:text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.96] tracking-[-0.03em] mb-8 uppercase max-w-xl xl:max-w-2xl"
                style={{ opacity: 0 }}
              >
                Carga industrial
                <br />
                coordinada en
                <br />
                <span className="text-[#FF943B]">toda la cadena.</span>
              </h1>

              <p
                ref={subRef}
                className="text-base sm:text-lg text-[#8E9192] mb-12 leading-[1.9] max-w-xl"
                style={{ opacity: 0 }}
              >
                Solmex alinea a quien mueve la carga (terminales, patios,
                intermodales) con quien la pide. Se define quién ejecuta, cuándo
                y con qué comprobante. Menos idas y vueltas: quien cumple en
                tiempo y forma sigue recibiendo volumen.
              </p>

              <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto"
                style={{ opacity: 0 }}
              >
                <a href="#contacto" className="btn-primary-industrial">
                  REGISTRAR MI TERMINAL
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="#ciclo-economico" className="btn-secondary-industrial">
                  CÓMO FUNCIONA
                </a>
              </div>
            </div>

            <div
              ref={globeWrapRef}
              className="lg:col-span-7 flex justify-center lg:justify-end"
              style={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-[min(100%,380px)] sm:max-w-[420px] lg:max-w-[min(52vw,560px)] aspect-square">
                <div
                  className="absolute inset-[-6%] rounded-full opacity-40 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,148,59,0.14) 0%, transparent 72%)',
                  }}
                  aria-hidden
                />
                <LatamGlobe className="relative z-1 w-full h-full" size={640} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={tickerRef}
        className="relative z-10 border-t border-[rgba(68,71,72,0.2)]"
        style={{ opacity: 0 }}
      >
        <div className="page-shell py-9 sm:py-11">
          <div className="flex flex-wrap items-baseline gap-x-12 gap-y-6 sm:gap-x-16">
            {TICKER.map((m) => (
              <div key={m.label} className="flex items-baseline gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-[#FF943B] tracking-[0.02em]">
                  {m.value}
                </span>
                <span className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.15em]">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
