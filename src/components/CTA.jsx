import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="get-started" className="relative mx-auto max-w-7xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-amber-500/20 p-8 sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.35),transparent_60%)] blur-2xl" />
          <div className="absolute right-10 bottom-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.25),transparent_60%)] blur-2xl" />
        </div>
        <div className="relative">
          <h3 className="text-2xl font-semibold sm:text-3xl">Turn interviews into a skill you can master</h3>
          <p className="mt-3 max-w-2xl text-neutral-100/90">
            Join thousands leveling up with AI-powered practice. No credit card required.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
