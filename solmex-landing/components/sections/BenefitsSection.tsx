'use client';

import React, { useEffect, useRef } from 'react';

/**
 * BenefitsSection Component
 * 
 * Shows 6 benefits of working with Solmex
 */
export default function BenefitsSection() {
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

  const benefits = [
    {
      title: 'SLA claros y monitoreados',
      description: 'Acuerdos medibles, cumplimiento auditado en cada terminal.',
    },
    {
      title: 'Evidencia multimedia en cada punto',
      description: 'Registro visual y digital de eventos críticos.',
    },
    {
      title: 'Respuesta rápida ante incidentes',
      description: 'Protocolos definidos, escalamiento inmediato.',
    },
    {
      title: 'Coordinación unificada',
      description: 'Un solo centro de control para toda la red.',
    },
    {
      title: 'Optimización de tiempos y movimientos',
      description: 'Menos demoras, más rotación de inventario.',
    },
    {
      title: 'Seguridad y cumplimiento reforzado',
      description: 'Alineado con estándares y mejores prácticas.',
    },
  ];

  return (
    <section className="section" id="benefits" ref={sectionRef} style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24rem',
          height: '24rem',
          background: 'var(--gradient-primary)',
          opacity: 0.05,
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header reveal">
          <h2 className="section-title font-display">Ventajas de trabajar con Solmex</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className={`glass-subtle benefit-card reveal delay-${index + 1}`}>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-row">
          <div className="stat-badge">
            <div className="stat-value text-gradient-primary">98.7%</div>
            <div className="stat-label">Disponibilidad</div>
          </div>
          <div className="stat-badge">
            <div className="stat-value text-gradient-primary">24/7</div>
            <div className="stat-label">Monitoreo</div>
          </div>
          <div className="stat-badge">
            <div className="stat-value text-gradient-primary">100%</div>
            <div className="stat-label">Trazabilidad</div>
          </div>
        </div>
      </div>
    </section>
  );
}


