'use client';

import React, { useEffect, useRef } from 'react';

const OUTCOMES = [
  'La terminal queda habilitada para recibir embarques coordinados por la red.',
  'La carga se integra con el mismo formato de reporte y validación que el resto de operadores validados.',
  'Los movimientos posteriores actualizan la posición en la coordinación según desempeño y capacidad.',
] as const;

export default function PrimeraAsignacionSection() {
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
      id="primera-asignacion"
      className="relative section-y bg-[#131313]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/25 to-transparent" />

      <div className="page-shell">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="reveal section-label block">DESPUÉS_DEL_ALTA</span>
            <h2 className="reveal stagger-1 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase text-[#E5E2E1]">
              Tras la
              <br />
              validación
              <br />
              <span className="text-[#FF943B]">documental.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <ul className="reveal stagger-2 space-y-0 border border-[rgba(68,71,72,0.2)] bg-[#0A0A0A]">
              {OUTCOMES.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-8 items-start py-10 lg:py-14 px-12 lg:px-20 border-b border-[rgba(68,71,72,0.15)] last:border-0"
                >
                  <span
                    className="font-mono text-[#FF943B] text-lg font-bold shrink-0 mt-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                  <span className="text-[#B0B5BA] text-base leading-[1.9]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="reveal stagger-3 mt-12 text-[#8E9192] text-sm leading-[1.8]">
              Etapa siguiente: asignación de volumen priorizado conforme al mismo
              marco de reglas de coordinación aplicable al resto de operadores
              validados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
