'use client';

import { useEffect, useState } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  enableOnLowPower?: boolean;
}

export default function PerformanceOptimizer({ 
  children, 
  fallback = null,
  enableOnLowPower = true 
}: PerformanceOptimizerProps) {
  const [shouldOptimize, setShouldOptimize] = useState(false);
  
  useEffect(() => {
    const checkPerformance = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for low power mode (Safari)
      const isLowPower = (navigator as any).connection?.saveData || 
                        (window as any).DeviceMotionEvent?.requestPermission === undefined;
      
      // Check device capabilities
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      const hasSlowConnection = (navigator as any).connection?.effectiveType?.includes('2g');
      
      setShouldOptimize(
        prefersReducedMotion || 
        (enableOnLowPower && (isLowPower || isLowEndDevice || hasSlowConnection))
      );
    };
    
    checkPerformance();
    
    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkPerformance();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableOnLowPower]);
  
  if (shouldOptimize && fallback) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

// Hook for performance-aware animations
export function usePerformanceAwareAnimation() {
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceAnimations(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceAnimations(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return {
    shouldReduceAnimations,
    getAnimationProps: (normalProps: any, reducedProps?: any) => 
      shouldReduceAnimations && reducedProps ? reducedProps : normalProps,
  };
}