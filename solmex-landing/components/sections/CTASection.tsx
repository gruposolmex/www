'use client';

import React, { useEffect, useRef, useState } from 'react';

/** Payload enviado al backend (campos operativos + contacto). */
export interface NodeClassificationPayload {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipoNodo: string;
  capacidad: string;
  ubicacion: string;
  infraestructura: string;
  mensaje: string;
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [formData, setFormData] = useState<NodeClassificationPayload>({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipoNodo: 'terminal_intermodal',
    capacidad: '',
    ubicacion: '',
    infraestructura: '',
    mensaje: '',
  });

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const response = await fetch('/api/nextcloud/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data: {
            ...formData,
            source: 'REQUEST_NODE_CLASSIFICATION',
          },
        }),
      });
      if (response.ok) {
        setFormState('success');
        setFormData({
          nombre: '',
          empresa: '',
          email: '',
          telefono: '',
          tipoNodo: 'terminal_intermodal',
          capacidad: '',
          ubicacion: '',
          infraestructura: '',
          mensaje: '',
        });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative section-y bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#FF943B]/30 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />

      <div className="page-shell relative z-10">
        <div className="mb-24 lg:mb-32 max-w-3xl">
          <span className="reveal section-label block">
            REGISTRO_DE_TERMINAL
          </span>
          <h2 className="reveal stagger-1 font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.94] tracking-[-0.02em] uppercase mb-8 lg:mb-10">
            Cuéntenos
            <br />
            <span className="text-[#FF943B]">su operación.</span>
          </h2>
          <p className="reveal stagger-2 text-[#8E9192] text-lg leading-[1.88]">
            Con tipo de instalación, capacidad y ubicación podemos ver si encaja
            en la red y darle seguimiento. Sin esos datos no arrancamos revisión.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12">
          <div className="reveal stagger-2 lg:col-span-7">
            <div className="bg-[#131313] p-14 lg:p-20 border border-[rgba(68,71,72,0.12)]">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-3 h-3 bg-[#FF943B]" />
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                  Datos de su terminal
                </h3>
              </div>

              {formState === 'success' ? (
                <div className="text-center py-20 px-4">
                  <div className="w-16 h-16 bg-[#FF943B] flex items-center justify-center mx-auto mb-6">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A0A0A"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl font-bold uppercase mb-2">
                    Recibimos su información
                  </h4>
                  <p className="text-[#8E9192] text-sm">
                    Le contactamos por correo o teléfono para el siguiente paso.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                        Tipo de nodo *
                      </label>
                      <select
                        name="tipoNodo"
                        required
                        value={formData.tipoNodo}
                        onChange={handleChange}
                        className="form-input-industrial appearance-none cursor-pointer"
                      >
                        <option value="terminal_intermodal">
                          Terminal intermodal
                        </option>
                        <option value="puerto">Puerto / recinto</option>
                        <option value="patio_ferroviario">Patio ferroviario</option>
                        <option value="almacen_granel">Almacén granel / silos</option>
                        <option value="otro">Otro (detallar en notas)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                        Capacidad *
                      </label>
                      <input
                        type="text"
                        name="capacidad"
                        required
                        value={formData.capacidad}
                        onChange={handleChange}
                        className="form-input-industrial"
                        placeholder="p. ej. muelle, vagones/día, TEU, m²"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      required
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className="form-input-industrial"
                      placeholder="Ciudad, estado, corredor, código postal"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                      Infraestructura *
                    </label>
                    <textarea
                      name="infraestructura"
                      required
                      rows={3}
                      value={formData.infraestructura}
                      onChange={handleChange}
                      className="form-input-industrial resize-none"
                      placeholder="Servicios ferroviarios, pesaje, conectividad, certificaciones, restricciones."
                    />
                  </div>

                  <div className="pt-8 border-t border-[rgba(68,71,72,0.15)]">
                    <p className="font-mono text-[9px] text-[#444748] uppercase tracking-[0.15em] mb-8">
                      CONTACTO_RESPUESTA
                    </p>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={formData.nombre}
                          onChange={handleChange}
                          className="form-input-industrial"
                          placeholder="Nombre completo"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                          Organización *
                        </label>
                        <input
                          type="text"
                          name="empresa"
                          required
                          value={formData.empresa}
                          onChange={handleChange}
                          className="form-input-industrial"
                          placeholder="Razón social o unidad operativa"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-8 mt-8">
                      <div>
                        <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input-industrial"
                          placeholder="correo@organización.com"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="form-input-industrial"
                          placeholder="+52 …"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#8E9192] uppercase tracking-[0.2em] block mb-3">
                      Notas de operación
                    </label>
                    <textarea
                      name="mensaje"
                      rows={3}
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="form-input-industrial resize-none"
                      placeholder="Ventanas horarias, clientes ancla, riesgos conocidos…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="btn-primary-industrial w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting'
                      ? 'ENVIANDO…'
                      : 'ENVIAR DATOS'}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  {formState === 'error' && (
                    <p className="text-[#FFB4AB] text-sm text-center">
                      Error al enviar. Intente de nuevo o use WhatsApp.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <div className="reveal stagger-3 lg:col-span-5 flex flex-col gap-10">
            {[
              {
                label: 'OPERADORES',
                title: 'Primero el perfil, luego la carga',
                desc: 'Necesitamos saber qué es su planta y qué puede mover. Con eso vemos si entra al proceso de revisión.',
                items: [
                  'Sin datos concretos no hay fila',
                  'Lo que haga después define su turno',
                  'Mismo trato para patios serios',
                ],
              },
              {
                label: 'CARGADORES',
                title: 'Un canal, mismas reglas',
                desc: 'Si usted manda volumen, la red aplica el mismo criterio de comprobación a todos sus operadores.',
                items: [
                  'Un marco con Solmex, no diez tratos distintos',
                  'Terminales medidas con la misma vara',
                  'Menos idas y vueltas bilateral',
                ],
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-[#131313] p-14 lg:p-20 flex-1 relative overflow-hidden border border-[rgba(68,71,72,0.1)]"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FF943B]" />
                <span className="font-mono text-[10px] text-[#FF943B] uppercase tracking-[0.2em] block mb-4 font-bold">
                  PARA_{card.label}
                </span>
                <h3 className="font-display text-lg font-bold uppercase mb-5 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-[#8E9192] text-sm leading-[1.82] mb-10">
                  {card.desc}
                </p>
                <ul className="space-y-4">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-[#B0B5BA]"
                    >
                      <span className="w-1.5 h-1.5 bg-[#FF943B] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
