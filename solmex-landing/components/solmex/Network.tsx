'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, TrendingUp } from 'lucide-react';
import BackgroundImage from './BackgroundImage';

export default function Network() {
  const features = [
    'Terminales alineadas a un mismo estándar',
    'Operadores validados y auditados',
    'Integración gradual con tecnología Solmex',
    'Expansión bajo demanda del cliente',
  ];

  return (
    <section id="network" className="py-20 lg:py-32 relative overflow-hidden">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&h=1080&fit=crop"
        alt="Train on tracks with power lines infrastructure"
        className="absolute inset-0"
        parallaxStrength={0.4}
        
        gradientOverlay="bg-gradient-to-br from-solmex-base/60 via-solmex-charcoal/80 to-solmex-base/92"
        blendMode="multiply"
        overlayOpacity={0.5}
        
        revealAnimation={true}
        revealDirection="up"
      >
        {/* Infrastructure network overlay effects */}
        <div className="absolute inset-0">
          {/* Power line simulation */}
          <motion.div
            animate={{
              strokeDasharray: ["20 20", "40 10", "20 20"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <line x1="0" y1="100" x2="400" y2="80" stroke="#FF9C37" strokeWidth="1" opacity="0.4" />
              <line x1="0" y1="120" x2="400" y2="100" stroke="#FFD81C" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="140" x2="400" y2="120" stroke="#FF9C37" strokeWidth="1" opacity="0.4" />
            </svg>
          </motion.div>
          
          {/* Network nodes */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-solmex-orange/50 rounded-full bg-solmex-orange/20"
          />
          
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-2/3 right-1/3 w-6 h-6 border-2 border-solmex-yellow/50 rounded-full bg-solmex-yellow/20"
          />
          
          {/* Infrastructure glow */}
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
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-solmex-orange/10 rounded-full blur-3xl"
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
            Nuestra red de terminales
          </h2>
          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Grupo Amigo funge como nuestro hub principal en Veracruz. A partir de ahí, 
            tejemos una red de operadores certificados en puntos estratégicos del país.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-solmex-orange/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-solmex-orange" />
                  </div>
                </div>
                <p className="text-white/85 text-lg">
                  {feature}
                </p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-r from-solmex-orange/10 to-solmex-yellow/10 border border-solmex-orange/30 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-solmex-orange flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white mb-2">
                    Estamos seleccionando operadores de alto nivel para integrarse a la red Solmex.
                  </p>
                  <p className="text-sm text-white/70">
                    Únase a la red logística más confiable de México.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-solmex-gray/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                <g opacity="0.3">
                  <path
                    d="M 50 100 Q 100 80, 150 100 T 250 100 T 350 100"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                  <path
                    d="M 50 150 Q 100 130, 150 150 T 250 150 T 350 150"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                  <path
                    d="M 50 200 Q 100 180, 150 200 T 250 200 T 350 200"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                </g>

                <motion.circle
                  cx="200"
                  cy="150"
                  r="15"
                  fill="#FF9C37"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <text x="200" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  VER
                </text>

                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <circle cx="120" cy="100" r="8" fill="#FFD81C" opacity="0.6" />
                  <circle cx="280" cy="100" r="8" fill="#FFD81C" opacity="0.6" />
                  <circle cx="150" cy="200" r="8" fill="#FFD81C" opacity="0.6" />
                  <circle cx="250" cy="200" r="8" fill="#FFD81C" opacity="0.6" />
                  <circle cx="100" cy="150" r="6" fill="#FFD81C" opacity="0.4" />
                  <circle cx="300" cy="150" r="6" fill="#FFD81C" opacity="0.4" />
                </motion.g>

                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <line x1="200" y1="150" x2="120" y2="100" stroke="#FF9C37" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="150" x2="280" y2="100" stroke="#FF9C37" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="150" x2="150" y2="200" stroke="#FF9C37" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="150" x2="250" y2="200" stroke="#FF9C37" strokeWidth="0.5" opacity="0.3" />
                </motion.g>
              </svg>
              
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-solmex-orange rounded-full" />
                  <span className="text-xs text-white/70">Hub Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-solmex-yellow rounded-full" />
                  <span className="text-xs text-white/70">Terminales Red</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}