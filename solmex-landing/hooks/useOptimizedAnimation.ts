'use client';

import { useEffect, useState } from 'react';

export function useOptimizedAnimation() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [devicePerformance, setDevicePerformance] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Check device performance indicators
    const checkPerformance = () => {
      // Check memory if available
      const memory = (navigator as any).deviceMemory;
      // Check CPU cores
      const cores = navigator.hardwareConcurrency;
      // Check connection speed
      const connection = (navigator as any).connection;

      if (memory && memory < 4) {
        setDevicePerformance('low');
      } else if (cores && cores < 4) {
        setDevicePerformance('medium');
      } else if (connection && connection.effectiveType && connection.effectiveType < '4g') {
        setDevicePerformance('medium');
      }

      // Check battery level if available
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          if (battery.level < 0.2) {
            setIsLowPowerMode(true);
          }
          
          battery.addEventListener('levelchange', () => {
            setIsLowPowerMode(battery.level < 0.2);
          });
        });
      }
    };

    checkPerformance();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    shouldReduceMotion,
    isLowPowerMode,
    devicePerformance,
    animationSettings: {
      parallaxStrength: shouldReduceMotion || devicePerformance === 'low' ? 0 : 
                       devicePerformance === 'medium' ? 0.2 : 0.3,
      enableAtmosphericEffects: !shouldReduceMotion && devicePerformance === 'high' && !isLowPowerMode,
      enablePatternOverlay: devicePerformance !== 'low',
      imageQuality: devicePerformance === 'low' ? 75 : devicePerformance === 'medium' ? 85 : 95,
      enableRevealAnimations: !shouldReduceMotion,
    },
  };
}