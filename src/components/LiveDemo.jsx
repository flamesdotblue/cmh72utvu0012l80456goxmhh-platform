import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Zap } from 'lucide-react';

const SUGGESTIONS = {
  default: [
    'Clarify scope before diving in',
    'Structure with STAR for behavioral',
    'Quantify impact and trade-offs',
    'Watch filler words and pacing',
  ],
  engineer: {
    base: [
      'Data structures: arrays, hash maps, heaps',
      'Complexity: time/space analysis guidelines',
      'Debugging strategies and observability',
      'System design: requirements and constraints',
    ],
    junior: ['Practice coding aloud', 'Explain reasoning step-by-step'],
    mid: ['Trade-offs in storage vs. compute', 'Design for reliability and cost'],
    senior: ['Leadership signals', 'Cross-team communication and alignment'],
  },
  product: {
    base: [
      'Metrics: activation, retention, conversion',
      'Prioritization frameworks (RICE, ICE)',
      'Discovery: user segments and JTBD',
      'Roadmapping and stakeholder buy-in',
    ],
    junior: ['User empathy stories', 'Launch checklists'],
    mid: ['A/B test design pitfalls', 'KPI trees'],
    senior: ['Strategy narratives', 'Org alignment and influence'],
  },
  design: {
    base: [
      'Design systems and tokens',
      'Accessibility and contrast ratios',
      'User flows and edge cases',
      'Critique: rationale before preference',
    ],
    junior: ['Portfolio storytelling', 'Figma shortcuts to speed'],
    mid: ['Measuring UX impact', 'Handoff artifacts'],
    senior: ['Vision docs', 'Design ops and governance'],
  },
  data: {
    base: [
      'Experiment design and power',
      'SQL window functions',
      'Causal inference basics',
      'Metric invariants and guardrails',
    ],
    junior: ['Interpreting confidence intervals'],
    mid: ['Bias and variance trade-off'],
    senior: ['Communicating uncertainty to execs'],
  },
};

function deriveTopics(role, level) {
  const key = role?.toLowerCase() || '';
  let bucket = 'default';
  if (key.includes('engineer') || key.includes('developer') || key.includes('software')) bucket = 'engineer';
  else if (key.includes('product') || key === 'pm' || key.includes('manager')) bucket = 'product';
  else if (key.includes('design') || key.includes('ux') || key.includes('ui')) bucket = 'design';
  else if (key.includes('data') || key.includes('analyst') || key.includes('science')) bucket = 'data';

  const base = bucket === 'default' ? SUGGESTIONS.default : SUGGESTIONS[bucket].base;
  const seniority = level?.toLowerCase() || 'mid';
  const extra = bucket === 'default' ? [] : (SUGGESTIONS[bucket][seniority] || []);
  return [...base, ...extra].slice(0, 8);
}

export default function LiveDemo() {
  const [job, setJob] = React.useState('Senior Software Engineer');
  const [level, setLevel] = React.useState('Senior');
  const [stream, setStream] = React.useState([]);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [seed, setSeed] = React.useState(0);

  const startStream = (e) => {
    if (e) e.preventDefault();
    const topics = deriveTopics(job, level);
    setStream([]);
    setIsStreaming(true);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setStream((prev) => (prev.length < topics.length ? [...prev, topics[prev.length]] : prev));
      if (i >= topics.length) {
        clearInterval(id);
        setIsStreaming(false);
      }
    }, 300);
  };

  const regenerate = () => {
    setSeed((s) => s + 1);
    startStream();
  };

  React.useEffect(() => {
    // auto-run once on mount
    startStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="demo" className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">Try the realtime demo</h2>
        <p className="mt-3 text-neutral-300">Tell us your target role and level. The AI will suggest topics to focus on—streamed in realtime.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          onSubmit={startStream}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-medium text-neutral-300">Target role</label>
              <input
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="e.g., Frontend Engineer, Data Scientist"
                className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/30"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-neutral-300">Seniority</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-3 py-2.5 text-sm text-white outline-none ring-0 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/30"
              >
                <option>Junior</option>
                <option>Mid</option>
                <option>Senior</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isStreaming}
              className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-400/40 ${isStreaming ? 'bg-white/10 text-neutral-300' : 'bg-violet-500 text-white hover:bg-violet-400'}`}
            >
              <Zap className="h-4 w-4" />
              {isStreaming ? 'Generating…' : 'Generate suggestions'}
            </button>
            <button
              type="button"
              onClick={regenerate}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <RefreshCw className="h-4 w-4" />
              Generate again
            </button>
          </div>

          <p className="mt-4 text-xs text-neutral-400">This demo runs fully in-browser. No data is sent to a server.</p>
        </motion.form>

        <motion.div
          key={seed}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-amber-500/10 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Suggested focus areas</h3>
              <p className="text-sm text-neutral-300">Role: <span className="text-white/90">{job}</span> · Level: <span className="text-white/90">{level}</span></p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">Realtime</span>
          </div>

          <ul className="space-y-3">
            {stream.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="mt-0.5 h-2.5 w-2.5 flex-none rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                <div className="flex-1 text-sm text-neutral-100/90">{s}</div>
              </motion.li>
            ))}
          </ul>

          {stream.length === 0 && (
            <div className="py-8 text-center text-sm text-neutral-300">Your suggestions will stream here…</div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <a
              href="#get-started"
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
            >
              Start a free mock interview
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
