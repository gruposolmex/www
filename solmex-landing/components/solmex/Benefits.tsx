'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera, Clock, Users, TrendingUp, Shield } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function Benefits() {
  const benefits = [
    {
      icon: FileText,
      title: 'SLA claros y monitoreados',
    },
    {
      icon: Camera,
      title: 'Evidencia multimedia en cada punto',
    },
    {
      icon: Clock,
      title: 'Respuesta rápida ante incidentes',
    },
    {
      icon: Users,
      title: 'Coordinación unificada',
    },
    {
      icon: TrendingUp,
      title: 'Optimización de tiempos y movimientos',
    },
    {
      icon: Shield,
      title: 'Seguridad y cumplimiento reforzado',
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-32 relative">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&h=1080&fit=crop"
        alt="Organized warehouse stacks showing efficiency"
        className="py-20 lg:py-32"
        parallaxStrength={0.3}
        gradientOverlay="from-solmex-charcoal/88 via-solmex-base/82 to-solmex-charcoal/90"
        blendMode="hard-light"
        overlayOpacity={0.5}
        revealAnimation={true}
        revealDirection="up"
        patternOverlay={true}
      >
        {/* Efficiency and organization overlay effects */}
        <div className="absolute inset-0">
          {/* Organizational grid pattern */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,156,55,0.1) 1px, transparent 1px),
                               linear-gradient(rgba(255,156,55,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          {/* Productivity indicators */}
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/4 w-5 h-5 bg-solmex-yellow/60 rounded-sm blur-sm"
          />
          
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-solmex-orange/70 rounded-sm blur-sm"
          />
          
          {/* Efficiency glow */}
          <motion.div
            animate={{
              opacity: [0.05, 0.2, 0.05],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-solmex-orange/10 rounded-full blur-3xl"
          />
        </div>
      </BackgroundImage>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ventajas de trabajar con Solmex
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-solmex-gray/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-solmex-gray/40 hover:border-solmex-orange/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-solmex-orange/20 to-solmex-yellow/10 rounded-lg flex items-center justify-center group-hover:from-solmex-orange/30 group-hover:to-solmex-yellow/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-solmex-orange" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-solmex-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-solmex-orange">98.7%</div>
              <div className="text-sm text-white/70 mt-1">Disponibilidad</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/20" />
            <div>
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/70 mt-1">Monitoreo</div>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/20" />
            <div>
              <div className="text-4xl font-bold text-solmex-yellow">100%</div>
              <div className="text-sm text-white/70 mt-1">Trazabilidad</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}