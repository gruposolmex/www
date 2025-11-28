'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-solmex-base border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <Image
                src="/solmex-logo.svg"
                alt="Grupo Solmex"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-white/70">
              Soluciones Logísticas de México
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              Aviso de privacidad
            </Link>
            <span className="text-white/30">·</span>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              Términos
            </Link>
            <span className="text-white/30">·</span>
            <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            © {currentYear} Grupo Solmex · Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}