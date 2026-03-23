'use client';

import React, { useEffect, useRef } from 'react';

export default function ValueSection() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0E0E0E]">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/20 to-transparent" />

      {/* Línea central del sistema — dominante visual */}
      <div className="relative overflow-hidden border-b border-[rgba(68,71,72,0.15)]">
        <div className="absolute inset-0 diagonal-stripes opacity-[0.04] pointer-events-none" />
        <div className="page-shell section-y py-20! lg:py-28! relative z-10">
          <p className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.25em] uppercase text-center mb-8 font-bold">
            LEY_DEL_SISTEMA
          </p>
          <h2 className="reveal stagger-1 font-display text-[clamp(2.25rem,7.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.03em] uppercase text-center max-w-6xl mx-auto">
            <span className="text-[#E5E2E1]">El rendimiento es </span>
            <br className="hidden sm:block" />
            <span className="text-[#FF943B]">la única moneda.</span>
          </h2>
          <p className="reveal stagger-2 mt-10 text-center text-[#8E9192] text-base sm:text-lg leading-[1.9] max-w-2xl mx-auto">
            Sin prueba de ejecución no hay prioridad. La red no premia
            promesas: premia consistencia verificable.
          </p>
        </div>
      </div>

      <div className="page-shell section-y">
        {/* Operadores */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 mb-32 lg:mb-40">
          <div className="lg:col-span-5">
            <span className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.2em] uppercase mb-5 block font-bold">
              LADO DE OFERTA // OPERADORES
            </span>
            <h3 className="reveal stagger-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Acceso por
              <br />
              <span className="text-[#FF943B]">mérito operativo.</span>
            </h3>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              Los contratos de mayor valor van a nodos con historial
              verificable. No es marketplace abierto: es capa de asignación con
              reglas explícitas.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'JERARQUÍA_POR_EVIDENCIA',
                  desc: 'El ranking interno prioriza cumplimiento demostrable, no volumen auto-declarado.',
                },
                {
                  title: 'ACCESO_TIER_INSTITUCIONAL',
                  desc: 'La verificación técnica reduce fricción con cargadores que exigen estándar único.',
                },
                {
                  title: 'DISPUTAS_POR_DATOS',
                  desc: 'La evidencia de ejecución sustituye ciclos largos de reclamación bilateral.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal stagger-${i + 3} flex gap-4 items-start`}
                >
                  <div className="w-1 shrink-0 self-stretch bg-[#FF943B]/30 relative min-h-12">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FF943B]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5E2E1] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#8E9192] leading-[1.82]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal stagger-2 lg:col-span-7 bg-[#131313] relative">
            <div className="absolute inset-0 diagonal-stripes opacity-[0.03]" />
            <div className="relative p-14 lg:p-20 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-6">
                  SOLMEX_ALLOCATION_ENGINE // OPERATOR_VIEW
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: 'RANKED', label: 'MODO_ASIGNACIÓN' },
                    { value: 'OPEN', label: 'VENTANA_NODOS' },
                    { value: 'EVIDENCE', label: 'CIERRE_OPERATIVO' },
                    { value: 'T1', label: 'CANAL_PRIORITARIO' },
                  ].map((m) => (
                    <div key={m.label} className="p-6 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)]">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 uppercase tracking-[0.06em]">
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-[rgba(68,71,72,0.15)]">
                <a href="#contacto" className="btn-outline-industrial">
                  CLASIFICAR NODO
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clientes */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14">
          <div className="reveal stagger-2 lg:col-span-7 bg-[#131313] relative order-2 lg:order-1">
            <div className="absolute inset-0 dot-grid opacity-[0.03]" />
            <div className="relative p-14 lg:p-20 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-6">
                  SOLMEX_COORDINATION_LAYER // CLIENT_VIEW
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: 'SINGLE', label: 'INTERFAZ_CONTRATO' },
                    { value: 'CLOSED', label: 'BUCLE_VALIDACIÓN' },
                    { value: 'E2E', label: 'TRAZA_OPERATIVA' },
                    { value: 'ROUTED', label: 'POLÍTICA_DEMANDA' },
                  ].map((m) => (
                    <div key={m.label} className="p-6 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)]">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 uppercase tracking-[0.06em]">
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-[rgba(68,71,72,0.15)]">
                <a href="#contacto" className="btn-outline-industrial">
                  ENLAZAR DEMANDA
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.2em] uppercase mb-5 block font-bold">
              LADO DE DEMANDA // CLIENTES
            </span>
            <h3 className="reveal stagger-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Un sistema
              <br />
              gestionado, no
              <br />
              <span className="text-[#FF943B]">un marketplace.</span>
            </h3>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              Una interfaz contrato. El protocolo impone un estándar de
              ejecución en el corredor; usted compra resultado coordinado, no
              fragmentos negociados uno a uno.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'EJECUCIÓN_ATADA_A_TELEMETRÍA',
                  desc: 'Las transferencias quedan sujetas a reglas y registro, no a interpretación posterior.',
                },
                {
                  title: 'REDIRECCIÓN_POR_ESTADO',
                  desc: 'Ante degradación de un nodo, la demanda se reencamina según política de la capa.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal stagger-${i + 3} flex gap-4 items-start`}
                >
                  <div className="w-1 shrink-0 self-stretch bg-[#FF943B]/30 relative min-h-12">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#FF943B]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E5E2E1] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#8E9192] leading-[1.82]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
