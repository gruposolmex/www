'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Diagnóstico sin porcentajes no verificados: severidad cualitativa.
 */
export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [barActive, setBarActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
            setBarActive(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative section-y bg-[#131313]">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/30 to-transparent" />

      <div className="page-shell">
        <div className="mb-20 lg:mb-28">
          <span className="reveal section-label block">EL_PROBLEMA</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(2rem,5vw,4.25rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase max-w-4xl">
            Sin reglas comunes,
            <br />
            el dinero se va
            <br />
            <span className="text-[#FF943B]">en desorden.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-14 xl:gap-16">
          <div className="lg:col-span-5">
            <p className="reveal stagger-2 text-[#B0B5BA] text-lg leading-[1.95] mb-12 lg:mb-14">
              Patios y terminales sueltos = camiones parados, viajes en vacío y
              tiempo en teléfono. Cada quien negocia por su lado y nadie ve el
              mismo tablero. Solmex pone un solo criterio y un solo registro de
              qué se hizo y cuándo.
            </p>

            <div className="reveal stagger-3 bg-[#0A0A0A] p-12 lg:p-16 border-l-4 border-[#FFB4AB]">
              <div className="flex justify-between items-end mb-4 gap-4">
                <span className="font-mono text-[10px] uppercase text-[#8E9192] tracking-[0.2em]">
                  COSTO_POR_DESORDEN // SIN_COORDINADOR
                </span>
                <span className="font-mono text-xs text-[#FFB4AB] font-bold uppercase tracking-[0.12em] shrink-0">
                  MUY_ALTO
                </span>
              </div>
              <div className="h-2 w-full bg-[#1C1B1B] relative overflow-hidden">
                <div
                  className={`h-full bg-linear-to-r from-[#FFB4AB]/50 to-[#FFB4AB] origin-left transition-transform duration-[1.4s] ease-out ${
                    barActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
              <p className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.15em] mt-3">
                INDICADOR_CUALITATIVO &mdash; NO_ES_SERIE_HISTÓRICA
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="reveal stagger-2 grid grid-cols-2 h-full">
              <div className="bg-[#0A0A0A] p-14 lg:p-20 border-r border-[rgba(68,71,72,0.15)]">
                <div className="flex items-center gap-2 mb-10">
                  <span className="w-2 h-2 bg-[#FFB4AB]" />
                  <span className="font-mono text-[10px] uppercase text-[#8E9192] tracking-[0.2em] font-bold">
                    ASÍ_HOY
                  </span>
                </div>
                <ul className="space-y-7">
                  {[
                    'Pedidos dispersos: correo, WhatsApp, llamada',
                    'Contratos spot que no sostienen margen',
                    '“Confío en fulano” en lugar de datos',
                    'Nadie sabe en tiempo real dónde va la carga',
                    'Reclamos largos porque no hay prueba clara',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#8E9192] leading-[1.75]"
                    >
                      <span className="text-[#FFB4AB] mt-0.5 shrink-0 font-mono text-xs">
                        &#10005;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1C1B1B] p-14 lg:p-20">
                <div className="flex items-center gap-2 mb-10">
                  <span className="w-2 h-2 bg-[#FF943B]" />
                  <span className="font-mono text-[10px] uppercase text-[#FF943B] tracking-[0.2em] font-bold">
                    CON_SOLMEX
                  </span>
                </div>
                <ul className="space-y-7">
                  {[
                    'Demanda vista en un solo marco operativo',
                    'Quién mueve mejor recibe el siguiente embarque',
                    'Cada movimiento deja rastro comprobable',
                    'Visibilidad de punta a punta para usted y el cliente',
                    'Se cierra con hechos, no con pleitos eternos',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-[#E5E2E1] leading-[1.75]"
                    >
                      <span className="text-[#FF943B] mt-0.5 shrink-0 font-mono text-xs">
                        &#10003;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
