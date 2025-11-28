'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function Hero() {
  const { scrollY } = useScroll();
  const cardY = useTransform(scrollY, [0, 500], [0, -50]);
  const cardRotate = useTransform(scrollY, [0, 500], [0, -2]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <BackgroundImage
        src="/bg.jpg"
        alt="Train through mountainous landscape at dramatic sunset"
        className="absolute inset-0"
        parallaxStrength={0.3}
        gradientOverlay="from-solmex-base/70 via-solmex-base/40 to-solmex-base/60"
        blendMode="overlay"
        overlayOpacity={0.6}
        revealAnimation={true}
        revealDirection="up"
      >
        {/* Enhanced atmospheric layers */}
        <div className="absolute inset-0">
          {/* Cinematic bars for dramatic effect */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Dynamic light rays */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-solmex-orange/5 rounded-full blur-3xl"
          />
          
          {/* Ambient glow */}
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-solmex-yellow/5 rounded-full blur-3xl"
          />
        </div>
      </BackgroundImage>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="w-1 h-5 bg-solmex-orange" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Operador Logístico Inteligente
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                La red inteligente de terminales en México
              </h1>

              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-solmex-orange">
                  Operación confiable. Evidencia verificable.
                </h2>
                <p className="text-lg text-white/85 leading-relaxed">
                  Coordinamos una red de terminales certificadas para que su carga se mueva con certeza, 
                  trazabilidad y respuesta inmediata.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-solmex-orange text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,156,55,0.3)] transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Conectar mi operación</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Agendar una llamada</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/70 font-medium">
                Diseñado para operaciones críticas · SLA claros · Evidencia multimedia · Coordinación centralizada
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ y: cardY, rotate: cardRotate }}
            className="relative"
          >
            <div className="bg-solmex-gray/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-6 lg:p-8">
              <h3 className="text-lg font-bold mb-6 text-white/90">Panel Solmex (ejemplo)</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Disponibilidad de terminales</span>
                  <span className="text-lg font-bold text-solmex-orange">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Tiempos promedio de estancia</span>
                  <span className="text-lg font-bold text-white">12.4 h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Incidentes resueltos</span>
                  <span className="text-lg font-bold text-green-400">100%</span>
                </div>
              </div>

              <div className="relative h-48 bg-solmex-charcoal/30 rounded-lg overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-px opacity-20">
                  {[...Array(48)].map((_, i) => (
                    <div key={i} className="bg-white/10" />
                  ))}
                </div>
                
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                  <circle cx="50" cy="60" r="6" fill="#FFD81C" className="animate-pulse" />
                  <circle cx="100" cy="40" r="4" fill="#FF9C37" />
                  <circle cx="150" cy="80" r="5" fill="#FFD81C" />
                  <circle cx="120" cy="70" r="4" fill="#FF9C37" />
                  
                  <line x1="50" y1="60" x2="100" y2="40" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <line x1="100" y1="40" x2="120" y2="70" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  <line x1="120" y1="70" x2="150" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
                </svg>
                
                <div className="absolute bottom-2 left-2 text-xs text-white/50">
                  Red de Terminales México
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}