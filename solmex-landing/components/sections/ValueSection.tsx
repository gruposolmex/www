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

      <div className="relative overflow-hidden border-b border-[rgba(68,71,72,0.15)]">
        <div className="absolute inset-0 diagonal-stripes opacity-[0.04] pointer-events-none" />
        <div className="page-shell section-y py-24! lg:py-32! relative z-10">
          <p className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.25em] uppercase text-center mb-8 font-bold">
            COORDINACIÓN_MEDIBLE
          </p>
          <h2 className="reveal stagger-1 font-display text-[clamp(2.25rem,7.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.03em] uppercase text-center max-w-6xl mx-auto">
            <span className="text-[#E5E2E1]">La priorización responde al desempeño; </span>
            <br className="hidden sm:block" />
            <span className="text-[#FF943B]">las reglas son uniformes.</span>
          </h2>
          <p className="reveal stagger-2 mt-10 text-center text-[#8E9192] text-base sm:text-lg leading-[1.9] max-w-2xl mx-auto">
            En una red de confianza, el cumplimiento refuerza la prioridad; el
            incumplimiento implica retroceso en la secuencia de asignación. El
            criterio es explícito y conocido por los participantes, no
            discrecional.
          </p>
        </div>
      </div>

      <div className="page-shell section-y">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16 mb-36 lg:mb-44">
          <div className="lg:col-span-5">
            <span className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.2em] uppercase mb-5 block font-bold">
              OPERADORES_Y_TERMINALES
            </span>
            <h3 className="reveal stagger-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Volumen
              <br />
              <span className="text-[#FF943B]">por desempeño.</span>
            </h3>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              Los embarques priorizados no se distribuyen como en un mercado
              abierto: se orientan a operadores validados con historial
              comprobable. La competencia por asignaciones se ejerce mediante
              resultados dentro del marco compartido.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: 'ORDEN_POR_RESULTADO',
                  desc: 'Prioridad a quien cumple plazos y entregas conforme a lo acordado; menor posición ante incidencias recurrentes.',
                },
                {
                  title: 'MISMO_ESTÁNDAR_QUE_EL_CLIENTE',
                  desc: 'Los mandantes de carga requieren criterios homogéneos para todas sus instalaciones; ese marco es objeto de la relación con Solmex.',
                },
                {
                  title: 'MENOS_HORAS_EN_RECLAMOS',
                  desc: 'El registro operativo acota la extensión de controversias; su ausencia incrementa la dependencia de canales informales.',
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
            <div className="relative py-12 sm:py-16 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 flex flex-col justify-between min-h-[400px] min-w-0">
              <div>
                <div className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-8">
                  VISTA_OPERADOR
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 'Medido', label: 'DESEMPEÑO' },
                    { value: 'Abierto', label: 'A_SU_PLANTA' },
                    { value: 'Registrado', label: 'CADA_MOVIMIENTO' },
                    { value: 'Prioridad', label: 'SI_CUMPLE' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="py-7 sm:py-8 px-5 sm:px-7 lg:px-10 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)] min-w-0"
                    >
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 tracking-[0.02em] break-words">
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-10 border-t border-[rgba(68,71,72,0.15)]">
                <a href="#contacto" className="btn-outline-industrial">
                  REGISTRAR MI TERMINAL
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

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16">
          <div className="reveal stagger-2 lg:col-span-7 bg-[#131313] relative order-2 lg:order-1">
            <div className="absolute inset-0 dot-grid opacity-[0.03]" />
            <div className="relative py-12 sm:py-16 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 flex flex-col justify-between min-h-[400px] min-w-0">
              <div>
                <div className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-8">
                  VISTA_CARGADOR
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 'Marco único', label: 'CON_LA_RED' },
                    { value: 'Con sustento', label: 'DOCUMENTAL' },
                    { value: 'Cadena completa', label: 'VISIBILIDAD' },
                    { value: 'Habilitada', label: 'REASIGNACIÓN' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="py-7 sm:py-8 px-5 sm:px-7 lg:px-10 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)] min-w-0"
                    >
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 tracking-[0.02em] break-words">
                        {m.value}
                      </span>
                      <span className="font-mono text-[8px] text-[#444748] uppercase tracking-[0.15em]">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 pt-10 border-t border-[rgba(68,71,72,0.15)]">
                <a href="#contacto" className="btn-outline-industrial">
                  CONSULTAR DEMANDA
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
              MANDANTES_DE_CARGA
            </span>
            <div className="reveal stagger-1 mb-10 lg:mb-12 py-9 sm:py-10 px-6 sm:px-9 lg:px-11 border border-[rgba(255,148,59,0.35)] bg-[#131313]/80 min-w-0">
              <p className="font-mono text-[10px] text-[#FF943B] tracking-[0.22em] uppercase font-bold mb-6">
                UN SOLO PUNTO DE ACCESO
              </p>
              <ul className="space-y-4 text-[#E5E2E1] text-base leading-[1.85] font-medium">
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0">—</span>
                  <span>Un contrato.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0">—</span>
                  <span>Múltiples operadores coordinados.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FF943B] font-mono shrink-0">—</span>
                  <span>Ejecución validada.</span>
                </li>
              </ul>
            </div>
            <h3 className="reveal stagger-2 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Un marco
              <br />
              para el conjunto de
              <br />
              <span className="text-[#FF943B]">instalaciones.</span>
            </h3>
            <p className="reveal stagger-3 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              No corresponde a un mercado genérico en el que cada envío se gestiona
              de forma aislada: es coordinación con operadores validados, formatos
              de reporte homogéneos y cierre de movimientos conforme a reglas
              negociadas de manera centralizada.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: 'TODO_QUEDA_REGISTRADO',
                  desc: 'Salidas, llegadas e incidencias quedan asentadas; lo no registrado carece de valor probatorio en el marco de la red.',
                },
                {
                  title: 'SI_UN_PATIO_FALLA',
                  desc: 'La carga puede reasignarse a otro operador en la red sin reabrir la negociación integral en cada ocurrencia.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal stagger-${i + 4} flex gap-4 items-start`}
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
