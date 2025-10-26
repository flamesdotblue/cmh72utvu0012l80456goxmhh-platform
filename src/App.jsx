import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveDemo from './components/LiveDemo';
import Features from './components/Features';
import CTA from './components/CTA';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white antialiased">
      <Navbar />
      <Hero />
      <LiveDemo />
      <Features />
      <CTA />
      <div className="py-10 text-center text-sm text-neutral-400">
        <p>© {new Date().getFullYear()} AuraHire — AI-powered interview platform</p>
      </div>
    </div>
  );
}
