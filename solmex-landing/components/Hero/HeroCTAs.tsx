import Link from 'next/link';

export default function HeroCTAs() {
  return (
    <div className="hero-ctas flex flex-col sm:flex-row gap-4 mt-10">
      <Link
        href="#contact"
        className="group relative px-8 py-4 bg-gradient-primary text-white font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-solmex-orange/30 hover:scale-105"
      >
        <span className="relative z-10">Conectar mi operación</span>
        <div className="absolute inset-0 bg-gradient-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <Link
        href="#schedule"
        className="group px-8 py-4 text-white font-semibold text-lg rounded-xl border border-white/20 backdrop-blur-md bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:shadow-xl hover:scale-105"
      >
        <span className="relative z-10">Agendar una llamada</span>
      </Link>
    </div>
  );
}