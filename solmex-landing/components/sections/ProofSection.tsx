'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Señales de estado del sistema (sin métricas numéricas no verificadas).
 */

interface SignalRowProps {
  label: string;
  value: string;
  tone?: 'orange' | 'green' | 'neutral';
}

function SignalRow({ label, value, tone = 'orange' }: SignalRowProps) {
  const valueColor =
    tone === 'green'
      ? 'text-[#22C55E]'
      : tone === 'neutral'
        ? 'text-[#B0B5BA]'
        : 'text-[#FF943B]';

  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-6 border-b border-[rgba(68,71,72,0.12)] last:border-0">
      <span className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em]">
        {label}
      </span>
      <span
        className={`font-mono text-sm font-bold uppercase tracking-[0.12em] ${valueColor}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProofSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="evidencia"
      className="relative section-y bg-[#0A0A0A]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/30 to-transparent" />

      <div className="page-shell">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 lg:mb-20 gap-8">
          <div>
            <span className="reveal section-label block">SEÑALES_DEL_SISTEMA</span>
            <h2 className="reveal stagger-1 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase">
              Estado de
              <br />
              la red.
            </h2>
            <p className="reveal stagger-2 mt-5 text-[#8E9192] text-sm leading-[1.8] max-w-md">
              Indicadores cualitativos del modo operativo. No son telemetría en
              vivo de su cuenta.
            </p>
          </div>
          <div className="reveal stagger-2 flex items-center gap-3 bg-[#131313] px-5 py-3 shrink-0 border border-[rgba(34,197,94,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-[#22C55E]" />
            </span>
            <span className="font-mono text-[10px] text-[#22C55E] uppercase tracking-[0.15em] font-bold">
              STREAM_SINTÉTICO
            </span>
          </div>
        </div>

        <div className="reveal stagger-2 grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-5 bg-[#131313] p-10 lg:p-12 border-l-4 border-[#FF943B]">
            <p className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.2em] mb-8">
              // LIVE_READOUT
            </p>
            <SignalRow label="NODE_STATUS" value="ACTIVE" tone="green" />
            <SignalRow label="DEMAND_FLOW" value="CONTINUOUS" tone="orange" />
            <SignalRow label="EXECUTION_STATE" value="VERIFIED" tone="green" />
            <SignalRow
              label="ASSIGNMENT_LAYER"
              value="OPEN"
              tone="neutral"
            />
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-[rgba(68,71,72,0.12)]">
            <div className="bg-[#131313] p-10 lg:p-12">
              <p className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] mb-4">
                CLÚSTER // ALTA_DENSIDAD
              </p>
              <h3 className="font-display text-xl font-bold uppercase mb-6 tracking-tight">
                Prioridad por prueba
              </h3>
              <p className="text-[#8E9192] text-sm leading-[1.82]">
                El volumen priorizado se concentra en nodos con historial
                verificable. Sin métricas públicas agregadas: el criterio es
                interno al protocolo.
              </p>
            </div>
            <div className="bg-[#131313] p-10 lg:p-12">
              <p className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] mb-4">
                CLÚSTER // CARGA_INDUSTRIAL
              </p>
              <h3 className="font-display text-xl font-bold uppercase mb-6 tracking-tight">
                Cierre por evidencia
              </h3>
              <p className="text-[#8E9192] text-sm leading-[1.82]">
                Transferencias multimodales quedan sujetas a validación. El
                sistema privilegia trazabilidad sobre reclamación manual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
