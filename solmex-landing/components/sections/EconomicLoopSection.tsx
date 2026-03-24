'use client';

import React, { Fragment, useEffect, useRef } from 'react';

/**
 * Ciclo del negocio en lenguaje de director: pedido → pago.
 */

const LOOP_STEPS = [
  {
    key: 'DEMANDA',
    line: 'El cliente pide un movimiento de carga; queda registrado en el sistema.',
  },
  {
    key: 'ASIGNACIÓN',
    line: 'Se elige qué terminal o patio ejecuta, según reglas y historial.',
  },
  {
    key: 'EJECUCIÓN',
    line: 'Ese operador mueve la carga y reporta avances de forma estándar.',
  },
  {
    key: 'VALIDACIÓN',
    line: 'Se confirma que se hizo lo acordado (tiempos, entrega, documento).',
  },
  {
    key: 'INGRESO',
    line: 'Se factura y se paga en función de ese cumplimiento comprobado.',
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
        <div className="mb-20 lg:mb-24 max-w-4xl">
          <span className="reveal section-label block">DE_PEDIDO_A_PAGO</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[0.96] tracking-[-0.02em] uppercase text-[#E5E2E1]">
            Así gira
            <span className="text-[#FF943B]"> el negocio.</span>
          </h2>
          <p className="reveal stagger-2 mt-6 text-[#8E9192] text-base leading-[1.85] max-w-2xl">
            Si no hay comprobante de buena ejecución, no hay argumento para darle
            otra vez la carga al mismo operador. El equipo lo puede repetir sin
            traducir.
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
              <div className="flex-1 min-w-0 flex flex-col p-10 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-[rgba(68,71,72,0.2)] last:border-r-0 last:border-b-0">
                <div className="flex items-baseline gap-3 mb-5">
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

        <p className="reveal stagger-4 mt-14 text-[#8E9192] text-sm leading-[1.8] max-w-3xl">
          No hay atajos: quien quiere cargar en la red tiene que pasar por el
          mismo recorrido. Eso es lo que alinea a operadores y clientes.
        </p>
      </div>
    </section>
  );
}
