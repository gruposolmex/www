'use client';

import React, { useEffect, useRef } from 'react';

/**
 * TestimonialsSection Component
 * 
 * Shows customer testimonials
 */
export default function TestimonialsSection() {
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

    const elements = sectionRef.current?.querySelectorAll('.reveal-scale');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const testimonials = [
    {
      quote:
        '"La coordinación centralizada de Solmex nos permitió reducir tiempos de espera en un 40%. Ahora tenemos visibilidad completa de nuestra operación."',
      name: 'Jorge Ramírez',
      role: 'Director de Operaciones, Cementos del Norte',
      initials: 'JR',
    },
    {
      quote:
        '"La evidencia multimedia y trazabilidad que ofrece Solmex nos da tranquilidad total. Podemos verificar cada paso de la operación en tiempo real."',
      name: 'María López',
      role: 'Gerente de Logística, Aceros Mexicanos',
      initials: 'ML',
    },
    {
      quote:
        '"Pasamos de gestionar 5 proveedores diferentes a un solo punto de contacto. Solmex simplificó nuestra operación logística por completo."',
      name: 'Carlos Pérez',
      role: 'VP Supply Chain, Granos del Bajío',
      initials: 'CP',
    },
  ];

  const StarIcon = () => (
    <svg viewBox="0 0 20 20" style={{ width: '1rem', height: '1rem', fill: '#FFD81C' }}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section className="testimonials-section" id="testimonios" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Testimonios</p>
          <h2 className="section-title font-display">Lo que dicen nuestros clientes</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`testimonial-card reveal-scale delay-${index + 1}`}>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.initials}</div>
                <div>
                  <p className="testimonial-name">{testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


