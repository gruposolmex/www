import Image from 'next/image';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 41, 46, 0.95) 0%, rgba(18, 41, 46, 0.7) 50%, rgba(18, 41, 46, 0.95) 100%)',
        }}
      />
      
      <div 
        className="hero-pattern absolute inset-0 z-[2] opacity-30"
        style={{
          backgroundImage: 'url(/brand/patterns/stripes-45.svg)',
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          transform: 'scale(1.1)',
        }}
      />
      
      <div className="hero-freight absolute inset-0 z-[0]">
        <Image
          src="/media/freight-blur.jpg"
          alt="Freight Background"
          fill
          className="object-cover opacity-40 blur-md scale-110"
          priority
          quality={90}
        />
      </div>
      
      <div 
        className="absolute inset-0 z-[3] bg-gradient-dark-overlay pointer-events-none"
      />
    </div>
  );
}