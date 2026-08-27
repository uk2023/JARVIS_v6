import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Activity,
  Cpu,
  Database,
  Compass,
  Code,
  Terminal,
  Plus,
  Trash2,
  Pin,
  Menu,
  X,
  Volume2,
  Radio,
  Sparkles,
  Zap,
  Bot,
} from 'lucide-react';
import { OrganismCore } from './components/OrganismCore';
import { NeuralChat } from './components/NeuralChat';
import { OrganMatrix } from './components/OrganMatrix';
import { MemoryGraphViewer } from './components/MemoryGraphViewer';
import { AutonomyCuriosity } from './components/AutonomyCuriosity';
import { PythonCodeHub } from './components/PythonCodeHub';
import { DiagnosticsModal } from './components/DiagnosticsModal';
import {
  ActiveTab,
  ChatMessage,
  EngramFact,
  OrganismTelemetry,
  SessionItem,
  CuriosityGoal,
  EvolutionProposal,
} from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCLIModalOpen, setIsCLIModalOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Organism Telemetry State
  const [telemetry, setTelemetry] = useState<OrganismTelemetry>({
    pulseState: 'Synchronous Processing',
    beatCount: 42,
    bpm: 72,
    pulseWave: '∿∿∿_/\\_∿∿∿',
    runtimeSeconds: 3600,
    isIdle: false,
    activeModel: 'Qwen2.5-3B-Instruct (Q4_K_M Offline)',
    ramUsageMB: 1840,
    totalTokensProcessed: 28450,
    avgLatencyMs: 240,
    organs: [
      { name: 'brain', classType: 'BrainOrchestrator', isAttached: true, role: 'Central Context Orchestrator & Cognitive Pipeline', metrics: 'Async Queue Active', health: 'green' },
      { name: 'memory', classType: 'MemoryManager', isAttached: true, role: 'FAISS Vector Index (384d) + NetworkX Graph', metrics: '6 engrams active', health: 'green' },
      { name: 'experience_engine', classType: 'ExperienceEngine', isAttached: true, role: 'Episodic Frame Ingestion & Trajectory Structuring', metrics: '0.001s Ingestion', health: 'green' },
      { name: 'self_evaluator', classType: 'SelfEvaluator', isAttached: true, role: 'Multi-metric Confidence & Quality Scoring', metrics: 'Avg Score: 0.94', health: 'green' },
      { name: 'knowledge_builder', classType: 'KnowledgeBuilder', isAttached: true, role: 'Semantic Triple Candidate Extractor', metrics: 'Auto-Accept: ON', health: 'green' },
      { name: 'memory_consolidator', classType: 'MemoryConsolidator', isAttached: true, role: 'Subconscious Episode Compression Engine', metrics: 'Background Idle Sync', health: 'green' },
      { name: 'learning_coordinator', classType: 'LearningCoordinator', isAttached: true, role: 'Inter-Organ Router & Pipeline Controller', metrics: 'Async Thread: LIVE', health: 'green' },
      { name: 'evolution', classType: 'EvolutionEngine', isAttached: true, role: 'Self-Improvement & Code Base Runtime Patching', metrics: '2 Applied Patches', health: 'green' },
      { name: 'llm', classType: 'HybridLLMBridge', isAttached: true, role: 'Qwen 2.5 3B LlamaCpp / Gemini Bridge', metrics: '4 Threads (ARM64)', health: 'green' },
      { name: 'heartbeat_daemon', classType: 'Heartbeat', isAttached: true, role: 'Biological Pulse & Idle Curiosity Drive', metrics: 'Beat Pulses: 42', health: 'green' }
    ],
  });

  // Sessions & Messages
  const [sessions, setSessions] = useState<SessionItem[]>([
    {
      sessionId: 'main_session',
      title: 'Primary Neural Link',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      msgCount: 1,
      pinned: true,
      category: 'Today',
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState('main_session');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sessionId: 'main_session',
      sender: 'jarvis',
      text: 'Good day, UK. Core neural subsystems are online. FAISS vector index loaded with 6 engrams, 4-thread Qwen 3B bridge calibrated for Android 8GB RAM. How may I assist you today, boss?',
      timestamp: new Date().toLocaleTimeString(),
      source: 'web',
      traceLog: {
        traceId: 'TRC-BOOT',
        latencySeconds: 0.12,
        memoryLookupSeconds: 0.002,
        llmInferenceSeconds: 0.118,
        vectorMatches: [
          { id: 'k-1', subject: 'user', predicate: 'creator_identity', value: 'UK', similarity: 0.99 },
          { id: 'k-5', subject: 'project', predicate: 'runtime_environment', value: 'Termux PRoot ARM64', similarity: 0.94 },
        ],
        graphRelations: [
          { subject: 'user', predicate: 'creator_identity', target: 'UK' },
          { subject: 'jarvis', predicate: 'neural_bridge_model', target: 'Qwen2.5-3B-Instruct' },
        ],
        learningPipelineStatus: 'validated',
      },
    },
  ]);

  // Engrams
  const [engrams, setEngrams] = useState<EngramFact[]>([]);

  // Curiosity & Evolution
  const [goals, setGoals] = useState<CuriosityGoal[]>([]);
  const [proposals, setProposals] = useState<EvolutionProposal[]>([]);

  // Periodic heartbeat telemetry polling
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/organism/state');
        if (res.ok) {
          const data = await res.json();
          setTelemetry(data);
        }
      } catch {
        // Fallback local heartbeat tick
        setTelemetry(prev => ({
          ...prev,
          beatCount: prev.beatCount + 1,
          bpm: 72 + Math.floor(Math.sin(Date.now() / 5000) * 8),
        }));
      }
    };

    const fetchEngrams = async () => {
      try {
        const res = await fetch('/api/memory/engrams');
        if (res.ok) {
          const data = await res.json();
          setEngrams(data.engrams || []);
        }
      } catch {}
    };

    const fetchAutonomy = async () => {
      try {
        const res = await fetch('/api/autonomy/state');
        if (res.ok) {
          const data = await res.json();
          setGoals(data.goals || []);
          setProposals(data.proposals || []);
        }
      } catch {}
    };

    fetchTelemetry();
    fetchEngrams();
    fetchAutonomy();

    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  // Send Message Handler
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sessionId: activeSessionId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString(),
      source: 'web',
    };

    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: activeSessionId }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, data.jarvisMessage]);

        // Refresh engrams if fact was extracted
        if (data.jarvisMessage.extractedFact) {
          const memRes = await fetch('/api/memory/engrams');
          if (memRes.ok) {
            const memData = await memRes.json();
            setEngrams(memData.engrams || []);
          }
        }
      } else {
        throw new Error('API request failed');
      }
    } catch {
      // Offline fallback
      setTimeout(() => {
        const fallbackMsg: ChatMessage = {
          id: `msg-${Date.now()}-j`,
          sessionId: activeSessionId,
          sender: 'jarvis',
          text: `Sir, running in offline Qwen 3B cognitive mode. Subsystems operational.`,
          timestamp: new Date().toLocaleTimeString(),
          source: 'web',
        };
        setMessages(prev => [...prev, fallbackMsg]);
      }, 500);
    } finally {
      setIsThinking(false);
    }
  };

  // Add Engram Handler
  const handleAddEngram = async (fact: { subject: string; predicate: string; value: string; tags: string[] }) => {
    try {
      const res = await fetch('/api/memory/engrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fact),
      });
      if (res.ok) {
        const data = await res.json();
        setEngrams(prev => [...prev, data.engram]);
      }
    } catch {}
  };

  // Delete Engram Handler
  const handleDeleteEngram = async (id: string) => {
    try {
      await fetch(`/api/memory/engrams/${id}`, { method: 'DELETE' });
      setEngrams(prev => prev.filter(e => e.id !== id));
    } catch {}
  };

  // Trigger Curiosity
  const handleTriggerCuriosity = async () => {
    try {
      const res = await fetch('/api/autonomy/trigger-idle', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setGoals(prev => [data.goal, ...prev]);
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      }
    } catch {}
  };

  // Stimulate Pulse
  const handleStimulatePulse = () => {
    setTelemetry(prev => ({
      ...prev,
      beatCount: prev.beatCount + 1,
      bpm: 88,
    }));
    confetti({ particleCount: 20, spread: 45, origin: { y: 0.6 } });
  };

  // Create New Session
  const handleNewSession = async () => {
    try {
      const res = await fetch('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      if (res.ok) {
        const data = await res.json();
        setSessions(prev => [data.session, ...prev]);
        setActiveSessionId(data.session.sessionId);
        setMessages([
          {
            id: `msg-${Date.now()}`,
            sessionId: data.session.sessionId,
            sender: 'jarvis',
            text: 'Neural thread initialized. Ready for your command, UK.',
            timestamp: new Date().toLocaleTimeString(),
            source: 'web',
          },
        ]);
        setActiveTab('chat');
        setIsSidebarOpen(false);
      }
    } catch {}
  };

  return (
    <div className="flex h-screen w-screen bg-[#050508] text-[#e0e0e0] font-sans overflow-hidden antialiased select-none relative">
      {/* Background Dot Grid Layer */}
      <div className="absolute inset-0 bg-grid-dots opacity-20 pointer-events-none z-0" />

      {/* Sidebar Drawer for Sessions */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/40 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center font-bold text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              J
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
                <h1 className="font-bold text-xs text-cyan-50 tracking-widest font-mono">JARVIS OS</h1>
              </div>
              <span className="text-[9px] text-cyan-400/60 font-mono tracking-tighter uppercase">v2026.4 Android 8GB</span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="sm:hidden text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={handleNewSession}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 hover:border-cyan-400/40 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm backdrop-blur-xl"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>New Neural Thread</span>
          </button>
        </div>

        {/* Session List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1.5 font-mono text-xs">
          <div className="text-[10px] text-white/40 font-bold uppercase px-2 py-1 tracking-widest">
            Active Threads
          </div>
          {sessions.map(s => {
            const isActive = s.sessionId === activeSessionId;
            return (
              <div
                key={s.sessionId}
                onClick={() => {
                  setActiveSessionId(s.sessionId);
                  setIsSidebarOpen(false);
                }}
                className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-all group ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-200 border-l-2 border-cyan-400 border-y border-r border-white/10 font-medium shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Bot className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{s.title}</span>
                </div>
                {s.pinned && <Pin className="w-2.5 h-2.5 text-cyan-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Subconscious Biological Heartbeat Widget in Sidebar */}
        <div className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-xl font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-white/50 mb-1 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]"></div>
              Pulse Wave
            </span>
            <span className="text-cyan-400 font-bold">{telemetry.bpm} BPM</span>
          </div>
          <div className="text-[11px] text-cyan-300 tracking-wider bg-white/5 p-2 rounded-xl border border-white/10 text-center font-mono backdrop-blur-md">
            {telemetry.pulseWave}
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="sm:hidden text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Tab Switcher */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl border border-white/10 p-1 rounded-2xl font-mono text-xs">
              <button
                id="tab-neural-core"
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'chat'
                    ? 'bg-cyan-400/15 text-cyan-200 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Neural Core
              </button>

              <button
                id="tab-organ-matrix"
                onClick={() => setActiveTab('matrix')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'matrix'
                    ? 'bg-cyan-400/15 text-cyan-200 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Organ Matrix
              </button>

              <button
                id="tab-memory-graph"
                onClick={() => setActiveTab('memory')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'memory'
                    ? 'bg-cyan-400/15 text-cyan-200 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                FAISS Memory
              </button>

              <button
                id="tab-autonomy-curiosity"
                onClick={() => setActiveTab('autonomy')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'autonomy'
                    ? 'bg-cyan-400/15 text-cyan-200 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Curiosity
              </button>

              <button
                id="tab-python-hub"
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === 'code'
                    ? 'bg-cyan-400/15 text-cyan-200 font-bold border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Python Hub
              </button>
            </div>
          </div>

          {/* Right Controls (Telemetry & CLI Terminal) */}
          <div className="flex items-center gap-4 font-mono">
            <div className="hidden lg:flex items-center gap-4 text-[10px] tracking-tighter uppercase text-white/50">
              <div>LATENCY: <span className="text-cyan-400 font-semibold">{telemetry.avgLatencyMs}ms</span></div>
              <div>RAM: <span className="text-cyan-400 font-semibold">1.8GB / 8GB</span></div>
              <div>STATE: <span className="text-green-400 font-semibold">OFFLINE_ACTIVE</span></div>
            </div>

            <button
              onClick={() => setIsCLIModalOpen(true)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 rounded-xl text-cyan-300 text-xs flex items-center gap-1.5 transition shadow-sm backdrop-blur-xl"
              title="Open Virtual CLI Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">CLI Trace</span>
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <main className="flex-1 overflow-hidden relative">
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full overflow-hidden">
              {messages.length <= 1 ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto flex items-center justify-center p-4">
                    <OrganismCore
                      telemetry={telemetry}
                      onOpenCLI={() => setIsCLIModalOpen(true)}
                      onQuickPrompt={handleSendMessage}
                    />
                  </div>
                  <NeuralChat
                    messages={messages}
                    isThinking={isThinking}
                    onSendMessage={handleSendMessage}
                    onOpenCLI={() => setIsCLIModalOpen(true)}
                  />
                </div>
              ) : (
                <NeuralChat
                  messages={messages}
                  isThinking={isThinking}
                  onSendMessage={handleSendMessage}
                  onOpenCLI={() => setIsCLIModalOpen(true)}
                />
              )}
            </div>
          )}

          {activeTab === 'matrix' && (
            <OrganMatrix
              organs={telemetry.organs}
              beatCount={telemetry.beatCount}
              bpm={telemetry.bpm}
              onTriggerPulse={handleStimulatePulse}
            />
          )}

          {activeTab === 'memory' && (
            <MemoryGraphViewer
              engrams={engrams}
              onAddEngram={handleAddEngram}
              onDeleteEngram={handleDeleteEngram}
            />
          )}

          {activeTab === 'autonomy' && (
            <AutonomyCuriosity
              goals={goals}
              proposals={proposals}
              onTriggerCuriosity={handleTriggerCuriosity}
            />
          )}

          {activeTab === 'code' && <PythonCodeHub />}
        </main>

        {/* Status bar footer */}
        <footer className="h-9 border-t border-white/10 bg-black/40 backdrop-blur-md px-6 flex items-center justify-between text-[9px] font-mono text-white/40 shrink-0">
          <div>ANDROID_ENV: ARM64_TERMUx | 8GB_INSTALLED | SNAPDRAGON_QWEN_OPTIMIZED</div>
          <div>JARVIS_ORGANISM_SOUL // LATENCY_OPTIMIZED</div>
        </footer>
      </div>

      {/* Live CLI Terminal Diagnostics Modal */}
      <DiagnosticsModal
        isOpen={isCLIModalOpen}
        onClose={() => setIsCLIModalOpen(false)}
        beatCount={telemetry.beatCount}
      />
    </div>
  );
}

export default App;
