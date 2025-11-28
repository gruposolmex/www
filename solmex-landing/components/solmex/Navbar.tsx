'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#what-is-solmex' },
    { label: 'Red de terminales', href: '#network' },
    { label: 'Nosotros', href: '#who-we-serve' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-solmex-base/80' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}>
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/solmex-logo.svg"
              alt="Grupo Solmex"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            
            <button className="ml-4 px-5 py-2 border border-white/60 text-white rounded-md hover:bg-white/10 transition-all duration-200 font-medium">
              Hablar con un asesor
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-solmex-charcoal/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white/85 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full mt-4 px-5 py-3 border border-white/60 text-white rounded-md hover:bg-white/10 transition-all duration-200 font-medium">
                Hablar con un asesor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </nav>
  );
}