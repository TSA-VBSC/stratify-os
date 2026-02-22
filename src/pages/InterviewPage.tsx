import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Mic, MicOff, Loader2, RotateCcw, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatCompletion } from "@/lib/openai";
import ApiKeyModal, { useApiKey } from "@/components/ApiKeyModal";
import { Key } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const roles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "AI Engineer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Cloud Architect",
];

export default function InterviewPage() {
  const { apiKey, setApiKey } = useApiKey();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const systemPrompt = `You are a senior technical interviewer conducting a mock interview for a ${selectedRole} role at a top tech company. 

Rules:
- Ask one interview question at a time
- Mix behavioral and technical questions
- After the candidate answers, give brief constructive feedback (2-3 sentences) with a score out of 10, then ask the next question
- Start with an introduction and your first question
- After 5 questions, provide a comprehensive summary with overall score, strengths, and areas to improve
- Be encouraging but honest
- Format your responses with markdown for readability`;

  const startInterview = async () => {
    if (!apiKey || !selectedRole) return;
    setStarted(true);
    setLoading(true);
    setQuestionCount(1);

    try {
      const reply = await chatCompletion(apiKey, [{ role: "user", content: `I'm ready for my ${selectedRole} mock interview.` }], systemPrompt);
      setMessages([{ role: "assistant", content: reply }]);
    } catch (err: any) {
      setMessages([{ role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    if (!input.trim() || !apiKey) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    setQuestionCount((c) => c + 1);

    try {
      const reply = await chatCompletion(apiKey, newMsgs, systemPrompt);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setMessages([...newMsgs, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const resetInterview = () => {
    setStarted(false);
    setMessages([]);
    setQuestionCount(0);
    setSelectedRole("");
  };

  const toggleMic = () => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR(); r.continuous = false; r.interimResults = false;
    r.onresult = (e: any) => { setInput(e.results[0][0].transcript); setListening(false); };
    r.onerror = () => setListening(false); r.onend = () => setListening(false);
    recognitionRef.current = r; r.start(); setListening(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gradient">AI Interview Simulator</h1>
          <p className="text-muted-foreground text-sm">Practice with an AI interviewer and get real-time feedback.</p>
        </div>
        <button onClick={() => setShowKeyModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
          <Key size={14} />
          {apiKey ? "Update Key" : "Set Key"}
        </button>
      </div>

      {/* Role Selection */}
      {!started && (
        <div className="glass-surface p-8 space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-semibold text-lg">Select a Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  selectedRole === role
                    ? "bg-primary/20 border-primary text-primary glow-accent"
                    : "border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <button
            onClick={startInterview}
            disabled={!selectedRole || !apiKey}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50"
          >
            <MessageSquare size={16} className="inline mr-2" />
            Start Interview
          </button>
          {!apiKey && <p className="text-xs text-destructive">Set your OpenAI API key first.</p>}
        </div>
      )}

      {/* Interview Chat */}
      {started && (
        <div className="glass-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{selectedRole}</span>
              <span className="text-xs text-muted-foreground">Question {questionCount}/5</span>
            </div>
            <button onClick={resetInterview} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <Bot size={14} className="text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-muted text-foreground rounded-br-md"
                    : "bg-primary/10 border border-primary/15 rounded-bl-md"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Bot size={14} className="text-primary" />
                </div>
                <div className="bg-primary/10 border border-primary/15 rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="animate-spin text-primary" size={16} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <button onClick={toggleMic} className={`p-3 rounded-full border transition-all duration-300 ${listening ? "bg-primary/20 border-primary text-primary animate-glow-pulse" : "border-glass-border text-muted-foreground hover:text-foreground"}`}>
              {listening ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendAnswer()}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={sendAnswer} disabled={loading || !input.trim()} className="p-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground glow-btn disabled:opacity-50">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <ApiKeyModal open={showKeyModal} onClose={() => setShowKeyModal(false)} onSave={setApiKey} />
    </div>
  );
}
