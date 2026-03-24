'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Flujo coordinado: demanda estructurada hasta validación (reglas de la red).
 */

const LOOP_STEPS = [
  {
    key: 'DEMANDA',
    line: 'La necesidad de movimiento entra en un solo marco operativo, con alcance y condiciones claras para la red.',
  },
  {
    key: 'SELECCIÓN',
    line: 'Entre operadores y terminales validados se identifica la opción operativa más adecuada según capacidad y desempeño reciente.',
  },
  {
    key: 'ASIGNACIÓN',
    line: 'Queda definido quién mueve la carga, en qué ventana y bajo las mismas reglas de coordinación para todos.',
  },
  {
    key: 'EJECUCIÓN',
    line: 'El operador asignado avanza el movimiento y deja registro en el formato compartido de la red.',
  },
  {
    key: 'VALIDACIÓN',
    line: 'La evidencia confirma lo acordado (tiempos, entrega, documentación). Sobre eso se cierra el ciclo y se ordena la prioridad siguiente.',
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
      id="flujo-coordinado"
      className="relative section-y bg-[#0A0A0A] border-y border-[rgba(68,71,72,0.12)]"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.035] pointer-events-none" />

      <div className="page-shell relative z-10">
        <div className="mb-20 lg:mb-24 max-w-4xl">
          <span className="reveal section-label block">FLUJO_COORDINADO</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[0.96] tracking-[-0.02em] uppercase text-[#E5E2E1] break-words">
            Flujo coordinado
            <span className="text-[#FF943B]"> del sistema</span>
          </h2>
          <p className="reveal stagger-2 mt-5 text-[#8E9192] text-base sm:text-lg font-medium leading-snug max-w-2xl">
            De la demanda a la validación.
          </p>
          <p className="reveal stagger-3 mt-5 text-[#8E9192] text-base leading-[1.85] max-w-2xl">
            El recorrido es homogéneo para mandantes y operadores: selección y
            asignación con criterios explícitos, ejecución con trazabilidad y
            validación previa al refuerzo de prioridad o volumen.
          </p>
        </div>

        {/**
         * Rejilla responsive: evita 5 columnas estrechas en laptop (texto pegado).
         * 1 col móvil → 2 tablet → 3 desktop → 5 solo en pantallas muy anchas.
         */}
        <div className="reveal stagger-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[1600px]:grid-cols-5 border border-[rgba(68,71,72,0.2)] bg-[rgba(68,71,72,0.12)] gap-px overflow-hidden">
          {LOOP_STEPS.map((step, i) => (
            <div
              key={step.key}
              className="min-w-0 flex flex-col bg-[#131313] py-9 sm:py-10 lg:py-11 px-6 sm:px-8 md:px-10 lg:px-9 xl:px-10 min-[1600px]:px-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
                <span className="font-mono text-[10px] text-[#444748] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#FF943B] tracking-widest uppercase">
                  {step.key}
                </span>
              </div>
              <p className="text-[#B0B5BA] text-sm leading-[1.82] mt-auto break-words text-pretty">
                {step.line}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal stagger-5 mt-14 text-[#8E9192] text-sm leading-[1.8] max-w-3xl">
          Las reglas de coordinación se aplican de forma uniforme a mandantes y
          ejecutores, lo cual preserva la integridad de la red y limita acuerdos
          ajenos al marco institucional.
        </p>
      </div>
    </section>
  );
}
