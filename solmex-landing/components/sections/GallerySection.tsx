'use client';

import React, { useEffect, useRef } from 'react';

/**
 * GallerySection Component
 * 
 * Photo gallery showing operations in action
 */
export default function GallerySection() {
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

  const photos = [
    {
      src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      alt: 'Terminal ferroviaria',
      caption: 'Terminal Ferroviaria',
    },
    {
      src: 'https://images.unsplash.com/photo-1601581875308-fafbf5b4c5b0?w=800&q=80',
      alt: 'Operación logística',
      caption: 'Operación Logística',
    },
    {
      src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
      alt: 'Transporte de carga',
      caption: 'Transporte de Carga',
    },
    {
      src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
      alt: 'Centro de Distribución',
      caption: 'Centro de Distribución',
    },
    {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      alt: 'Operación portuaria',
      caption: 'Operación Portuaria',
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      alt: 'Coordinación logística',
      caption: 'Coordinación Centralizada',
    },
  ];

  return (
    <section className="section section-alt" id="galeria" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <p className="section-eyebrow">Operaciones en Acción</p>
          <h2 className="section-title font-display">Nuestra Red en Imágenes</h2>
          <p className="section-description">
            Terminales, operaciones ferroviarias y logística de clase mundial en toda la red
            Solmex.
          </p>
        </div>

        <div className="photo-gallery">
          {photos.map((photo, index) => (
            <div key={index} className={`photo-item reveal-scale delay-${index + 1}`}>
              <img src={photo.src} alt={photo.alt} />
              <div className="photo-overlay">
                <p className="photo-caption">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


