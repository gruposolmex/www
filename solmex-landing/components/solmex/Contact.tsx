'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Building2, Mail, Phone as PhoneIcon, MessageSquare } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
        alt="Train on bridge at golden hour connecting landscapes"
        className="absolute inset-0"
        parallaxStrength={0.3}
        
        gradientOverlay="bg-gradient-to-t from-solmex-charcoal/60 via-solmex-base/80 to-solmex-charcoal/88"
        blendMode="overlay"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="up"
      >
        {/* Connection and partnership overlay effects */}
        <div className="absolute inset-0">
          {/* Golden hour glow */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-solmex-yellow/10 via-solmex-orange/15 to-solmex-yellow/10 rounded-full blur-3xl"
          />
          
          {/* Bridge connection lines */}
          <motion.div
            animate={{
              opacity: [0.2, 0.6, 0.2],
              strokeDasharray: ["10 10", "20 5", "10 10"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path
                d="M0 200 Q100 180 200 200 T400 200"
                stroke="#FF9C37"
                strokeWidth="1"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M0 210 Q100 190 200 210 T400 210"
                stroke="#FFD81C"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </motion.div>
          
          {/* Partnership connection points */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/4 w-5 h-5 bg-solmex-orange/50 rounded-full blur-sm"
          />
          
          <motion.div
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-solmex-yellow/60 rounded-full blur-sm"
          />
          
          {/* Warm connection atmosphere */}
          <motion.div
            animate={{
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-br from-solmex-orange/5 via-transparent to-solmex-yellow/5"
          />
        </div>
      </BackgroundImage>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Conectemos su operación
              </h2>
              <p className="text-lg text-white/85 leading-relaxed">
                Compártanos su flujo actual y le mostraremos cómo convertirlo en una 
                operación estandarizada, segura y trazable.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-solmex-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-6 h-6 text-solmex-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Respuesta rápida</h3>
                  <p className="text-white/70">
                    Respondemos normalmente en menos de 24 horas hábiles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-solmex-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-solmex-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Diagnóstico sin costo</h3>
                  <p className="text-white/70">
                    Evaluamos su operación actual y proponemos mejoras concretas.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-solmex-gray/30 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/70">Disponible ahora</span>
              </div>
              <p className="text-white/85">
                Nuestro equipo de expertos está listo para analizar sus necesidades 
                logísticas y diseñar una solución a medida.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-white/70 mb-2">
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 bg-solmex-gray/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-solmex-orange/50 focus:bg-solmex-gray/50 transition-all duration-200"
                      placeholder="Su nombre"
                    />
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                  </div>
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-white/70 mb-2">
                    Empresa
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-11 bg-solmex-gray/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-solmex-orange/50 focus:bg-solmex-gray/50 transition-all duration-200"
                      placeholder="Nombre de su empresa"
                    />
                    <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-white/70 mb-2">
                  Correo
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 bg-solmex-gray/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-solmex-orange/50 focus:bg-solmex-gray/50 transition-all duration-200"
                    placeholder="correo@empresa.com"
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-white/70 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 bg-solmex-gray/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-solmex-orange/50 focus:bg-solmex-gray/50 transition-all duration-200"
                    placeholder="+52 555 1234567"
                  />
                  <PhoneIcon className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-white/70 mb-2">
                  Mensaje
                </label>
                <div className="relative">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 pl-11 bg-solmex-gray/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-solmex-orange/50 focus:bg-solmex-gray/50 transition-all duration-200 resize-none"
                    placeholder="Cuéntenos sobre su operación actual y necesidades..."
                  />
                  <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-solmex-orange text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,156,55,0.3)] transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Hablar con un asesor</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}