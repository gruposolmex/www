import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroStats from './HeroStats';
import HeroMotion from './HeroMotion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-solmex-base">
      <HeroBackground />
      <HeroMotion />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-14 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-10 relative">
            <HeroContent />
          </div>
          <HeroStats />
        </div>
      </div>
    </section>
  );
}