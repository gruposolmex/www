import Image from 'next/image';
import HeroCTAs from './HeroCTAs';

export default function HeroContent() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary/10 backdrop-blur-md border border-solmex-orange/20 rounded-full mb-6 w-fit">
          <div className="w-2 h-2 bg-solmex-orange rounded-full animate-pulse" />
          <span className="text-solmex-orange font-medium text-sm uppercase tracking-wider">
            Operador Logístico Inteligente
          </span>
        </div>
        
        <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6">
          La red inteligente de
          <span className="text-transparent bg-clip-text bg-gradient-primary"> terminales</span> en México
        </h1>
        
        <h2 className="hero-subtitle text-2xl lg:text-3xl text-white/90 font-light mb-6">
          Operación confiable. Evidencia verificable.
        </h2>
        
        <p className="hero-description text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl">
          Coordinamos una red de terminales certificadas para que su carga
          se mueva con certeza, trazabilidad y respuesta inmediata.
        </p>
        
        <HeroCTAs />
      </div>
      
      <div className="hero-isotype flex items-center justify-center relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
        <div className="relative w-32 h-32 lg:w-40 lg:h-40 animate-float">
          <Image
            src="/brand/logo/solmex-isotype.svg"
            alt="Solmex Isotype"
            width={160}
            height={160}
            className="drop-shadow-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-radial opacity-30 blur-3xl scale-150 animate-pulse" />
        </div>
      </div>
    </>
  );
}