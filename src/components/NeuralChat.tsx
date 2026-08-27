import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Sparkles,
  Paperclip,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  GitFork,
  CheckCircle2,
  AlertTriangle,
  Clock,
  SpellCheck,
  Bot,
  User,
  Zap,
} from 'lucide-react';
import { ChatMessage, CognitiveTrace } from '../types';

interface NeuralChatProps {
  messages: ChatMessage[];
  isThinking: boolean;
  onSendMessage: (text: string) => void;
  onOpenCLI: () => void;
}

export const NeuralChat: React.FC<NeuralChatProps> = ({
  messages,
  isThinking,
  onSendMessage,
  onOpenCLI,
}) => {
  const [inputText, setInputText] = useState('');
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isThinking) return;

    onSendMessage(trimmed);
    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported by your current browser.');
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div id="neural-chat-container" className="flex flex-col h-full w-full relative">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-4 pb-36">
        {messages.map(msg => {
          const isJarvis = msg.sender === 'jarvis';
          const trace = msg.traceLog;
          const isTraceOpen = expandedTraceId === msg.id;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-3xl ${isJarvis ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs shadow-md ${
                  isJarvis
                    ? 'bg-white/10 border border-white/20 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'bg-white/5 border border-white/10 text-white/70'
                }`}
              >
                {isJarvis ? <Bot className="w-4 h-4 text-cyan-300" /> : <User className="w-4 h-4 text-white/80" />}
              </div>

              {/* Message Bubble Body */}
              <div className="flex flex-col gap-1.5 min-w-0 max-w-[88%] sm:max-w-[80%]">
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xl font-sans backdrop-blur-xl ${
                    isJarvis
                      ? 'bg-white/5 border border-white/10 text-[#e0e0e0]'
                      : 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-50 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Auto-extracted Fact Notification Badge */}
                  {msg.extractedFact && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] text-cyan-200 font-mono bg-cyan-400/10 p-2 rounded-xl border border-cyan-400/30">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>
                        Engram Re-consolidated: <strong className="text-cyan-300">{msg.extractedFact.subject}</strong> ➔{' '}
                        <em>{msg.extractedFact.predicate}</em> ➔ <u className="text-white">{msg.extractedFact.value}</u>
                      </span>
                    </div>
                  )}

                  {/* Speech Audio Button for Jarvis message */}
                  {isJarvis && (
                    <div className="mt-2 flex items-center justify-between text-[10px] text-white/40 pt-1.5 border-t border-white/10 font-mono">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:text-cyan-300 p-1 rounded-lg hover:bg-white/5 transition"
                        title="Play audio response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Cognitive Diagnostics Trace Accordion (Jarvis messages only) */}
                {isJarvis && trace && (
                  <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden font-mono text-[10px] shadow-lg">
                    <button
                      onClick={() => setExpandedTraceId(isTraceOpen ? null : msg.id)}
                      className="w-full flex items-center justify-between px-3.5 py-2 bg-white/5 hover:bg-white/10 text-cyan-300 transition"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-semibold uppercase tracking-wider">Cognitive Trace</span>
                        <span className="text-white/40">({trace.latencySeconds.toFixed(2)}s)</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/50">
                        {isTraceOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isTraceOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="p-3.5 space-y-2.5 border-t border-white/10 text-[#e0e0e0] bg-black/20"
                        >
                          {/* Timing metrics */}
                          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10 text-[9px] text-white/60">
                            <div className="flex items-center gap-1.5">
                              <Database className="w-3 h-3 text-cyan-400" />
                              <span>Memory FAISS: {trace.memoryLookupSeconds.toFixed(3)}s</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-green-400" />
                              <span>Qwen 3B: {trace.llmInferenceSeconds.toFixed(2)}s</span>
                            </div>
                          </div>

                          {/* Typo corrections */}
                          {trace.typosCorrected && trace.typosCorrected.length > 0 && (
                            <div className="text-[9px] text-yellow-300/90 flex items-center gap-1.5 bg-yellow-500/10 p-1.5 rounded-lg border border-yellow-500/20">
                              <SpellCheck className="w-3 h-3 text-yellow-400 shrink-0" />
                              <span>
                                Typo Normalized:{' '}
                                {trace.typosCorrected.map((t, idx) => (
                                  <span key={idx} className="underline decoration-dotted mr-1 font-semibold">
                                    "{t.raw}" ➔ "{t.corrected}"
                                  </span>
                                ))}
                              </span>
                            </div>
                          )}

                          {/* Vector Matches */}
                          <div>
                            <div className="text-cyan-300 font-bold mb-1 flex items-center gap-1">
                              <Database className="w-3 h-3 text-cyan-400" /> FAISS Vector Recall ({trace.vectorMatches.length} matches):
                            </div>
                            {trace.vectorMatches.length > 0 ? (
                              <ul className="space-y-1 pl-3 border-l border-cyan-400/30">
                                {trace.vectorMatches.map((m, i) => (
                                  <li key={i} className="text-white/80">
                                    <span className="text-cyan-200 font-semibold">{m.subject}</span> ➔{' '}
                                    <span className="text-white/50">{m.predicate}</span> ➔{' '}
                                    <span className="text-white">{String(m.value)}</span>{' '}
                                    <span className="text-green-400 text-[9px]">({(m.similarity * 100).toFixed(0)}%)</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-white/40 italic pl-3">0 direct vector matches</div>
                            )}
                          </div>

                          {/* Knowledge Graph Edges */}
                          <div>
                            <div className="text-cyan-300 font-bold mb-1 flex items-center gap-1">
                              <GitFork className="w-3 h-3 text-cyan-400" /> NetworkX Graph Relations ({trace.graphRelations.length}):
                            </div>
                            {trace.graphRelations.length > 0 ? (
                              <ul className="space-y-1 pl-3 border-l border-cyan-400/30">
                                {trace.graphRelations.map((g, i) => (
                                  <li key={i} className="text-white/80">
                                    ({g.subject}) ──[{g.predicate}]──&gt; ({g.target})
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="text-white/40 italic pl-3">No relational graph edges</div>
                            )}
                          </div>

                          {/* Async Learning Pipeline Validation */}
                          <div className="pt-1 flex items-center justify-between text-[9px] text-white/50">
                            <span className="flex items-center gap-1 text-green-400 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Background Pipeline Validated
                            </span>
                            <span className="text-white/40 font-mono">{trace.traceId}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Thinking Pulse Indicator */}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 max-w-md mr-auto"
          >
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
              <Bot className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-bounce shadow-[0_0_6px_#22d3ee]" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce shadow-[0_0_6px_#ffffff]" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-xs font-mono text-cyan-200 tracking-wider">
                JARVIS reasoning in cognitive state...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Frosted Input Dock */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-[#050508] via-[#050508]/95 to-transparent z-20">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end bg-white/5 backdrop-blur-2xl border border-white/10 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_25px_rgba(34,211,238,0.2)] rounded-2xl px-3 py-1.5 shadow-2xl transition">
            {/* Attachment Button */}
            <button
              type="button"
              className="w-8 h-8 shrink-0 flex items-center justify-center text-white/50 hover:text-cyan-300 rounded-lg hover:bg-white/5 transition mb-0.5"
              title="Attach memory file or context"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Speech to Text Mic */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg transition mb-0.5 ${
                isListening ? 'text-red-400 bg-red-500/20 animate-pulse' : 'text-white/50 hover:text-cyan-300 hover:bg-white/5'
              }`}
              title="Voice Speech Input (Hinglish Supported)"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Input Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={autoResizeTextarea}
              onKeyDown={handleKeyDown}
              placeholder="Ask JARVIS (Supports Hinglish & typos like 'mera ex ka nan devyana h')..."
              className="flex-1 bg-transparent border-none outline-none px-2.5 py-2 text-[#e0e0e0] placeholder-white/40 text-xs sm:text-[13px] font-sans resize-none max-h-32 min-h-[36px]"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isThinking}
              className="w-8 h-8 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center justify-center transition shadow-[0_0_12px_#22d3ee] shrink-0 mb-0.5 disabled:opacity-30 disabled:shadow-none"
              title="Send to JARVIS"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/40 px-2 mt-2 font-mono">
            <span>UK Workspace &bull; Async Non-blocking Pipeline</span>
            <button
              type="button"
              onClick={onOpenCLI}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Cpu className="w-2.5 h-2.5" /> Open Virtual CLI Trace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
