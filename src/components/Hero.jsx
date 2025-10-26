import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import NeuralPanel from './NeuralPanel';

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.35),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-24 pt-28 lg:grid lg:min-h-[92vh] lg:grid-cols-2 lg:gap-12 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 flex flex-col justify-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            <span>Realtime AI voice coach</span>
          </div>
          <h1 className="font-display bg-gradient-to-br from-white to-neutral-300 bg-clip-text text-4xl font-semibold leading-tight text-transparent sm:text-5xl lg:text-6xl">
            Interview smarter with adaptive guidance—not guesswork
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Practice live with an AI that probes, listens, and advises. Get instant topic suggestions and actionable feedback tailored to your role.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
            >
              Try the free demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore features
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/3] max-w-[760px] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 shadow-2xl backdrop-blur">
            <NeuralPanel />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-[-60px] h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
        </motion.div>
      </div>
    </header>
  );
}
