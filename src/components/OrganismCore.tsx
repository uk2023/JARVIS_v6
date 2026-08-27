import React from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, Zap, Radio, Shield, Sparkles } from 'lucide-react';
import { OrganismTelemetry } from '../types';

interface OrganismCoreProps {
  telemetry: OrganismTelemetry;
  onOpenCLI: () => void;
  onQuickPrompt: (prompt: string) => void;
}

export const OrganismCore: React.FC<OrganismCoreProps> = ({
  telemetry,
  onOpenCLI,
  onQuickPrompt,
}) => {
  return (
    <div id="organism-core-container" className="flex flex-col items-center justify-center my-auto py-6 text-center w-full max-w-2xl mx-auto px-4 relative">
      {/* Holographic Frosted Event Horizon Chamber */}
      <div className="relative w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 mb-6 shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-cyber-lines opacity-20 pointer-events-none" />

        {/* Outer Pulsating Rings */}
        <div id="black-hole-visualizer" className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-2">
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan-400/20"
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-cyan-400/40"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Frosted Accretion Glow */}
          <motion.div
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cyan-400/10 border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center backdrop-blur-md"
            animate={{
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/80 border border-cyan-400/80 flex items-center justify-center text-cyan-300 font-bold font-mono text-lg shadow-[0_0_20px_#22d3ee]">
              J
            </div>
          </motion.div>

          {/* Rotating Photon Point */}
          <motion.div
            className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] -top-1 left-1/2 -translate-x-1/2 absolute" />
          </motion.div>
        </div>

        {/* Pulse Telemetry Badge */}
        <div className="mt-4 bg-white/5 border border-white/10 backdrop-blur-xl px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300 flex items-center gap-2 shadow-md">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="uppercase tracking-wider font-bold">PULSE ACTIVE &bull; {telemetry.bpm} BPM</span>
        </div>
      </div>

      {/* Main Salutation */}
      <h2 className="text-sm sm:text-base font-bold text-cyan-50 tracking-wider uppercase mb-1.5 flex items-center justify-center gap-2">
        <span>UK, How can I assist you today?</span>
        <Sparkles className="w-4 h-4 text-cyan-400" />
      </h2>
      <p className="text-[11px] sm:text-xs text-white/50 max-w-md mb-6 font-mono">
        Quantum cognitive organism active. Offline Qwen 3B bridge calibrated for Android 8GB RAM with async background learning.
      </p>

      {/* Real-time Frosted Status Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-[10px] font-mono">
        <span className="px-3 py-1 rounded-xl bg-white/5 backdrop-blur-xl text-cyan-200 border border-white/10 flex items-center gap-1.5 shadow-sm">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>ASYNC LEARNING: ACTIVE</span>
        </span>
        <span className="px-3 py-1 rounded-xl bg-white/5 backdrop-blur-xl text-white/80 border border-white/10 flex items-center gap-1.5 shadow-sm">
          <Cpu className="w-3 h-3 text-cyan-400" />
          <span>ARM64 PROOT 8GB</span>
        </span>
        <span className="px-3 py-1 rounded-xl bg-white/5 backdrop-blur-xl text-green-300 border border-white/10 flex items-center gap-1.5 shadow-sm">
          <Shield className="w-3 h-3 text-green-400" />
          <span>TYPO-TOLERANT ENGRAMS</span>
        </span>
      </div>

      {/* Quick Interactive Prompt Frosted Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
        <button
          id="btn-quick-status"
          onClick={() => onQuickPrompt('Status check of all active subsystems and memory engrams')}
          className="p-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl text-left transition shadow-md group cursor-pointer"
        >
          <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-2 mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Organ Matrix</span>
          </div>
          <p className="text-[10px] text-white/40 line-clamp-1 font-mono">Check health of 9 attached organs</p>
        </button>

        <button
          id="btn-quick-memory"
          onClick={() => onQuickPrompt('What are my hardware setup and personal memory facts?')}
          className="p-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl text-left transition shadow-md group cursor-pointer"
        >
          <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>FAISS Store</span>
          </div>
          <p className="text-[10px] text-white/40 line-clamp-1 font-mono">Recall mic, DAC & relationship triples</p>
        </button>

        <button
          id="btn-quick-trace"
          onClick={() => onQuickPrompt('Run diagnostic trace on typo-tolerant Hinglish pipeline')}
          className="p-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl text-left transition shadow-md group cursor-pointer"
        >
          <div className="text-[11px] text-cyan-300 font-semibold flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Neural Bridge</span>
          </div>
          <p className="text-[10px] text-white/40 line-clamp-1 font-mono">Test phonetic normalizer & latency</p>
        </button>
      </div>
    </div>
  );
};
