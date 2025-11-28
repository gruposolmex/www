import Navbar from '@/components/solmex/Navbar';
import Hero from '@/components/solmex/Hero';
import WhatIsSolmex from '@/components/solmex/WhatIsSolmex';
import ValueProp from '@/components/solmex/ValueProp';
import HowItWorks from '@/components/solmex/HowItWorks';
import Network from '@/components/solmex/Network';
import Benefits from '@/components/solmex/Benefits';
import WhoWeServe from '@/components/solmex/WhoWeServe';
import Contact from '@/components/solmex/Contact';
import Footer from '@/components/solmex/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsSolmex />
        <ValueProp />
        <HowItWorks />
        <Network />
        <Benefits />
        <WhoWeServe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}