'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Droplets, Wheat, Package, Globe, AlertTriangle } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function WhoWeServe() {
  const industries = [
    { icon: Factory, name: 'Petroquímicos' },
    { icon: Droplets, name: 'Fertilizantes' },
    { icon: Wheat, name: 'Agroindustria' },
    { icon: Package, name: 'Carga general' },
    { icon: Globe, name: 'Importadores/Exportadores' },
    { icon: AlertTriangle, name: 'Operaciones críticas de alto volumen' },
  ];

  return (
    <section id="who-we-serve" className="py-20 lg:py-32 relative overflow-hidden">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&h=1080&fit=crop"
        alt="Orange cargo train through vast landscape"
        className="absolute inset-0"
        parallaxStrength={0.5}
        
        gradientOverlay="bg-gradient-to-br from-solmex-base/60 via-solmex-charcoal/85 to-solmex-base/92"
        blendMode="soft-light"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="left"
      >
        {/* Scale and reach overlay effects */}
        <div className="absolute inset-0">
          {/* Horizon line effect */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-solmex-orange/40 to-transparent"
          />
          
          {/* Movement indicators */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-solmex-yellow/60 to-transparent"
          />
          
          {/* Scale indicators */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/4 w-6 h-6 border-2 border-solmex-orange/50 rounded-full"
          />
          
          <motion.div
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 left-1/5 w-4 h-4 border-2 border-solmex-yellow/60 rounded-full"
          />
          
          {/* Landscape glow */}
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-solmex-orange/10 to-transparent"
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
            Para operaciones donde no hay margen de error
          </h2>
          <p className="text-lg text-white/85 max-w-3xl mx-auto">
            Ideal para industrias con altos requerimientos de trazabilidad, 
            cumplimiento y disponibilidad real:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-solmex-gray/30 to-solmex-gray/10 backdrop-blur-sm rounded-xl border border-white/10 p-8 hover:from-solmex-gray/50 hover:to-solmex-gray/30 hover:border-solmex-orange/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-solmex-orange/10 to-solmex-yellow/10 rounded-2xl flex items-center justify-center group-hover:from-solmex-orange/20 group-hover:to-solmex-yellow/20 transition-colors duration-300">
                        <Icon className="w-10 h-10 text-solmex-orange" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-solmex-yellow rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {industry.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-solmex-orange/10 via-transparent to-solmex-yellow/10 rounded-2xl border border-white/10 p-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Opera en una industria regulada?
              </h3>
              <p className="text-white/75">
                Nuestro sistema garantiza cumplimiento y trazabilidad total.
              </p>
            </div>
            <button className="px-8 py-3 bg-solmex-orange text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,156,55,0.3)] transition-all duration-300">
              Solicitar diagnóstico
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}