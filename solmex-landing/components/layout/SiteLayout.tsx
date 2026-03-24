'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SolmexLogo } from '@/components/brand/SolmexLogo';

/**
 * SiteLayout - Industrial Authority Shell
 *
 * Header, footer, mobile menu, and WhatsApp float
 * following the Sovereign Engine design system.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'FLUJO', href: '#flujo-coordinado' },
    { label: 'CONFIANZA', href: '#confianza' },
    { label: 'INDUSTRIAS', href: '#industrias' },
    { label: 'SERVICIOS', href: '#servicios' },
    { label: 'FERROCARRIL', href: '#red' },
    { label: 'COORDINACIÓN', href: '#coordinacion' },
    { label: 'VALIDACIÓN', href: '#evidencia' },
    { label: 'CONTACTO', href: '#contacto' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) closeMobileMenu();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Header */}
      <header
        className={`header-industrial ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="page-shell flex w-full items-center justify-between h-full">
          <Link
            href="/"
            className="flex shrink-0 items-center min-w-0"
            aria-label="Solmex — inicio"
          >
            <SolmexLogo variant="horizontal" />
          </Link>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] xl:tracking-[0.15em] text-[#8E9192] hover:text-[#FF943B] transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="btn-primary-industrial py-2.5! px-5! text-[11px]!"
            >
              SOLICITAR ACCESO
            </a>
          </nav>

          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="block w-5 h-[2px] bg-[#FF943B]" />
            <span className="block w-5 h-[2px] bg-[#FF943B]" />
            <span className="block w-3.5 h-[2px] bg-[#FF943B]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
      <div
        className={`mobile-menu-panel ${isMobileMenuOpen ? 'active' : ''}`}
      >
        <div className="flex items-center justify-between mb-10 gap-4 min-w-0">
          <SolmexLogo
            variant="horizontal"
            className="max-w-[min(70vw,240px)] sm:max-w-[280px]"
          />
          <button
            onClick={closeMobileMenu}
            aria-label="Cerrar menú"
            className="p-2 text-[#8E9192] hover:text-[#E5E2E1]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#B0B5BA] hover:text-[#FF943B] py-3 border-b border-[rgba(68,71,72,0.15)] transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="btn-primary-industrial mt-6 text-center"
            onClick={closeMobileMenu}
          >
            SOLICITAR ACCESO
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <main id="main-content">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] py-24 lg:py-28">
        <div className="page-shell">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-20 mb-24">
            <div className="md:col-span-2">
              <div className="mb-5">
                <SolmexLogo variant="wordmark" className="h-10 sm:h-12 max-w-[min(100%,280px)]" />
              </div>
              <p className="text-[#8E9192] text-sm max-w-sm leading-relaxed">
                Capa de coordinación para demanda logística confiable: red de
                operadores y terminales validados, marco normativo común y
                ejecución verificable.
              </p>
            </div>
            <div>
              <h5 className="font-mono text-[11px] text-[#E5E2E1] uppercase tracking-[0.15em] mb-5 font-bold">
                Red
              </h5>
              <ul className="space-y-4 text-sm text-[#8E9192]">
                <li>
                  <a
                    href="#flujo-coordinado"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Flujo coordinado
                  </a>
                </li>
                <li>
                  <a
                    href="#confianza"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Operadores validados
                  </a>
                </li>
                <li>
                  <a
                    href="#industrias"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Industrias
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#red"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Ferrocarril
                  </a>
                </li>
                <li>
                  <a
                    href="#coordinacion"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Reglas de coordinación
                  </a>
                </li>
                <li>
                  <a
                    href="#evidencia"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Ejecución validada
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-mono text-[11px] text-[#E5E2E1] uppercase tracking-[0.15em] mb-5 font-bold">
                Legal
              </h5>
              <ul className="space-y-4 text-sm text-[#8E9192]">
                <li>
                  <a
                    href="/aviso-privacidad"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Aviso de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="hover:text-[#FF943B] transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-[rgba(68,71,72,0.15)] flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.15em]">
              &copy; {new Date().getFullYear()} Soluciones Logísticas
              FyT S.A. de C.V. Todos los derechos reservados.
            </p>
            <p className="font-mono text-[10px] text-[#444748] uppercase tracking-[0.15em]">
              GRUPO SOLMEX &middot; COORDINACIÓN DE DEMANDA CONFIABLE
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/522292644088?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20Solmex"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
