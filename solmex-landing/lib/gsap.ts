import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initializeGSAP = () => {
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });
  
  ScrollTrigger.defaults({
    markers: false,
    toggleActions: 'play none none reverse',
  });
};

export { gsap, ScrollTrigger };