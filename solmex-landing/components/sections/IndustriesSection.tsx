'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Sectores industriales atendidos por la red (sin mencionar participantes).
 */

const INDUSTRIES = [
  {
    title: 'Manufactura e industria',
    description:
      'Movimientos para plantas manufactureras, automotriz, aeroespacial y bienes de capital con exigencia de plazos y trazabilidad.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Minería y metales',
    description:
      'Transporte y manejo de minerales, concentrados y productos metalúrgicos con enfoque en cumplimiento normativo y seguridad.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Agroindustria',
    description:
      'Granos, fertilizantes, insumos y productos agrícolas con requisitos de inventario, documentación y cadena logística integrada.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-4 4-6 8-6 12a6 6 0 1012 0c0-4-2-8-6-12z" />
        <path d="M12 9v10" />
      </svg>
    ),
  },
  {
    title: 'Química y petroquímica',
    description:
      'Productos químicos y petroquímicos con énfasis en procedimientos de seguridad, medio ambiente y control documental.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Construcción e infraestructura',
    description:
      'Materiales de construcción, cemento, acero, tubería y equipos pesados para proyectos de gran escala.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Retail y consumo',
    description:
      'Productos de consumo con alta frecuencia de movimiento y ventanas de entrega acotadas para centros de distribución.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
] as const;

export default function IndustriesSection() {
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
    <section
      ref={sectionRef}
      id="industrias"
      className="relative section-y bg-[#0A0A0A] border-y border-[rgba(68,71,72,0.12)]"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.035] pointer-events-none" />

      <div className="page-shell relative z-10">
        <header className="mb-16 lg:mb-24 max-w-3xl">
          <span className="reveal section-label block">SECTORES</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.85rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.02em] uppercase text-[#E5E2E1]">
            Industrias
            <span className="text-[#FF943B]"> en la red</span>
          </h2>
          <p className="reveal stagger-2 mt-8 text-[#8E9192] text-base sm:text-lg leading-[2] max-w-2xl">
            La demanda coordinada abarca verticales industriales con requisitos
            distintos de tiempo, documentación y modal. El listado describe
            sectores habituales; la operación concreta se alinea al perfil de
            cada instalación validada.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
          {INDUSTRIES.map((item, i) => (
            <article
              key={item.title}
              className={`reveal stagger-${Math.min(i + 1, 6)} group bg-[#131313] border border-[rgba(68,71,72,0.18)] py-10 px-8 sm:px-9 lg:py-12 lg:px-10 min-w-0 flex flex-col`}
            >
              <div className="w-12 h-12 bg-[#FF943B] flex items-center justify-center text-[#0A0A0A] mb-8 shrink-0">
                {item.icon}
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#E5E2E1] mb-5 leading-snug">
                {item.title}
              </h3>
              <p className="text-[#8E9192] text-sm sm:text-base leading-[1.95] flex-1">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
