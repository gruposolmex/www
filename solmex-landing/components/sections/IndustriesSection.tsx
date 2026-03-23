'use client';

import React, { useEffect, useRef } from 'react';

/**
 * IndustriesSection Component
 * 
 * Shows 6 industries served by Solmex
 */
export default function IndustriesSection() {
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

  const industries = [
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
      ),
      title: 'Manufactura e Industria',
      description:
        'Logística para plantas manufactureras, automotriz, aeroespacial y bienes de capital con tiempos críticos.',
      bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
      ),
      title: 'Minería y Metales',
      description:
        'Transporte de minerales, concentrados y productos metalúrgicos con manejo especializado y cumplimiento normativo.',
      bgImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1M9 9a2 2 0 100-4 2 2 0 000 4zm0 0v2m0-2a2 2 0 110-4m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0v2m0-2a2 2 0 110-4m5 8v-2m0 2a2 2 0 100-4 2 2 0 000 4zm0-2v2m0-2a2 2 0 110-4"
          ></path>
        </svg>
      ),
      title: 'Agroindustria',
      description:
        'Cadena de frío, granos, fertilizantes y productos agrícolas con control de temperatura y humedad.',
      bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
      ),
      title: 'Química y Petroquímica',
      description:
        'Manejo seguro de productos químicos y petroquímicos con protocolos de seguridad y cumplimiento ambiental.',
      bgImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      ),
      title: 'Construcción e Infraestructura',
      description:
        'Transporte de materiales de construcción, cemento, acero y equipos pesados para proyectos de infraestructura.',
      bgImage: 'https://images.unsplash.com/photo-1601581875308-fafbf5b4c5b0?w=800&q=80',
    },
    {
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      title: 'Retail y Consumo',
      description:
        'Distribución de productos de consumo masivo con alta frecuencia y cumplimiento de ventanas de entrega.',
      bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
  ];

  return (
    <section className="section section-alt" id="industrias" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Industrias</p>
          <h2 className="section-title font-display">Atendemos las Industrias Clave de México</h2>
          <p className="section-description">
            Nuestra experiencia abarca múltiples sectores industriales con soluciones
            especializadas para cada necesidad.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`glass service-card reveal delay-${index + 1}`}
              style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, rgba(255,156,55,0.2), rgba(255,216,28,0.1))`,
                  backgroundImage: `url(${industry.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.15,
                  zIndex: 0,
                }}
              ></div>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div className="service-icon">{industry.icon}</div>
                <h3 className="service-title">{industry.title}</h3>
                <p className="service-description">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


