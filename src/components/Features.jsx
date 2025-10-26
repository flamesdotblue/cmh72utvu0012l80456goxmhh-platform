import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Shield, Timer, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Real voice conversations',
    desc: 'Practice natural interviews with a responsive AI voice agent that adapts to your answers in realtime.',
  },
  {
    icon: BarChart3,
    title: 'Instant, actionable feedback',
    desc: 'Receive measurable insights on clarity, pace, filler words, and content structure after each session.',
  },
  {
    icon: Timer,
    title: 'Time-boxed rounds',
    desc: 'Simulate realistic interview loops with configurable roles, difficulty, and time constraints.',
  },
  {
    icon: Shield,
    title: 'Private by default',
    desc: 'Your practice data is encrypted and never shared—manage what you keep or delete anytime.',
  },
];

export default function Features() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20" id="features">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
          Everything you need to interview with confidence
        </h2>
        <p className="mt-4 text-neutral-300">
          Designed with a minimal, futuristic interface that gets out of your way so you can focus on delivering your best.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent_60%)] blur-2xl" />
            </div>
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-violet-300">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
