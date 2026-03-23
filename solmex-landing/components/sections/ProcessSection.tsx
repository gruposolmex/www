'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ProcessSection Component
 * 
 * Shows the 4-step process for connecting operations
 */
export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Diagnóstico',
      description: 'Analizamos su operación actual, flujos de carga y rutas ferroviarias y carreteras.',
    },
    {
      number: '2',
      title: 'Propuesta',
      description: 'Diseñamos una solución a medida con SLAs claros y esquema de red propuesto.',
    },
    {
      number: '3',
      title: 'Integración',
      description: 'Conectamos sus flujos a nuestra red de terminales y plataforma de evidencia.',
    },
    {
      number: '4',
      title: 'Operación',
      description: 'Monitoreo continuo, reportes periódicos y evidencia verificable por evento.',
    },
  ];

  return (
    <section className="process-section" id="proceso" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Cómo funciona</p>
          <h2 className="section-title font-display">4 pasos para conectar su operación</h2>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--solmex-text-muted)' }}>
            En 2–4 semanas pasamos de su operación actual a una red integrada con evidencia
            verificable.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={index} className={`process-step reveal delay-${index + 1}`}>
              <div className="process-number">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


