'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Network, Camera } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function WhatIsSolmex() {
  const features = [
    {
      icon: Shield,
      title: 'Operación Confiable',
      description: 'Terminales certificadas, procesos estandarizados, ejecución predecible.',
    },
    {
      icon: Network,
      title: 'Coordinación Centralizada',
      description: 'Un solo punto de contacto para toda su red. Respuesta rápida. Escalamiento inmediato.',
    },
    {
      icon: Camera,
      title: 'Evidencia Verificable',
      description: 'Fotos, video, registros de tiempo, métricas y trazabilidad operacional en un solo panel.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="what-is-solmex" className="py-20 lg:py-32 relative">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=1080&fit=crop"
        alt="Control room with operational intelligence systems"
        className="absolute inset-0"
        parallaxStrength={0.4}
        
        gradientOverlay="bg-gradient-to-b from-solmex-charcoal/70 via-solmex-base/50 to-solmex-charcoal/70"
        blendMode="soft-light"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="right"
        patternOverlay={true}
      >
        {/* Tech-inspired overlay effects */}
        <div className="absolute inset-0">
          {/* Grid overlay for tech aesthetic */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,156,55,0.2) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,156,55,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Scanning line effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 w-1 h-full bg-gradient-to-b from-transparent via-solmex-orange/30 to-transparent"
          />
          
          {/* Pulsing data points */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/3 w-3 h-3 bg-solmex-yellow rounded-full blur-sm"
          />
          
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-solmex-orange rounded-full blur-sm"
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
            Confianza operacional como servicio
          </h2>
          <p className="text-lg text-white/85 max-w-4xl mx-auto leading-relaxed">
            Solmex combina experiencia operativa, disciplina logística y tecnología para entregar 
            terminales confiables respaldadas por evidencia verificable. Nuestro modelo integra a 
            los mejores operadores del país bajo un solo estándar, un solo punto de coordinación 
            y un solo lenguaje de desempeño.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-solmex-gray/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-solmex-gray/50 transition-all duration-300 hover:shadow-xl hover:shadow-solmex-orange/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-solmex-orange to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />
                
                <div className="mb-6">
                  <div className="w-14 h-14 bg-solmex-orange/20 rounded-lg flex items-center justify-center group-hover:bg-solmex-orange/30 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-solmex-orange" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/75 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}