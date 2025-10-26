import React from 'react';
import { motion } from 'framer-motion';
import { User, Mic, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: User,
    title: 'Choose your role',
    desc: 'Pick job family, seniority, and company style. Configure difficulty and time limits.',
  },
  {
    icon: Mic,
    title: 'Talk it out',
    desc: 'Have a natural voice conversation. The AI follows up, probes, and reacts in realtime.',
  },
  {
    icon: BarChart3,
    title: 'Review insights',
    desc: 'Get structured feedback and a personalized plan to improve on your next run.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">How it works</h2>
        <p className="mt-4 text-neutral-300">From setup to insights in minutes—no clunky UI, just a sleek flow that feels natural.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-violet-300">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-neutral-300">Step {i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
