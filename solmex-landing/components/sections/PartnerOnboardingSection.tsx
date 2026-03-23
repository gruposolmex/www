'use client';

import React, { useEffect, useRef } from 'react';
import PartnerOnboarding from '@/components/solmex/PartnerOnboarding';

/**
 * PartnerOnboardingSection Component
 * 
 * Section for terminal partners to join the network
 */
export default function PartnerOnboardingSection() {
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

  return (
    <section className="section section-alt" id="partner-onboarding" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Para Operadores</p>
          <h2 className="section-title font-display">Únase a la Red Solmex</h2>
          <p className="section-description">
            Complete el formulario para integrar su terminal a nuestra red certificada. Evaluaremos
            su perfil y nos pondremos en contacto para iniciar el proceso de integración.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <PartnerOnboarding />
        </div>
      </div>
    </section>
  );
}


