'use client';

import React from 'react';
import Contact from '@/components/solmex/Contact';

/**
 * ContactSection Component
 * 
 * Contact form section - uses the existing Contact component
 */
export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <Contact />
      </div>
    </section>
  );
}


