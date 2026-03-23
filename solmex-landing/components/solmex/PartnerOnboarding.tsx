'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNextcloudSync } from '@/hooks/useNextcloudSync';

interface PartnerFormData {
  partnerName: string;
  partnerEmail: string;
  partnerPhone: string;
  partnerCompany: string;
  terminalAddress: string;
  terminalCity: string;
  terminalState: string;
  terminalZip: string;
  terminalCoords: string;
  terminalType: string;
  terminalCapacity: string;
  terminalDescription: string;
  services: string[];
  additionalServices: string;
  certifications: string;
  compliance: string;
  yearsOperating: string;
  currentClients: string;
  whyJoin: string;
  termsAccept: boolean;
}

const TOTAL_STEPS = 6;

export default function PartnerOnboarding() {
  const { sync, loading, success, error, reset } = useNextcloudSync();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PartnerFormData>({
    partnerName: '',
    partnerEmail: '',
    partnerPhone: '',
    partnerCompany: '',
    terminalAddress: '',
    terminalCity: '',
    terminalState: '',
    terminalZip: '',
    terminalCoords: '',
    terminalType: '',
    terminalCapacity: '',
    terminalDescription: '',
    services: [],
    additionalServices: '',
    certifications: '',
    compliance: '',
    yearsOperating: '',
    currentClients: '',
    whyJoin: '',
    termsAccept: false,
  });
  const [validationErrors, setValidationErrors] = useState<Record<number, string>>({});

  const validateStep = (step: number): boolean => {
    const errors: Record<number, string> = { ...validationErrors };

    switch (step) {
      case 1:
        if (!formData.partnerName || !formData.partnerEmail || !formData.partnerPhone || !formData.partnerCompany) {
          errors[1] = 'Por favor complete todos los campos requeridos';
          setValidationErrors(errors);
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.partnerEmail)) {
          errors[1] = 'Por favor ingrese un correo electrónico válido';
          setValidationErrors(errors);
          return false;
        }
        delete errors[1];
        setValidationErrors(errors);
        return true;

      case 2:
        if (!formData.terminalAddress || !formData.terminalCity || !formData.terminalState || !formData.terminalZip) {
          errors[2] = 'Por favor complete todos los campos requeridos';
          setValidationErrors(errors);
          return false;
        }
        delete errors[2];
        setValidationErrors(errors);
        return true;

      case 3:
        if (!formData.terminalType || !formData.terminalDescription) {
          errors[3] = 'Por favor complete todos los campos requeridos';
          setValidationErrors(errors);
          return false;
        }
        delete errors[3];
        setValidationErrors(errors);
        return true;

      case 6:
        if (!formData.whyJoin) {
          errors[6] = 'Por favor explique por qué quiere unirse a la red Solmex';
          setValidationErrors(errors);
          return false;
        }
        if (!formData.termsAccept) {
          errors[6] = 'Debe aceptar los términos y condiciones para continuar';
          setValidationErrors(errors);
          return false;
        }
        delete errors[6];
        setValidationErrors(errors);
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    reset();

    const partnerId = `PARTNER-${Date.now().toString(36).toUpperCase()}`;
    const partnerData = {
      id: partnerId,
      type: 'partner-onboarding',
      ...formData,
      timestamp: new Date().toISOString(),
      timestampLocal: new Date().toLocaleString('es-MX', {
        timeZone: 'America/Mexico_City',
        dateStyle: 'full',
        timeStyle: 'short',
      }),
      source: 'Landing Page - Formulario de Partners',
      url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? (document.referrer || 'Directo') : 'Directo',
      status: 'nuevo',
    };

    try {
      await sync(partnerData, 'partner');

      // Store backup
      if (typeof window !== 'undefined') {
        try {
          const partners = JSON.parse(localStorage.getItem('solmex_partners') || '[]');
          partners.push(partnerData);
          localStorage.setItem('solmex_partners', JSON.stringify(partners));
        } catch (e) {
          console.log('Error saving to localStorage');
        }
      }

      // Reset form and close modal after success
      setTimeout(() => {
        setFormData({
          partnerName: '',
          partnerEmail: '',
          partnerPhone: '',
          partnerCompany: '',
          terminalAddress: '',
          terminalCity: '',
          terminalState: '',
          terminalZip: '',
          terminalCoords: '',
          terminalType: '',
          terminalCapacity: '',
          terminalDescription: '',
          services: [],
          additionalServices: '',
          certifications: '',
          compliance: '',
          yearsOperating: '',
          currentClients: '',
          whyJoin: '',
          termsAccept: false,
        });
        setCurrentStep(1);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Error submitting partner form:', err);
    }
  };

  const toggleService = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter((s) => s !== service)
        : [...formData.services, service],
    });
  };

  if (!isOpen) {
    return (
      <section id="partner-onboarding" className="py-20 lg:py-32 relative bg-solmex-gray/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-solmex-orange mb-4">Para Operadores</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Únase a la Red Solmex
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
            Complete el formulario para integrar su terminal a nuestra red certificada.
            Evaluaremos su perfil y nos pondremos en contacto para iniciar el proceso de integración.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-4 bg-solmex-orange text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(255,156,55,0.3)] transition-all duration-300"
          >
            Iniciar Proceso de Integración
          </button>
        </div>
      </section>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        onClick={() => !loading && setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-solmex-gray w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold">Únase a la Red Solmex</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 bg-solmex-base/50 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                const step = i + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;

                return (
                  <React.Fragment key={step}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        isActive
                          ? 'bg-solmex-orange text-white shadow-lg shadow-solmex-orange/50'
                          : isCompleted
                          ? 'bg-solmex-orange/80 text-white'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step}
                    </div>
                    {step < TOTAL_STEPS && (
                      <div
                        className={`flex-1 h-0.5 ${
                          isCompleted ? 'bg-solmex-orange' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <p className="text-sm text-white/70 text-center">
              Paso <strong className="text-solmex-orange">{currentStep}</strong> de{' '}
              <strong>{TOTAL_STEPS}</strong>
            </p>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Información de Contacto</h3>
                    <p className="text-white/70">
                      Comencemos con sus datos de contacto para poder comunicarnos con usted.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        value={formData.partnerName}
                        onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Correo Electrónico *</label>
                      <input
                        type="email"
                        value={formData.partnerEmail}
                        onChange={(e) => setFormData({ ...formData, partnerEmail: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        value={formData.partnerPhone}
                        onChange={(e) => setFormData({ ...formData, partnerPhone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Empresa / Razón Social *</label>
                      <input
                        type="text"
                        value={formData.partnerCompany}
                        onChange={(e) => setFormData({ ...formData, partnerCompany: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        required
                      />
                    </div>
                  </div>
                  {validationErrors[1] && (
                    <p className="text-red-400 text-sm">{validationErrors[1]}</p>
                  )}
                </motion.div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ubicación de la Terminal</h3>
                    <p className="text-white/70">
                      Proporcione la ubicación exacta de su terminal para evaluar su integración a la red.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Dirección Completa *</label>
                      <input
                        type="text"
                        value={formData.terminalAddress}
                        onChange={(e) => setFormData({ ...formData, terminalAddress: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        placeholder="Calle, número, colonia, ciudad, estado"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ciudad *</label>
                        <input
                          type="text"
                          value={formData.terminalCity}
                          onChange={(e) => setFormData({ ...formData, terminalCity: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Estado *</label>
                        <input
                          type="text"
                          value={formData.terminalState}
                          onChange={(e) => setFormData({ ...formData, terminalState: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Código Postal *</label>
                        <input
                          type="text"
                          value={formData.terminalZip}
                          onChange={(e) => setFormData({ ...formData, terminalZip: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Coordenadas (opcional)</label>
                        <input
                          type="text"
                          value={formData.terminalCoords}
                          onChange={(e) => setFormData({ ...formData, terminalCoords: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                          placeholder="Lat, Lng"
                        />
                      </div>
                    </div>
                  </div>
                  {validationErrors[2] && (
                    <p className="text-red-400 text-sm">{validationErrors[2]}</p>
                  )}
                </motion.div>
              )}

              {/* Step 3: Terminal Profile */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Perfil de la Terminal</h3>
                    <p className="text-white/70">
                      Describa las características principales de su terminal y su capacidad operativa.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo de Terminal *</label>
                      <select
                        value={formData.terminalType}
                        onChange={(e) => setFormData({ ...formData, terminalType: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        required
                      >
                        <option value="">Seleccione un tipo</option>
                        <option value="ferroviaria">Terminal Ferroviaria</option>
                        <option value="portuaria">Terminal Portuaria</option>
                        <option value="intermodal">Terminal Intermodal</option>
                        <option value="almacen">Centro de Almacenamiento</option>
                        <option value="distribucion">Centro de Distribución</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Capacidad de Almacenamiento</label>
                      <input
                        type="text"
                        value={formData.terminalCapacity}
                        onChange={(e) => setFormData({ ...formData, terminalCapacity: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        placeholder="Ej: 5,000 m² o 10,000 toneladas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Descripción de la Terminal *</label>
                      <textarea
                        value={formData.terminalDescription}
                        onChange={(e) => setFormData({ ...formData, terminalDescription: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        rows={4}
                        placeholder="Describa las características principales de su terminal, infraestructura disponible, equipamiento, etc."
                        required
                      />
                    </div>
                  </div>
                  {validationErrors[3] && (
                    <p className="text-red-400 text-sm">{validationErrors[3]}</p>
                  )}
                </motion.div>
              )}

              {/* Step 4: Services */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Servicios Ofrecidos</h3>
                    <p className="text-white/70">
                      Seleccione todos los servicios que su terminal puede ofrecer a la red Solmex.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      'almacenamiento',
                      'carga-descarga',
                      'transporte-ferroviario',
                      'transporte-carretero',
                      'consolidacion',
                      'cross-docking',
                      'manejo-especializado',
                      'servicios-aduanales',
                    ].map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 p-3 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => toggleService(service)}
                          className="w-4 h-4 text-solmex-orange"
                        />
                        <span className="text-sm capitalize">{service.replace(/-/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Servicios Adicionales</label>
                    <textarea
                      value={formData.additionalServices}
                      onChange={(e) => setFormData({ ...formData, additionalServices: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                      rows={3}
                      placeholder="Describa otros servicios o capacidades especiales de su terminal"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Certifications */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certificaciones y Compliance</h3>
                    <p className="text-white/70">
                      Comparta información sobre certificaciones y cumplimiento normativo de su terminal.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificaciones</label>
                      <textarea
                        value={formData.certifications}
                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        rows={3}
                        placeholder="Liste las certificaciones que posee (ISO, NOM, etc.)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cumplimiento Normativo</label>
                      <textarea
                        value={formData.compliance}
                        onChange={(e) => setFormData({ ...formData, compliance: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        rows={3}
                        placeholder="Describa el cumplimiento con normativas de seguridad, medio ambiente, etc."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Final Info */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2">Información Final</h3>
                    <p className="text-white/70">
                      Complete la información adicional y acepte los términos para finalizar su solicitud.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Años de Operación</label>
                      <input
                        type="number"
                        value={formData.yearsOperating}
                        onChange={(e) => setFormData({ ...formData, yearsOperating: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        placeholder="Ej: 10"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Clientes Actuales (opcional)</label>
                      <textarea
                        value={formData.currentClients}
                        onChange={(e) => setFormData({ ...formData, currentClients: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        rows={2}
                        placeholder="Mencione algunos de sus principales clientes actuales"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        ¿Por qué quiere unirse a la red Solmex? *
                      </label>
                      <textarea
                        value={formData.whyJoin}
                        onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white"
                        rows={3}
                        placeholder="Comparta sus motivaciones y expectativas"
                        required
                      />
                    </div>
                    <label className="flex items-start gap-3 p-4 bg-white/5 border border-white/20 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.termsAccept}
                        onChange={(e) => setFormData({ ...formData, termsAccept: e.target.checked })}
                        className="mt-1 w-4 h-4 text-solmex-orange"
                        required
                      />
                      <span className="text-sm text-white/80">
                        Acepto que Grupo Solmex procese mi información para evaluar mi solicitud de
                        integración a la red. Entiendo que se realizará una evaluación y que el contacto
                        será establecido según los criterios de la empresa.{' '}
                        <a href="/aviso-privacidad.html" target="_blank" className="text-solmex-orange underline">
                          Ver aviso de privacidad
                        </a>
                        .
                      </span>
                    </label>
                  </div>
                  {validationErrors[6] && (
                    <p className="text-red-400 text-sm">{validationErrors[6]}</p>
                  )}

                  {/* Success/Error Messages */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-400 font-medium">¡Solicitud enviada!</p>
                        <p className="text-green-300/80 text-sm mt-1">
                          Nos pondremos en contacto con usted en breve.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-400 font-medium">Error al enviar</p>
                        <p className="text-red-300/80 text-sm mt-1">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStep === 1 || loading}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Anterior
            </button>
            <button
              onClick={currentStep === TOTAL_STEPS ? handleSubmit : nextStep}
              disabled={loading}
              className="px-6 py-3 bg-solmex-orange hover:bg-solmex-orange/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enviando...
                </>
              ) : currentStep === TOTAL_STEPS ? (
                'Enviar Solicitud'
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


