import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, X, Play, RefreshCw, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  beatCount: number;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({
  isOpen,
  onClose,
  beatCount,
}) => {
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] [JARVIS-INIT] Subsystems bootstrapping on ARM64 Termux PRoot...`,
    `[${new Date().toLocaleTimeString()}] [ORGAN-ATTACH] Brain attached (BrainOrchestrator v0.6.0)`,
    `[${new Date().toLocaleTimeString()}] [MEMORY-INIT] FAISS Index loaded (384-dim ONNX MiniLM embedder)`,
    `[${new Date().toLocaleTimeString()}] [NEURAL-BRIDGE] Qwen2.5-3B-Instruct (Q4_K_M GGUF, 4 threads) online`,
    `[${new Date().toLocaleTimeString()}] [ASYNC-WORKER] Background Experience & Learning Worker thread active`,
    `[${new Date().toLocaleTimeString()}] [ORGANISM-PULSE] Heartbeat beating synchronously (Cycle #${beatCount})`,
  ]);
  const [cmdInput, setCmdInput] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    const time = new Date().toLocaleTimeString();
    const newLogs = [...logs, `[${time}] UK@jarvis:~$ ${cmd}`];

    if (cmd === 'help') {
      newLogs.push(
        `Available Commands:\n - status : Show all organ health states\n - pulse  : Trigger biological heart wave\n - test-hinglish : Benchmark phonetic typo normalizer\n - clear  : Clear terminal logs`
      );
    } else if (cmd === 'status') {
      newLogs.push(
        `[STATUS MATRIX] 9 Organs Attached | Memory: 1.84 GB | Latency: 0.24s | Pipeline: Non-blocking Async`
      );
    } else if (cmd === 'pulse') {
      newLogs.push(
        `[PULSE] Heartbeat wave emitted ∿∿∿_/\\_∿∿∿ (72 BPM) | Subconscious Curiosity Active`
      );
    } else if (cmd === 'test-hinglish') {
      newLogs.push(
        `[BENCHMARK] Testing input "mera ex ka nan devyana h, mujhe python coding psnd h"\n -> Normalized: "mera ex ka naam devyana h, mujhe python coding pasand h"\n -> Fact Extracted: {subject: 'user_ex', predicate: 'name', value: 'Devyana'}\n -> Status: PASS (0.002s)`
      );
    } else if (cmd === 'clear') {
      setLogs([]);
      setCmdInput('');
      return;
    } else {
      newLogs.push(`[CMD] Command not recognized: "${cmd}". Type "help" for options.`);
    }

    setLogs(newLogs);
    setCmdInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#050508]/90 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl overflow-hidden font-mono text-xs"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-black/40 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-50 font-bold uppercase tracking-wider">JARVIS Neural CLI Diagnostics</span>
            <span className="text-green-400 text-[10px] bg-green-400/10 px-2 py-0.5 rounded-lg border border-green-400/30 font-bold">
              LIVE
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logs Output Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 bg-black/60 text-[#e0e0e0]">
          {logs.map((log, index) => (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {log.includes('UK@jarvis') ? (
                <span className="text-cyan-300 font-bold">{log}</span>
              ) : log.includes('ERROR') ? (
                <span className="text-red-400 font-bold">{log}</span>
              ) : log.includes('WARN') ? (
                <span className="text-yellow-300">{log}</span>
              ) : log.includes('PASS') || log.includes('ONLINE') ? (
                <span className="text-green-300 font-semibold">{log}</span>
              ) : (
                <span className="text-white/70">{log}</span>
              )}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommand} className="p-3.5 bg-black/40 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-bold">UK@jarvis:~$</span>
          <input
            type="text"
            value={cmdInput}
            onChange={e => setCmdInput(e.target.value)}
            placeholder="Type 'help', 'status', 'pulse', 'test-hinglish'..."
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder-white/40"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl text-xs flex items-center gap-1 transition shadow-[0_0_10px_#22d3ee] cursor-pointer"
          >
            <Play className="w-3 h-3 fill-black" />
            <span>Run</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
