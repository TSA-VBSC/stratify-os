import { useState, useEffect } from "react";
import { Upload, FileText, Sparkles, Key } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import ApiKeyModal, { useApiKey } from "@/components/ApiKeyModal";

export default function ResumePage() {
  const { apiKey, setApiKey } = useApiKey();
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [resumeText, setResumeText] = useState(() => localStorage.getItem("user_resume_preview") || "");
  const [fileName, setFileName] = useState(() => localStorage.getItem("user_resume_name") || "");
  const [matches, setMatches] = useState<{ title: string; score: number }[]>([]);

  useEffect(() => {
    localStorage.setItem("user_resume_preview", resumeText);
  }, [resumeText]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    localStorage.setItem("user_resume_name", file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const analyzeResume = () => {
    setMatches([
      { title: "AI Engineer", score: 94 },
      { title: "Data Scientist", score: 87 },
      { title: "ML Operations Engineer", score: 82 },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gradient">Resume Intelligence</h1>
        <button
          onClick={() => setShowKeyModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-glass-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
        >
          <Key size={14} />
          {apiKey ? "Update API Key" : "Set API Key"}
        </button>
      </div>

      {/* Upload */}
      <div className="glass-surface p-6">
        <label className="flex items-center gap-4 cursor-pointer group">
          <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <Upload size={24} />
          </div>
          <div>
            <p className="font-medium">Upload Resume</p>
            <p className="text-sm text-muted-foreground">{fileName || "Accept .pdf or .txt files"}</p>
          </div>
          <input type="file" accept=".pdf,.txt" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Editor */}
      <div className="glass-surface p-6 space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="text-primary" size={18} />
          <h2 className="font-semibold">Resume Editor</h2>
        </div>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste or type your resume here..."
          rows={12}
          className="w-full bg-muted/30 border border-glass-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed"
        />
      </div>

      {/* Analyze */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <button
          onClick={analyzeResume}
          disabled={!resumeText.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50"
        >
          <Sparkles size={18} />
          Analyze Resume
        </button>

        {matches.length > 0 && (
          <div className="glass-surface p-4 flex-1 space-y-2">
            <p className="text-sm font-medium text-primary">Top Job Matches</p>
            {matches.map((m) => (
              <div key={m.title} className="flex items-center justify-between text-sm">
                <span>{m.title}</span>
                <span className="text-primary font-semibold">{m.score}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chatbot */}
      <ChatBot
        apiKey={apiKey}
        onResumeGenerated={(text) => setResumeText(text)}
      />

      <ApiKeyModal
        open={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={setApiKey}
      />
    </div>
  );
}
