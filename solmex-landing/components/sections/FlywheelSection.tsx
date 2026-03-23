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
      title: 'Agregación de Nodos',
      description: 'Operadores Tier-1 se integran para capturar demanda asignada, aumentando la densidad de la red.',
    },
    {
      num: '02',
      title: 'Refinamiento de Datos',
      description: 'El volumen creciente construye un motor predictivo de rendimiento sin posibilidad de réplica.',
    },
    {
      num: '03',
      title: 'Decaimiento del Costo',
      description: 'La eficiencia algorítmica se compone para reducir los costos operativos del sistema.',
    },
    {
      num: '04',
      title: 'Ventaja Estructural',
      description: 'La red se convierte en la ruta singular para la demanda institucional. La exclusión equivale a invisibilidad.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative section-y bg-[#FF943B] text-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 diagonal-stripes opacity-[0.08] pointer-events-none" />

      <div className="page-shell relative z-10">
        {/* Two-part layout: big headline left, steps right */}
        <div className="grid lg:grid-cols-12">
          {/* Left headline panel */}
          <div className="lg:col-span-5 p-12 lg:p-24 xl:p-28 flex flex-col justify-center border-r border-black/10">
            <span className="reveal font-mono text-[10px] text-black/50 uppercase tracking-[0.2em] block mb-8 font-bold">
              FLYWHEEL_DE_INEVITABILIDAD
            </span>
            <h2 className="reveal stagger-1 font-display text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-[-0.03em] uppercase leading-[0.94] mb-10">
              El Riesgo
              <br />
              de Exclusión:
              <br />
              Ventaja
              <br />
              Estructural.
            </h2>
            <p className="reveal stagger-2 text-black/60 text-base leading-[1.88] max-w-sm">
              Cada ciclo de operación hace a la red más densa, más inteligente y más difícil de replicar.
            </p>
          </div>

          {/* Right steps */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal stagger-${i + 1} p-12 lg:p-14 border-b border-black/10 ${i % 2 === 0 ? 'sm:border-r border-black/10' : ''} flex flex-col`}
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
