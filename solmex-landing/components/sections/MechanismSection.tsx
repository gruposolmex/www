'use client';

import React, { useEffect, useRef } from 'react';

export default function MechanismSection() {
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
      title: 'Qué pasó en piso',
      description:
        'Cada movimiento deja registro: salida, llegada, incidentes. No “creo que ya salió”: datos que todos ven igual.',
      detail: 'ORIGEN: OPERACIÓN_REAL',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF943B" strokeWidth="1.5">
          <path d="M12 20V10M18 20V4M6 20v-4" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Quién va primero',
      description:
        'Se ordena a los operadores por cumplimiento real: entregas a tiempo, sin sorpresas. No es opinión: es historial.',
      detail: 'CRITERIO: RESULTADO_MEDIDO',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF943B" strokeWidth="1.5">
          <path d="M3 3v18h18M7 16l4-4 4 4 5-5" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'A quién le toca el siguiente embarque',
      description:
        'El siguiente volumen va al que está arriba en esa lista y tiene capacidad. El cliente grande no negocia cada envío con diez personas.',
      detail: 'SALIDA: ASIGNACIÓN_CLARA',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF943B" strokeWidth="1.5">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} id="protocolo" className="relative section-y bg-[#131313]">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/20 to-transparent" />

      <div className="page-shell">
        <div className="mb-20 lg:mb-28">
          <span className="reveal section-label block">CÓMO_LO_HACEMOS</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10">
            <h2 className="reveal stagger-1 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase">
              Tres pasos,
              <br />
              <span className="text-[#FF943B]">sin magia.</span>
            </h2>
            <p className="reveal stagger-2 text-[#8E9192] text-sm max-w-md leading-[1.8]">
              De la operación diaria a la decisión de a quién mandar la carga:
              mismo lenguaje para el director y para el patio.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className={`reveal stagger-${i + 1} relative`}>
              {i < 2 && (
                <div className="hidden md:block absolute top-16 -right-3 z-20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#FF943B" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
              <div className="bg-[#0A0A0A] p-14 lg:p-16 xl:p-20 h-full flex flex-col border-r border-[rgba(68,71,72,0.1)] last:border-r-0 group hover:bg-[#1C1B1B] transition-colors duration-500">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-14 h-14 bg-[#FF943B] flex items-center justify-center">
                    <span className="font-mono text-lg font-bold text-[#0A0A0A]">{step.num}</span>
                  </div>
                  <div className="opacity-40 group-hover:opacity-100 transition-opacity">{step.icon}</div>
                </div>

                <h3 className="font-display text-xl lg:text-2xl font-bold uppercase mb-5 tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-[#8E9192] text-sm leading-[1.82] mb-auto pb-10">
                  {step.description}
                </p>

                <div className="font-mono text-[9px] text-[#444748] border-t border-[rgba(68,71,72,0.2)] pt-5 uppercase tracking-[0.15em]">
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
