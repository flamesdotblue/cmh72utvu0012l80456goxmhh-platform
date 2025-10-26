import React from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const LinkItem = ({ href, children }) => (
    <a
      href={href}
      className="relative text-sm text-neutral-200 transition hover:text-white"
      onClick={() => setOpen(false)}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        layoutId="nav-underline"
        className="absolute inset-x-0 -bottom-1 h-px origin-left bg-white/50"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </a>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${scrolled ? 'border-b border-white/10 bg-neutral-950/70 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="group inline-flex items-center gap-2">
          <div className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
            <Rocket className="h-4 w-4 text-violet-300" />
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_60%)] blur-sm opacity-0 transition group-hover:opacity-100" />
          </div>
          <span className="font-semibold tracking-tight">AuraHire</span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          <LinkItem href="#demo">Free demo</LinkItem>
          <LinkItem href="#features">Features</LinkItem>
          <a href="#get-started" className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400">Get started</a>
        </nav>

        <button
          aria-label="Open menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-300 hover:bg-white/5 sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-neutral-950/90 backdrop-blur-md sm:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
              <a href="#demo" className="rounded-md px-2 py-2 text-sm text-neutral-200 hover:bg-white/5" onClick={() => setOpen(false)}>Free demo</a>
              <a href="#features" className="rounded-md px-2 py-2 text-sm text-neutral-200 hover:bg-white/5" onClick={() => setOpen(false)}>Features</a>
              <a href="#get-started" className="rounded-md bg-violet-500 px-2 py-2 text-sm font-medium text-white hover:bg-violet-400" onClick={() => setOpen(false)}>Get started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
