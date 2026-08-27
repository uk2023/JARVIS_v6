import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Compass,
  Zap,
  CheckCircle2,
  Clock,
  Cpu,
  RefreshCw,
  GitPullRequest,
  ShieldCheck,
  Flame,
  Radio,
} from 'lucide-react';
import { CuriosityGoal, EvolutionProposal } from '../types';

interface AutonomyCuriosityProps {
  goals: CuriosityGoal[];
  proposals: EvolutionProposal[];
  onTriggerCuriosity: () => void;
}

export const AutonomyCuriosity: React.FC<AutonomyCuriosityProps> = ({
  goals,
  proposals,
  onTriggerCuriosity,
}) => {
  return (
    <div id="autonomy-curiosity-view" className="h-full overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
              <h2 className="text-sm sm:text-base font-bold text-cyan-50 tracking-widest uppercase font-mono">
                SUBCONSCIOUS CURIOSITY & EVOLUTION CHAMBER
              </h2>
            </div>
            <p className="text-xs text-white/50 font-mono">
              Autonomous Idle Loop, Safe Goal Decomposition & Controlled Self-Improvement Patches
            </p>
          </div>

          <button
            onClick={onTriggerCuriosity}
            className="px-4 py-2 bg-cyan-400/15 hover:bg-cyan-400/25 text-cyan-200 border border-cyan-400/40 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Trigger Idle Curiosity Cycle</span>
          </button>
        </div>
      </div>

      {/* Subconscious Goals Section */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-cyan-400" /> Active Curiosity & Learning Goals
          </h3>
          <span className="text-[10px] text-white/40 font-mono">
            {goals.filter(g => g.status === 'active').length} Active &bull;{' '}
            {goals.filter(g => g.status === 'completed').length} Completed
          </span>
        </div>

        <div className="space-y-3">
          {goals.map(goal => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 p-4 rounded-2xl font-mono text-xs space-y-2.5 shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-xs flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {goal.text}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                    goal.status === 'active'
                      ? 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30'
                      : 'bg-green-400/10 text-green-400 border-green-400/30'
                  }`}
                >
                  {goal.status}
                </span>
              </div>

              {/* Progress Milestones */}
              <div className="pl-3 border-l-2 border-cyan-400/30 space-y-1">
                {goal.progress.map((prog, idx) => (
                  <div key={idx} className="text-[11px] text-white/80 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                    <span>{prog}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/40 pt-1 border-t border-white/5">
                <span>Origin: {goal.origin.toUpperCase()}</span>
                <span>Priority: {(goal.priority * 100).toFixed(0)}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Evolution Proposals Section */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2 uppercase tracking-wider">
            <GitPullRequest className="w-4 h-4 text-cyan-400" /> Controlled Evolution & Runtime Patches
          </h3>
          <span className="text-[10px] text-white/40 font-mono">
            {proposals.length} Self-Improvement Probes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {proposals.map(evo => (
            <div
              key={evo.id}
              className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 p-4 rounded-2xl font-mono text-xs space-y-2 shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-bold text-xs capitalize">
                  {evo.target.replace(/_/g, ' ')}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-green-400/10 text-green-400 border border-green-400/30 text-[10px] font-bold">
                  {evo.status}
                </span>
              </div>

              <p className="text-white/80 text-[11px] leading-relaxed">{evo.reason}</p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                <span>Validation Score: {(evo.score * 100).toFixed(0)}%</span>
                <span className="text-green-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3 h-3" /> Structure Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
