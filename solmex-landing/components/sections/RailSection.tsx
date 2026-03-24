'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const NorthAmericaRailGlobe = dynamic(
  () => import('@/components/ui/NorthAmericaRailGlobe'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full min-h-[280px] bg-[#0A0A0A] animate-pulse"
        aria-hidden
      />
    ),
  }
);

export default function RailSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="red" className="relative section-y bg-[#0A0A0A] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />

      <div className="relative z-10 page-shell">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-14 xl:gap-16 items-start">
          <div className="reveal lg:col-span-7 order-2 lg:order-1">
            <div className="relative bg-[#131313] aspect-16/10 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none dot-grid" />
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="relative w-full h-full max-h-[min(100%,420px)] mx-auto aspect-square max-w-[min(100%,520px)]">
                  <div
                    className="absolute inset-[-12%] rounded-full opacity-35 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255,148,59,0.12) 0%, transparent 68%)',
                    }}
                    aria-hidden
                  />
                  <NorthAmericaRailGlobe className="relative z-1 w-full h-full" size={720} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10 sm:p-12 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pt-28">
                <p className="font-mono text-[8px] sm:text-[9px] text-[#5c5f60] uppercase tracking-[0.15em] mb-3 max-w-xl">
                  Ilustración de corredores; puntos = puertos, cruces y patios
                  clave en México, EE. UU. y Canadá.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {[
                    { label: 'FERROCARRIL', value: 'EJE_PRINCIPAL' },
                    { label: 'CORREDOR', value: 'ENLACE_NA' },
                    { label: 'CARGA', value: 'MULTIMODAL' },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#FF943B] uppercase tracking-[0.08em]">
                        {d.value}
                      </span>
                      <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 left-4 right-4 sm:right-auto font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em]">
                VISTA_CORREDOR // MX_EUA_CAN
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="reveal section-label block">FERROCARRIL</span>
            <h2 className="reveal stagger-1 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12">
              Aquí mueve
              <br />
              el mayor volumen
              <br />
              <span className="text-[#FF943B]">y el mayor riesgo.</span>
            </h2>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-6">
              En tonelaje, el tren manda. Si el ferrocarril se atora o se pelea
              con el patio, todo el embarque se retrasa. Por eso Solmex mete
              orden ahí primero: sin eso, el resto del trayecto no se sostiene.
            </p>
            <p className="reveal stagger-3 text-[#E5E2E1] text-base leading-[1.95] mb-12 font-medium border-l-2 border-[#FF943B]/60 pl-5">
              El ferrocarril concentra la mayor parte del volumen industrial.
              Quien coordina bien el rail reduce el riesgo de parar toda la
              cadena.
            </p>

            <div className="reveal stagger-3 bg-[#131313] p-12 lg:p-16 border-l-4 border-[#FF943B] mb-12">
              <p className="font-mono text-[10px] text-[#FF943B] uppercase tracking-[0.2em] mb-2 font-bold">
                REGLA_PRÁCTICA
              </p>
              <p className="text-[#B0B5BA] text-sm leading-[1.82]">
                &ldquo;Arregle primero lo más difícil. Si el rail y los cruces
                están alineados, el resto del trayecto —camión, barco,
                almacén— tiene un estándar que ya se puede repetir.&rdquo;
              </p>
            </div>

            <div className="reveal stagger-4 grid grid-cols-2 gap-6">
              {[
                { value: 'Prioridad', label: 'EN_LA_RED' },
                { value: '24/7', label: 'SEGUIMIENTO' },
              ].map((s) => (
                <div key={s.label} className="bg-[#131313] p-8">
                  <span className="font-display text-2xl font-bold text-[#FF943B] block mb-1">
                    {s.value}
                  </span>
                  <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
