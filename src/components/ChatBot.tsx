import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import { chatCompletion } from "@/lib/openai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  onResumeGenerated?: (text: string) => void;
  systemMessage?: string;
}

export default function ChatBot({ onResumeGenerated, systemMessage }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const defaultSystem = "You are a professional resume writer. Return a structured resume with sections: Summary, Experience, Education, Skills.";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const reply = await chatCompletion(newMsgs, systemMessage || defaultSystem);
      const assistantMsg: Message = { role: "assistant", content: reply };
      setMessages([...newMsgs, assistantMsg]);
      if (onResumeGenerated) onResumeGenerated(reply);
    } catch (err: any) {
      setMessages([...newMsgs, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className="glass-surface p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gradient">AI Resume Chatbot</h3>

      {/* Chat window */}
      <div className="h-72 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Start a conversation to generate your resume...
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-muted text-foreground rounded-br-md"
                  : "bg-primary/15 text-primary border border-primary/20 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-primary/15 border border-primary/20 rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2 className="animate-spin text-primary" size={16} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full border transition-all duration-300 ${
            listening
              ? "bg-primary/20 border-primary text-primary animate-glow-pulse"
              : "border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/30"
          }`}
        >
          {listening ? <Mic size={18} /> : <MicOff size={18} />}
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your resume..."
          className="flex-1 px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="p-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
