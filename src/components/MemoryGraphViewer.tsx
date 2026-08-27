import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Database,
  Search,
  Plus,
  Trash2,
  GitFork,
  Sliders,
  Sparkles,
  ShieldCheck,
  Tag,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { EngramFact } from '../types';

interface MemoryGraphViewerProps {
  engrams: EngramFact[];
  onAddEngram: (fact: { subject: string; predicate: string; value: string; tags: string[] }) => void;
  onDeleteEngram: (id: string) => void;
}

export const MemoryGraphViewer: React.FC<MemoryGraphViewerProps> = ({
  engrams,
  onAddEngram,
  onDeleteEngram,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [similarityThreshold, setSimilarityThreshold] = useState(0.5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSub, setNewSub] = useState('');
  const [newPred, setNewPred] = useState('');
  const [newVal, setNewVal] = useState('');
  const [newTags, setNewTags] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Filter engrams based on query
  const filteredEngrams = engrams.filter(k => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      k.subject.toLowerCase().includes(q) ||
      k.predicate.toLowerCase().includes(q) ||
      String(k.value).toLowerCase().includes(q) ||
      k.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  // Extract unique subjects for graph nodes
  const distinctSubjects = Array.from(new Set(engrams.map(e => e.subject)));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.trim() || !newPred.trim() || !newVal.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    onAddEngram({
      subject: newSub.trim().toLowerCase(),
      predicate: newPred.trim().toLowerCase(),
      value: newVal.trim(),
      tags: tagsArray,
    });

    setNewSub('');
    setNewPred('');
    setNewVal('');
    setNewTags('');
    setShowAddModal(false);
  };

  return (
    <div id="memory-graph-view" className="h-full overflow-y-auto p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
            <h2 className="text-sm sm:text-base font-bold text-cyan-50 tracking-widest uppercase font-mono">
              SEMANTIC MEMORY & FAISS VECTOR STORE
            </h2>
          </div>
          <p className="text-xs text-white/50 font-mono">
            384-dimensional ONNX Embedding Index & NetworkX Directed Knowledge Graph
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-xl font-mono text-xs text-cyan-200">
            <span className="text-white/40">ACTIVE ENGRAMS: </span>
            <span className="font-bold text-cyan-300">{engrams.length}</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-cyan-400/15 hover:bg-cyan-400/25 text-cyan-200 border border-cyan-400/40 rounded-xl text-xs font-semibold font-mono flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(34,211,238,0.2)] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Triple</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Relational Node Map */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-2 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-cyan-400" /> Relational Knowledge Graph Nodes
          </h3>
          <span className="text-[10px] text-white/40 font-mono">
            {distinctSubjects.length} Root Subjects &bull; {engrams.length} Edges
          </span>
        </div>

        {/* Subject Chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition border cursor-pointer ${
              selectedSubject === null
                ? 'bg-cyan-400/20 text-cyan-200 border-cyan-400/50 font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                : 'bg-black/30 text-white/50 border-white/10 hover:text-white hover:bg-white/5'
            }`}
          >
            All Subjects ({engrams.length})
          </button>
          {distinctSubjects.map(sub => {
            const count = engrams.filter(e => e.subject === sub).length;
            const isSelected = selectedSubject === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubject(isSelected ? null : sub)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition border flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-400/20 text-cyan-200 border-cyan-400/50 font-bold shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                    : 'bg-black/30 text-white/50 border-white/10 hover:text-white hover:bg-white/5'
                }`}
              >
                <GitFork className="w-3 h-3 text-cyan-400" />
                <span>{sub}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Node Chain Visualizer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {engrams
            .filter(e => (selectedSubject ? e.subject === selectedSubject : true))
            .map(e => (
              <div
                key={e.id}
                className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 p-3.5 rounded-2xl text-xs font-mono space-y-2 shadow-xl transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold text-xs">({e.subject})</span>
                  <span className="text-white/40 text-[10px]">FAISS #{e.faissId}</span>
                </div>

                <div className="pl-3 border-l-2 border-cyan-400/40 text-white/80 space-y-1">
                  <div className="text-cyan-200 font-semibold text-[11px]">
                    ──[ <span className="underline decoration-cyan-400/50">{e.predicate}</span> ]──&gt;
                  </div>
                  <div className="text-white text-xs bg-cyan-400/10 p-2.5 rounded-xl border border-cyan-400/20 break-words">
                    {String(e.value)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/40 pt-1 border-t border-white/5">
                  <span>Confidence: {(e.confidence * 100).toFixed(0)}%</span>
                  <span>Evidences: {e.evidenceCount}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* FAISS Vector Search Playground */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Hybrid Search & Cosine Threshold Sandbox</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 font-mono text-xs text-white/50">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Threshold: {similarityThreshold}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.95"
              step="0.05"
              value={similarityThreshold}
              onChange={e => setSimilarityThreshold(parseFloat(e.target.value))}
              className="accent-cyan-400 w-28 cursor-pointer"
            />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Type query to test vector recall (e.g. 'earphone mic', 'ex partner', 'model name')..."
            className="w-full bg-black/40 backdrop-blur-xl border border-white/10 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 font-mono outline-none shadow-inner transition"
          />
        </div>

        {/* Engrams Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Predicate</th>
                <th className="py-2.5 px-3">Value / Target</th>
                <th className="py-2.5 px-3 text-center">Confidence</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEngrams.map(item => (
                <tr key={item.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-3 text-cyan-300 font-bold">{item.subject}</td>
                  <td className="py-3 px-3 text-cyan-100">{item.predicate}</td>
                  <td className="py-3 px-3 text-white max-w-xs truncate">{String(item.value)}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-lg bg-green-400/10 text-green-400 border border-green-400/30 text-[10px]">
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onDeleteEngram(item.id)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                      title="Forget engram"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Engram Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#050508]/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4"
          >
            <h3 className="text-sm font-bold text-cyan-50 font-mono flex items-center gap-2 uppercase tracking-wider">
              <Plus className="w-4 h-4 text-cyan-400" /> Add Semantic Memory Triple
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-white/50 text-[10px] block mb-1">Subject Node (e.g. 'user', 'project')</label>
                <input
                  type="text"
                  required
                  value={newSub}
                  onChange={e => setNewSub(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/50 text-[10px] block mb-1">Predicate Relation (e.g. 'favorite_tool')</label>
                <input
                  type="text"
                  required
                  value={newPred}
                  onChange={e => setNewPred(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/50 text-[10px] block mb-1">Value / Fact (e.g. 'VS Code & MT Manager')</label>
                <textarea
                  rows={2}
                  required
                  value={newVal}
                  onChange={e => setNewVal(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="text-white/50 text-[10px] block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="editor, tools, coding"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-white/60 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl transition shadow-[0_0_10px_#22d3ee] cursor-pointer"
                >
                  Save Engram
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
