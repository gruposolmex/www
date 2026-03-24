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
      title: 'Mayor cobertura de terminales',
      description:
        'Cada patio o intermodal acreditado incrementa la utilidad de la red para el mandante, bajo un mismo marco normativo.',
    },
    {
      num: '02',
      title: 'Mayor solidez de la información',
      description:
        'A mayor volumen de movimientos, el cumplimiento se distingue con mayor claridad; el criterio deja de depender de apreciaciones informales.',
    },
    {
      num: '03',
      title: 'Menor costo de la desorganización',
      description:
        'Se reduce el tiempo en coordinación reactiva, el retrabajo y la ubicación inadecuada de carga. La red absorbe parte de la responsabilidad operativa que antes recaía en esfuerzos individuales aislados.',
    },
    {
      num: '04',
      title: 'Fuera del marco, menor visibilidad',
      description:
        'Quien no adhiere a las reglas compartidas tiene acceso más limitado a la demanda prioritaria, en función del estándar y de la evidencia operativa, no como sanción discrecional.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative section-y bg-[#FF943B] text-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes opacity-[0.08] pointer-events-none" />

      <div className="page-shell relative z-10">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-5 py-12 lg:py-24 xl:py-28 px-14 lg:px-28 xl:px-32 flex flex-col justify-center border-r border-black/10">
            <span className="reveal font-mono text-[10px] text-black/50 uppercase tracking-[0.2em] block mb-8 font-bold">
              ACCESO_Y_COORDINACIÓN
            </span>
            <h2 className="reveal stagger-1 font-display text-[clamp(1.85rem,4.2vw,3.75rem)] font-bold tracking-[-0.03em] uppercase leading-[0.96] mb-10">
              Sin coordinación,
              <br />
              el acceso a demanda
              <br />
              <span className="text-black">es limitado.</span>
            </h2>
            <p className="reveal stagger-2 text-black/60 text-base leading-[1.88] max-w-sm">
              Dentro del marco compartido, cada operación conforme al estándar
              refuerza la confianza en la red. Fuera de dicho marco, la demanda
              prioritaria presenta menor visibilidad, en coherencia con la
              exigencia de uniformidad normativa.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal stagger-${i + 1} py-14 lg:py-16 px-16 lg:px-20 border-b border-black/10 ${i % 2 === 0 ? 'sm:border-r border-black/10' : ''} flex flex-col`}
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
