import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Cpu,
  Database,
  Brain as BrainIcon,
  Shield,
  Layers,
  Sparkles,
  GitBranch,
  Repeat,
  Heart,
  CheckCircle2,
  AlertCircle,
  Radio,
  Terminal,
} from 'lucide-react';
import { OrganStatusInfo } from '../types';

interface OrganMatrixProps {
  organs: OrganStatusInfo[];
  beatCount: number;
  bpm: number;
  onTriggerPulse: () => void;
}

export const OrganMatrix: React.FC<OrganMatrixProps> = ({
  organs,
  beatCount,
  bpm,
  onTriggerPulse,
}) => {
  const getIconForOrgan = (name: string) => {
    switch (name.toLowerCase()) {
      case 'brain':
        return <BrainIcon className="w-4 h-4 text-cyan-400" />;
      case 'memory':
        return <Database className="w-4 h-4 text-purple-400" />;
      case 'experience_engine':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'self_evaluator':
        return <Shield className="w-4 h-4 text-yellow-400" />;
      case 'knowledge_builder':
        return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 'memory_consolidator':
        return <Repeat className="w-4 h-4 text-blue-400" />;
      case 'learning_coordinator':
        return <GitBranch className="w-4 h-4 text-indigo-400" />;
      case 'evolution':
        return <Cpu className="w-4 h-4 text-red-400" />;
      case 'llm':
        return <Terminal className="w-4 h-4 text-cyan-300" />;
      default:
        return <Heart className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div id="organ-matrix-view" className="h-full overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
              <h2 className="text-sm sm:text-base font-bold text-cyan-50 tracking-widest uppercase font-mono">
                NEURAL SUBSYSTEMS & ORGAN MATRIX
              </h2>
            </div>
            <p className="text-xs text-white/50 font-mono">
              Real-time Subsystem Metrics & Diagnostics Control Unit &bull; UK Architecture
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-xs">
              <span className="text-white/40 text-[10px] uppercase">ORGANISM PULSE: </span>
              <span className="text-cyan-400 font-bold">{bpm} BPM</span>
              <span className="text-white/30 ml-2">#{beatCount}</span>
            </div>
            <button
              onClick={onTriggerPulse}
              className="px-3.5 py-1.5 bg-cyan-400/15 hover:bg-cyan-400/25 text-cyan-200 border border-cyan-400/40 rounded-xl text-xs font-semibold font-mono flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stimulate Pulse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subsystem Organs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {organs.map((organ, index) => (
          <motion.div
            key={organ.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 p-4 rounded-2xl shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {getIconForOrgan(organ.name)}
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-xs text-white capitalize">{organ.name.replace('_', ' ')}</h3>
                    <span className="text-[10px] text-white/40 font-mono">{organ.classType}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-lg bg-green-400/10 text-green-400 border border-green-400/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> ONLINE
                </span>
              </div>

              <p className="text-xs text-[#e0e0e0] leading-relaxed mb-3">{organ.role}</p>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <span className="text-white/40">Diagnostics:</span>
              <span className="text-cyan-300 font-semibold">{organ.metrics}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Biological Loop Flow Explainer Card */}
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 font-mono text-xs text-white/80 space-y-2 shadow-xl">
        <h4 className="text-cyan-300 font-bold flex items-center gap-2 uppercase tracking-wider">
          <GitBranch className="w-4 h-4 text-cyan-400" /> Real-time Execution Flow Pipeline
        </h4>
        <p className="text-[11px] text-white/50 leading-relaxed">
          <code className="text-cyan-200 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">USER INPUT</code> ➔ <code className="text-cyan-200 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Memory Vector Retrieval (FAISS + Graph)</code> ➔{' '}
          <code className="text-cyan-200 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Qwen 3B Single Inference Call</code> ➔ <code className="text-cyan-200 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Instant Response to User</code> ➔{' '}
          <code className="text-green-300 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">[Async Background Queue] ExperienceEngine ➔ SelfEvaluator ➔ KnowledgeBuilder ➔ Engram Store</code>
        </p>
      </div>
    </div>
  );
};
