'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Familias de servicio logístico multimodal (referencia de procesos estándar
 * en la industria). No se publican miembros ni marcas de la red.
 */

const PROCESS_STEPS = [
  {
    key: 'RECEPCIÓN',
    line:
      'Notificación de salida, arribo por ferrocarril o carretera, aceptación de mercancía, verificación documental e instrucciones de almacenamiento.',
  },
  {
    key: 'PESAJE',
    line:
      'Metrología ferroviaria y carretera, determinación de masas y, cuando aplica, verificación de masa bruta (VGM) conforme a normativa.',
  },
  {
    key: 'DESCARGA',
    line:
      'Granel sólido o líquido, producto envasado, contenedores, tubería y perfiles de acero, según infraestructura disponible.',
  },
  {
    key: 'MANIOBRAS',
    line:
      'Envasado, mezclado, etiquetado, emplayado, flejado y trasvase, conforme a especificación del movimiento.',
  },
  {
    key: 'CARGA_Y_CONSOLIDACIÓN',
    line:
      'Carga y consolidación hacia ferrocarril y carretera: granel, envasado, contenedores y cargas especiales.',
  },
  {
    key: 'ALMACENAJE',
    line:
      'Patio, almacén techado, contenedores en vacío o lleno, inventario y control de existencias.',
  },
  {
    key: 'CROSS_DOCK',
    line:
      'Transbordo entre modos: contenedor, ferrotolva, autotolva, camión y furgón, con registro homogéneo del movimiento.',
  },
] as const;

const DOMAIN_APPLICATIONS = [
  'Graneles y productos a granel (sólidos y líquidos).',
  'Producto envasado, saco suelto y carga paletizada.',
  'Contenedores e intermodal (recepción, inventario, mensajería con sistemas del mandante).',
  'Tubería, perfiles y carga larga con sujeción y documentación de exportación.',
  'Polímeros y resinas (granel y envasado, rotulado y consolidación).',
  'Cadena alimentaria y productos sensibles (resguardo, muestreo y despacho).',
  'Coordinación con puntos de verificación fitosanitaria e inspección documentada.',
] as const;

export default function ServicesSection() {
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
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative section-y bg-[#131313]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/20 to-transparent" />

      <div className="page-shell relative z-10">
        <header className="mb-16 lg:mb-24 max-w-3xl">
          <span className="reveal section-label block">CAPACIDADES</span>
          <h2 className="reveal stagger-1 font-display text-[clamp(1.85rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.02em] uppercase text-[#E5E2E1]">
            Servicios
            <span className="text-[#FF943B]"> logísticos</span>
          </h2>
          <p className="reveal stagger-2 mt-8 text-[#8E9192] text-base sm:text-lg leading-[2] max-w-2xl">
            El catálogo siguiente resume familias de servicio habituales en
            operación multimodal y ferroviaria. La oferta efectiva depende del
            perfil de cada terminal u operador validado en la red; no se
            divulgan participantes ni marcas de forma pública.
          </p>
        </header>

        <div className="mb-20 lg:mb-28">
          <h3 className="reveal stagger-2 font-mono text-[10px] text-[#444748] uppercase tracking-[0.25em] mb-10 lg:mb-12 font-bold">
            PROCESO_OPERATIVO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.key}
                className={`reveal stagger-${Math.min(i + 2, 8)} bg-[#0A0A0A] border border-[rgba(68,71,72,0.15)] py-9 px-7 sm:px-9 lg:py-10 lg:px-10 min-w-0`}
              >
                <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                  <span className="font-mono text-[10px] text-[#444748]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FF943B] tracking-widest uppercase">
                    {step.key}
                  </span>
                </div>
                <p className="text-[#B0B5BA] text-sm sm:text-base leading-[1.95]">
                  {step.line}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="reveal stagger-3 font-mono text-[10px] text-[#444748] uppercase tracking-[0.25em] mb-10 lg:mb-12 font-bold">
            ÁMBITOS_DE_APLICACIÓN
          </h3>
          <ul className="reveal stagger-4 space-y-6 lg:space-y-8 max-w-3xl">
            {DOMAIN_APPLICATIONS.map((line) => (
              <li
                key={line}
                className="flex gap-4 text-[#8E9192] text-sm sm:text-base leading-[1.95] border-l-2 border-[#FF943B]/35 pl-5 sm:pl-6"
              >
                <span className="text-[#FF943B] font-mono text-xs shrink-0 mt-0.5">
                  —
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
