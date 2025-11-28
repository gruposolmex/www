'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue, Variants } from 'framer-motion';

interface BackgroundImageProps {
  src: string;
  alt: string;
  parallaxStrength?: number;
  overlayOpacity?: number;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'soft-light' | 'hard-light';
  gradientOverlay?: string;
  children?: React.ReactNode;
  className?: string;
  priority?: boolean;
  quality?: number;
  revealAnimation?: boolean;
  revealDirection?: 'up' | 'down' | 'left' | 'right';
  atmosphericEffects?: boolean;
  patternOverlay?: boolean;
}

export default function BackgroundImage({
  src,
  alt,
  parallaxStrength = 0.3,
  overlayOpacity = 0.5,
  blendMode = 'overlay',
  gradientOverlay = 'from-solmex-base/60 via-solmex-base/50 to-transparent',
  children,
  className = '',
  priority = false,
  quality = 90,
  revealAnimation = true,
  revealDirection = 'up',
  atmosphericEffects = false,
  patternOverlay = false,
}: BackgroundImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Enhanced parallax with multiple layers
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const adjustedStrength = isMobile ? parallaxStrength * 0.3 : parallaxStrength;
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${adjustedStrength * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.8]);
  
  // Atmospheric effects transforms
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  const lightRayRotation = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const getRevealVariants = (): Variants => {
    const directions = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { x: 60, y: 0 },
      right: { x: -60, y: 0 },
    };

    return {
      hidden: {
        opacity: 0,
        ...directions[revealDirection],
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: 'easeOut' as const,
        },
      },
    };
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
        initial={revealAnimation ? 'hidden' : undefined}
        whileInView={revealAnimation ? 'visible' : undefined}
        viewport={{ once: true, amount: 0.1 }}
        variants={revealAnimation ? getRevealVariants() : undefined}
      >
        {/* Primary Image Layer */}
        <motion.div className="relative w-full h-[120%] -top-[10%]" style={{ opacity }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
            quality={quality}
          />
        </motion.div>

        {/* Gradient Overlay Layer */}
        <div className={`absolute inset-0 bg-gradient-to-b ${gradientOverlay}`} 
             style={{ opacity: overlayOpacity }} />

        {/* Pattern Overlay for texture */}
        {patternOverlay && (
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        )}

        {/* Atmospheric Effects Layer */}
        {atmosphericEffects && (
          <>
            {/* Animated light rays */}
            <motion.div 
              className="absolute inset-0"
              style={{ 
                rotate: lightRayRotation,
                opacity: glowIntensity,
              }}
            >
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
              <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            </motion.div>

            {/* Ambient glow */}
            <motion.div 
              className="absolute inset-0"
              style={{ opacity: glowIntensity }}
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-solmex-orange/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-solmex-yellow/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Cinematic bars for dramatic effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-[10%] bg-gradient-to-b from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </>
        )}

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient"
             style={{
               background: 'radial-gradient(ellipse at center, transparent 0%, rgba(18, 41, 46, 0.4) 100%)',
             }} />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}