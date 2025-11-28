'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Building, BarChart3 } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Diagnóstico',
      description: 'Entendemos su carga, condiciones, ritmos y riesgos.',
    },
    {
      number: '02',
      icon: Building,
      title: 'Asignación de Terminales Certificadas',
      description: 'Seleccionamos, coordinamos y operamos bajo el estándar Solmex.',
    },
    {
      number: '03',
      icon: BarChart3,
      title: 'Control y Evidencia',
      description: 'Reportes, métricas, tiempo, incidentes y comprobación con evidencia multimedia.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1493946947703-a0e68b050bee?w=1920&h=1080&fit=crop"
        alt="Train wheel detail showing precision engineering"
        className="absolute inset-0"
        parallaxStrength={0.3}
        
        gradientOverlay="bg-gradient-to-t from-solmex-charcoal/92 via-solmex-base/85 to-solmex-charcoal/92"
        blendMode="hard-light"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="down"
      >
        {/* Mechanical precision overlay effects */}
        <div className="absolute inset-0">
          {/* Rotating mechanical elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-solmex-orange/20 rounded-full"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-solmex-orange/30 rounded-full" />
          </motion.div>
          
          {/* Precision indicators */}
          <motion.div
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-solmex-yellow/40 rounded-full blur-sm"
          />
          
          {/* Engineering grid */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,156,55,0.3) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,156,55,0.3) 1px, transparent 1px),
                               linear-gradient(45deg, rgba(255,216,28,0.2) 1px, transparent 1px)`,
              backgroundSize: '60px 60px, 60px 60px, 30px 30px'
            }}
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
            Así operamos
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto">
            Estamos construyendo la red logística más confiable y transparente de México.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden lg:block" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-solmex-gray/30 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:bg-solmex-gray/50 transition-all duration-300 group">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="text-5xl font-bold text-solmex-orange/20">
                          {step.number}
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-solmex-orange to-solmex-yellow rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/75 leading-relaxed">
                      {step.description}
                    </p>

                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                          className="w-12 h-0.5 bg-gradient-to-r from-solmex-orange to-transparent origin-left"
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-solmex-orange/10 border border-solmex-orange/30 rounded-full">
            <div className="w-2 h-2 bg-solmex-orange rounded-full animate-pulse" />
            <span className="text-sm font-medium text-solmex-orange">
              Proceso optimizado continuamente
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}