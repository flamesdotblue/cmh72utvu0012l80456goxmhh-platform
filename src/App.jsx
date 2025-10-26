import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white antialiased">
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <div className="py-10 text-center text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} AuraHire — AI-powered interview platform</p>
      </div>
    </div>
  );
}
