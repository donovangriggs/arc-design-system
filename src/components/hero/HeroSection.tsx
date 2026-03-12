import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github, Package, Layers } from 'lucide-react';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { CounterStat } from './CounterStat';
import './hero.css';

const STATS = [
  { value: '10', label: 'Components' },
  { value: '4', label: 'Frameworks' },
  { value: '90+', label: 'Design Tokens' },
  { value: '2', label: 'Theme Modes' },
] as const;

function scrollToExplorer() {
  document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
}


export function HeroSection() {
  return (
    <section className="hero-section relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background layers */}
      <div className="hero-bg-gradient absolute inset-0 bg-gradient-to-br from-purple-950/20 via-black to-teal-950/20" />
      <div className="hero-glow-purple absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="hero-glow-teal absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.15),transparent_50%)]" />

      {/* Floating orbs */}
      <div className="hero-orb-purple absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div
        className="hero-orb-teal absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '-3s' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-950/30 backdrop-blur-sm mb-8"
          >
            <Layers className="hero-badge-icon w-4 h-4 text-purple-400" />
            <span className="hero-badge-text text-sm text-purple-300">
              Cross-Framework Design System
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Arc Design System
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12"
          >
            One Design System. Four Frameworks. Zero Compromise.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
          >
            <button
              type="button"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2 hover:scale-105"
              onClick={scrollToExplorer}
            >
              Explore Components
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={import.meta.env.VITE_STORYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-teal-400" />
              Documentation
            </a>
            <a
              href={import.meta.env.VITE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary px-8 py-4 border border-purple-500/30 rounded-full font-semibold text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Github className="w-5 h-5 text-teal-400" />
              View Source
            </a>
          </motion.div>
        </div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-16"
        >
          <ArchitectureDiagram />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <CounterStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={1.2 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 text-center"
        >
          <div className="hero-status-bar inline-flex items-center gap-8 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hero-status-text text-sm text-zinc-400">Production Ready</span>
            </div>
            <div className="hero-status-divider w-px h-6 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-purple-400" />
              <span className="hero-status-text text-sm text-zinc-400">TypeScript Native</span>
            </div>
            <div className="hero-status-divider w-px h-6 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span className="hero-status-text text-sm text-zinc-400">Web Components</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
