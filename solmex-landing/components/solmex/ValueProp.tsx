'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Eye } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function ValueProp() {
  const values = [
    {
      icon: CheckCircle,
      title: 'Eliminamos incertidumbre operativa',
      description: 'Cada movimiento está documentado. Cada excepción tiene dueño. Cada indicador se mide.',
    },
    {
      icon: Target,
      title: 'Tomamos responsabilidad por la red',
      description: 'No es un broker. No es un software. Es un operador inteligente que responde por cada terminal en su nombre.',
    },
    {
      icon: Eye,
      title: 'Visibilidad real para decisiones críticas',
      description: 'Acceda a desempeño, estatus, evidencias y anomalías desde un solo panel.',
    },
  ];

  return (
    <section id="value-prop" className="py-20 lg:py-32 relative overflow-hidden">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop"
        alt="Hand using tablet with map tracking in warehouse"
        className="absolute inset-0"
        parallaxStrength={0.5}
        
        gradientOverlay="bg-gradient-to-br from-solmex-base/88 via-solmex-charcoal/82 to-solmex-base/90"
        blendMode="multiply"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="left"
      >
        {/* Digital interaction overlay effects */}
        <div className="absolute inset-0">
          {/* Digital interface glow */}
          <motion.div
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/2 w-80 h-80 bg-solmex-yellow/10 rounded-full blur-2xl"
          />
          
          {/* Tracking lines effect */}
          <motion.div
            animate={{
              strokeDasharray: ["0 100", "50 50", "100 0"],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path
                d="M50 150 Q200 50 350 150"
                stroke="#FF9C37"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M50 200 Q200 250 350 200"
                stroke="#FFD81C"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </motion.div>
          
          {/* Interactive data points */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 right-1/3 w-4 h-4 bg-solmex-orange/60 rounded-full shadow-lg shadow-solmex-orange/30"
          />
          
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-solmex-yellow/70 rounded-full shadow-lg shadow-solmex-yellow/30"
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
            Hacemos que sus terminales funcionen como un solo sistema
          </h2>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            La mayoría de las cadenas logísticas fallan no por falta de infraestructura, 
            sino por falta de coordinación, evidencia y estandarización.
            <span className="block mt-2 font-semibold text-solmex-orange">
              Solmex resuelve ese vacío.
            </span>
          </p>
        </motion.div>

        <div className="space-y-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-6 p-8 rounded-xl bg-gradient-to-r from-solmex-gray/20 to-transparent border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-solmex-orange to-solmex-yellow/50 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-white/75 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="bg-solmex-charcoal/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Terminal A</div>
                <div className="w-20 h-20 bg-solmex-gray rounded-lg border border-white/20" />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-16 h-px bg-white/20" />
                <div className="w-2 h-2 bg-solmex-yellow rounded-full animate-pulse" />
                <div className="w-16 h-px bg-white/20" />
              </div>

              <div className="relative">
                <div className="text-xs uppercase tracking-wider text-solmex-orange mb-2 text-center">Solmex</div>
                <div className="w-24 h-24 bg-gradient-to-br from-solmex-orange to-solmex-yellow rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-lg">HUB</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-16 h-px bg-white/20" />
                <div className="w-2 h-2 bg-solmex-yellow rounded-full animate-pulse" />
                <div className="w-16 h-px bg-white/20" />
              </div>

              <div className="text-center">
                <div className="text-xs uppercase tracking-wider text-white/50 mb-2">Terminal B</div>
                <div className="w-20 h-20 bg-solmex-gray rounded-lg border border-white/20" />
              </div>
            </div>
            
            <p className="text-center text-sm text-white/50 mt-6">
              Sistema integrado de coordinación y control
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}