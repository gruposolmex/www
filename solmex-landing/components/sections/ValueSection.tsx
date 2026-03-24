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
            REGLA_SIMPLE
          </p>
          <h2 className="reveal stagger-1 font-display text-[clamp(2.25rem,7.5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.03em] uppercase text-center max-w-6xl mx-auto">
            <span className="text-[#E5E2E1]">Aquí manda el resultado: </span>
            <br className="hidden sm:block" />
            <span className="text-[#FF943B]">no el discurso.</span>
          </h2>
          <p className="reveal stagger-2 mt-10 text-center text-[#8E9192] text-base sm:text-lg leading-[1.9] max-w-2xl mx-auto">
            El que entrega bien y a tiempo vuelve a recibir carga de la red. El
            que falla, pierde turno. Así lo puede decir usted a su gente sin
            PowerPoint.
          </p>
        </div>
      </div>

      <div className="page-shell section-y">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 xl:gap-16 mb-36 lg:mb-44">
          <div className="lg:col-span-5">
            <span className="reveal font-mono text-[10px] text-[#FF943B] tracking-[0.2em] uppercase mb-5 block font-bold">
              SI_USTED_MUEVE_CARGA
            </span>
            <h3 className="reveal stagger-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Gane volumen
              <br />
              <span className="text-[#FF943B]">con hechos.</span>
            </h3>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              Los embarques más valiosos no se subastan al aire: van a quien ya
              demostró en piso que cumple. Usted compite con resultados, no con
              relaciones solas.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: 'ORDEN_POR_RESULTADO',
                  desc: 'Arriba quien cumple plazos y entrega sin sorpresas; abajo quien genera problemas.',
                },
                {
                  title: 'MISMO_ESTÁNDAR_QUE_EL_CLIENTE',
                  desc: 'El cargador grande quiere una sola regla para todos sus patios: eso es lo que negocia con Solmex.',
                },
                {
                  title: 'MENOS_HORAS_EN_RECLAMOS',
                  desc: 'Si hay registro de qué pasó, el pleito se acorta. Si no, vuelve el teléfono.',
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
            <div className="relative p-16 lg:p-24 flex flex-col justify-between min-h-[400px]">
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
                    <div key={m.label} className="p-8 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)]">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 tracking-[0.02em]">
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
            <div className="relative p-16 lg:p-24 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-8">
                  VISTA_CARGADOR
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: 'Un trato', label: 'CON_LA_RED' },
                    { value: 'Con datos', label: 'NO_SOLO_PALABRAS' },
                    { value: 'Punta a punta', label: 'VISIBILIDAD' },
                    { value: 'Activo', label: 'REASIGNACIÓN' },
                  ].map((m) => (
                    <div key={m.label} className="p-8 bg-[#0A0A0A] border border-[rgba(68,71,72,0.12)]">
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#FF943B] block mb-1 tracking-[0.02em]">
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
                  HABLAR SOBRE MI DEMANDA
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
              SI_USTED_CONTRATA_MOVIMIENTOS
            </span>
            <h3 className="reveal stagger-1 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-10 lg:mb-12 text-[#E5E2E1]">
              Un solo
              <br />
              contrato-marco,
              <br />
              <span className="text-[#FF943B]">muchas plantas.</span>
            </h3>
            <p className="reveal stagger-2 text-[#8E9192] text-base leading-[1.95] mb-12 max-w-md">
              No es un marketplace donde cada envío es una subasta distinta.
              Es una mesa con reglas iguales para todos sus operadores: mismo
              formato de reporte, misma forma de cerrar un movimiento.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: 'TODO_QUEDA_REGISTRADO',
                  desc: 'Salidas, llegadas, incidencias: si no está en el sistema, no cuenta como argumento.',
                },
                {
                  title: 'SI_UN_PATIO_FALLA',
                  desc: 'La carga se puede mover a otro que esté en la red, sin renegociar desde cero cada vez.',
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
