'use client';

import React, { Fragment, useEffect, useRef } from 'react';

/**
 * Ciclo económico explícito del sistema Solmex.
 * Pasos mecánicos y declarativos: demanda → ingreso.
 */

const LOOP_STEPS = [
  {
    key: 'DEMANDA',
    line: 'Demanda institucional entra al sistema.',
  },
  {
    key: 'ASIGNACIÓN',
    line: 'La capa asigna volumen a nodos clasificados.',
  },
  {
    key: 'EJECUCIÓN',
    line: 'El nodo ejecuta bajo protocolo y telemetría.',
  },
  {
    key: 'VALIDACIÓN',
    line: 'La prueba de ejecución cierra el ciclo operativo.',
  },
  {
    key: 'INGRESO',
    line: 'El ingreso sigue al cumplimiento verificable.',
  },
] as const;

export default function EconomicLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ciclo-economico"
      className="relative section-y bg-[#0A0A0A] border-y border-[rgba(68,71,72,0.12)]"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.035] pointer-events-none" />

      <div className="page-shell relative z-10">
        <div className="mb-16 lg:mb-20 max-w-4xl">
          <span className="reveal section-label block">CICLO_ECONÓMICO</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[0.96] tracking-[-0.02em] uppercase text-[#E5E2E1]">
            El loop del sistema.
            <span className="text-[#FF943B]"> Cerrado por diseño.</span>
          </h2>
          <p className="reveal stagger-2 mt-6 text-[#8E9192] text-sm leading-[1.85] max-w-2xl font-mono uppercase tracking-[0.08em]">
            Sin rendimiento verificable no hay reasignación prioritaria.
          </p>
        </div>

        <div className="reveal stagger-3 flex flex-col lg:flex-row lg:items-stretch gap-0 border border-[rgba(68,71,72,0.2)] bg-[#131313] overflow-hidden">
          {LOOP_STEPS.map((step, i) => (
            <Fragment key={step.key}>
              {i > 0 && (
                <div
                  className="flex lg:hidden items-center justify-center py-2 bg-[#0A0A0A] border-y border-[rgba(68,71,72,0.2)]"
                  aria-hidden
                >
                  <span className="font-mono text-[#FF943B] text-sm">↓</span>
                </div>
              )}
              <div className="flex-1 min-w-0 flex flex-col p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-[rgba(68,71,72,0.2)] last:border-r-0 last:border-b-0">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[10px] text-[#444748]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#FF943B] tracking-widest uppercase">
                    {step.key}
                  </span>
                </div>
                <p className="text-[#B0B5BA] text-sm leading-[1.82] mt-auto">
                  {step.line}
                </p>
              </div>
              {i < LOOP_STEPS.length - 1 && (
                <div
                  className="hidden lg:flex w-11 shrink-0 items-center justify-center bg-[#0A0A0A] border-r border-[rgba(68,71,72,0.2)]"
                  aria-hidden
                >
                  <span className="font-mono text-[#FF943B] text-base font-bold">
                    →
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <p className="reveal stagger-4 mt-10 font-mono text-[9px] text-[#444748] uppercase tracking-[0.18em] max-w-3xl">
          Secuencia obligatoria: la participación en la capa exige atravesar
          validación. El loop no admite atajos sin evidencia.
        </p>
      </div>
    </section>
  );
}
