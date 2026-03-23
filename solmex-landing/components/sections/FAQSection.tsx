'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * FAQSection Component
 * 
 * Accordion-style FAQ section
 */
export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const faqs = [
    {
      question: '¿Cuánto tiempo toma integrar mi operación?',
      answer:
        'El proceso de integración típicamente toma entre 2 y 4 semanas, dependiendo de la complejidad de su operación. Incluye diagnóstico, configuración de SLAs, capacitación y un período de acompañamiento.',
    },
    {
      question: '¿Qué tipo de cargas manejan?',
      answer:
        'Manejamos cargas industriales, agrícolas, minerales y productos a granel. Nuestra red de terminales está preparada para diferentes tipos de mercancía con procesos estandarizados y evidencia verificable.',
    },
    {
      question: '¿Cómo funciona el sistema de evidencia verificable?',
      answer:
        'Cada operación se documenta con fotografías, video, registros de tiempo y geolocalización. Usted tiene acceso a un panel donde puede verificar cada etapa de la operación en tiempo real.',
    },
    {
      question: '¿Tienen cobertura en todo México?',
      answer:
        'Operamos en los principales corredores logísticos de México con expansión continua según demanda. Nuestra red incluye terminales en CDMX, Guadalajara, Veracruz, Monterrey y Colima, con planes de expansión estratégica.',
    },
    {
      question: '¿Con qué sistemas se integran?',
      answer:
        'Nos integramos con CCTV, básculas, WMS/TMS existentes, GPS y otros sistemas de gestión logística. Trabajamos con su infraestructura tecnológica actual para minimizar la disrupción.',
    },
    {
      question: '¿Cuál es el tiempo de respuesta ante incidentes?',
      answer:
        'Nuestro centro de coordinación opera 24/7 con tiempos de respuesta inicial de menos de 15 minutos. Cada incidente se documenta con evidencia multimedia y se escala según protocolos predefinidos.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Preguntas Frecuentes</p>
          <h2 className="section-title font-display">¿Tiene dudas? Aquí las resolvemos</h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item reveal delay-${index + 1}`}>
              <button
                className="faq-question"
                aria-expanded={openIndex === index}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <svg
                  className="faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p className="faq-answer-content">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


