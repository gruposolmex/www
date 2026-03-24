'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Trust layer: validated operators and terminals (coordination, not protocol).
 */
export default function TrustLayerSection() {
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
      id="confianza"
      className="relative section-y bg-[#131313] border-y border-[rgba(68,71,72,0.12)]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/25 to-transparent" />

      <div className="page-shell relative z-10">
        <div className="max-w-5xl">
          <span className="reveal section-label block">CAPA_DE_CONFIANZA</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.85rem,4.5vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.02em] uppercase text-[#E5E2E1]">
            Operadores y terminales
            <br />
            <span className="text-[#FF943B]">validados</span>
          </h2>
          <p className="reveal stagger-2 mt-8 text-[#B0B5BA] text-lg sm:text-xl leading-[1.9] max-w-3xl">
            La red está compuesta por infraestructura confiable, evaluada por
            desempeño y capacidad.
          </p>

          <div className="reveal stagger-3 mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-[#0A0A0A] border border-[rgba(68,71,72,0.2)] py-9 sm:py-10 px-6 sm:px-8 lg:px-10 min-w-0">
              <p className="font-mono text-[10px] text-[#FF943B] uppercase tracking-[0.2em] mb-6 font-bold">
                OPERADORES_Y_TERMINALES_VALIDADOS
              </p>
              <ul className="space-y-4 text-[#B0B5BA] text-sm sm:text-base leading-[1.85] break-words">
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0 pt-0.5">
                    —
                  </span>
                  <span>
                    Evaluación previa de capacidad operativa e infraestructura.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0 pt-0.5">
                    —
                  </span>
                  <span>
                    Seguimiento de desempeño como base de priorización en la red.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0 pt-0.5">
                    —
                  </span>
                  <span>
                    Estándares compartidos aplicables a todos los participantes.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0A0A0A] border border-[rgba(68,71,72,0.2)] py-9 sm:py-10 px-6 sm:px-8 lg:px-10 min-w-0 flex flex-col justify-center">
              <p className="text-[#8E9192] text-sm sm:text-base leading-[1.88] break-words text-pretty">
                El esquema se diferencia del mercado abierto: la incorporación
                supone el cumplimiento de estándares compartidos, lo que habilita
                asignación y priorización con criterios explícitos y uniformes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
