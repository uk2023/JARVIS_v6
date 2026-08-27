import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  FileCode,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PYTHON_CODEBASE } from '../data/pythonCodebase';
import { PythonCodeFile } from '../types';

export const PythonCodeHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<PythonCodeFile>(PYTHON_CODEBASE[0]);
  const [copied, setCopied] = useState(false);
  const [dumpDownloaded, setDumpDownloaded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullDump = () => {
    let fullDump = `# ==============================================================================
# JARVIS ORGANISM - FULL MASTER REPOSITORY DUMP
# Target: Android 8GB RAM (Termux / PRoot ARM64 Ready)
# Model: Qwen2.5-3B-Instruct (Q4_K_M GGUF) + Fast ONNX Embedder (all-MiniLM-L6-v2)
# Architecture: Non-blocking Async Background Learning + Typo Tolerance
# ==============================================================================
`;

    PYTHON_CODEBASE.forEach(file => {
      fullDump += `\n\n--- FILE: ${file.path} ---\n\n${file.code}`;
    });

    const blob = new Blob([fullDump], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project_dump.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDumpDownloaded(true);
    setTimeout(() => setDumpDownloaded(false), 3000);
  };

  return (
    <div id="python-code-hub-view" className="h-full overflow-y-auto p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
            <h2 className="text-sm sm:text-base font-bold text-cyan-50 tracking-widest uppercase font-mono">
              JARVIS PYTHON CORE CODEBASE & EXPORTER
            </h2>
          </div>
          <p className="text-xs text-white/50 font-mono">
            Full Production Codes with Async Background Learning, Fast ONNX Vector Store & Qwen 3B Bridge
          </p>
        </div>

        <button
          onClick={handleDownloadFullDump}
          className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition shadow-[0_0_15px_#22d3ee] shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{dumpDownloaded ? 'Dump Generated!' : 'Download project_dump.txt'}</span>
        </button>
      </div>

      {/* Android 8GB RAM & Termux Setup Card */}
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-5 font-mono text-xs text-white/80 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Android 8GB RAM Offline Model Recommendation & Fast Execution Parameters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="text-cyan-300 font-bold mb-1">1. Model Choice</div>
            <p className="text-white/60">
              <strong className="text-white">Qwen2.5-3B-Instruct (Q4_K_M)</strong> (~1.9 GB RAM). Highly accurate with Hinglish dialect, typos, and structured tool calling.
            </p>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="text-cyan-300 font-bold mb-1">2. Multi-Threading</div>
            <p className="text-white/60">
              Set <code className="text-cyan-200">n_threads=4</code>, <code className="text-cyan-200">OMP_NUM_THREADS=2</code>, and <code className="text-cyan-200">n_ctx=4096</code> to maximize CPU efficiency without thermal throttling.
            </p>
          </div>
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
            <div className="text-green-300 font-bold mb-1">3. Fast Setup</div>
            <p className="text-white/60">
              Run <code className="text-green-200">bash download.sh</code> to download ONNX MiniLM embedder (~45MB) and Qwen GGUF model in one step.
            </p>
          </div>
        </div>
      </div>

      {/* Code File Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        {/* Sidebar File List */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 space-y-1.5 font-mono text-xs shadow-xl">
          <div className="text-[10px] text-white/40 uppercase font-bold px-2 py-1 tracking-wider">
            Repository Files ({PYTHON_CODEBASE.length})
          </div>
          {PYTHON_CODEBASE.map(file => {
            const isSelected = selectedFile.filename === file.filename;
            return (
              <button
                key={file.filename}
                onClick={() => setSelectedFile(file)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition text-left cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
                  <span className="truncate">{file.filename}</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/40 text-white/40">
                  {file.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Code Editor Preview Window */}
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
          {/* File Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
            <div>
              <div className="text-white font-bold text-xs flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedFile.path}</span>
              </div>
              <p className="text-[10px] text-white/40 mt-0.5">{selectedFile.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-cyan-200 hover:text-white text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="Copy file content"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadFile}
                className="px-3 py-1.5 bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400/40 rounded-xl text-cyan-200 text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="p-4 overflow-x-auto max-h-[520px] overflow-y-auto bg-black/60 text-[#e0e0e0] font-mono text-xs leading-relaxed selection:bg-cyan-400/30">
            <pre>
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
