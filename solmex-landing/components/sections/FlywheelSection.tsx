'use client';

import React, { useEffect, useRef } from 'react';

export default function FlywheelSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Entran más terminales',
      description:
        'Cada patio o intermodal serio que se suma hace la red más útil para el cargador. Más oferta bajo las mismas reglas.',
    },
    {
      num: '02',
      title: 'Los datos se vuelven mejores',
      description:
        'A más movimientos, más claro se ve quién cumple y quién no. El criterio deja de ser “oídas”.',
    },
    {
      num: '03',
      title: 'Baja el costo del desorden',
      description:
        'Menos tiempo en llamadas, menos retrabajo, menos carga mal ubicada. El sistema hace más peso que el heroísmo individual.',
    },
    {
      num: '04',
      title: 'Quién no está, pierde visibilidad',
      description:
        'Los grandes volúmenes se concentran en quien ya está adentro. Afuera cuesta más entrar cuando la red ya es el canal natural.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative section-y bg-[#FF943B] text-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes opacity-[0.08] pointer-events-none" />

      <div className="page-shell relative z-10">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-5 p-12 lg:p-24 xl:p-28 flex flex-col justify-center border-r border-black/10">
            <span className="reveal font-mono text-[10px] text-black/50 uppercase tracking-[0.2em] block mb-8 font-bold">
              POR_QUÉ_IMPORTA_ENTRAR
            </span>
            <h2 className="reveal stagger-1 font-display text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.03em] uppercase leading-[0.94] mb-10">
              La red
              <br />
              se fortalece
              <br />
              sola.
            </h2>
            <p className="reveal stagger-2 text-black/60 text-base leading-[1.88] max-w-sm">
              Cada operación bien hecha refuerza el estándar. Cada terminal que
              se queda fuera tiene menos oportunidad de ver la carga prioritaria.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal stagger-${i + 1} p-14 lg:p-16 border-b border-black/10 ${i % 2 === 0 ? 'sm:border-r border-black/10' : ''} flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 bg-black text-[#FF943B] flex items-center justify-center font-mono text-xs font-bold">
                    {step.num}
                  </span>
                  <span className="font-mono font-bold text-xs uppercase tracking-[0.05em]">
                    {step.title}
                  </span>
                </div>
                <p className="text-black/60 text-sm leading-[1.82]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
