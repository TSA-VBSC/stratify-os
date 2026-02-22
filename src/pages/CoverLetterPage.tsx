import { useState } from "react";
import { FileText, Loader2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatCompletion } from "@/lib/openai";

export default function CoverLetterPage() {
  const [resume, setResume] = useState(() => localStorage.getItem("user_resume_preview") || "");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("Professional");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tones = ["Professional", "Enthusiastic", "Confident", "Creative"];

  const generate = async () => {
    if (!resume.trim() || !company.trim() || !role.trim()) return;
    setLoading(true);
    setLetter("");

    const systemPrompt = `You are an expert cover letter writer. Write a compelling, personalized cover letter based on the candidate's resume.

Style: ${tone}
Keep it to 3-4 paragraphs. Be specific about how their experience relates to the role. Don't be generic.
Format with markdown.`;

    try {
      const reply = await chatCompletion(
        [{ role: "user", content: `Write a cover letter for:\nCompany: ${company}\nRole: ${role}\n\nMy Resume:\n${resume}` }],
        systemPrompt
      );
      setLetter(reply);
    } catch (err: any) {
      setLetter(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gradient">AI Cover Letter Generator</h1>
        <p className="text-muted-foreground text-sm">Generate tailored cover letters powered by AI.</p>
      </div>

      <div className="glass-surface p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Google" className="w-full px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. AI Engineer" className="w-full px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button key={t} onClick={() => setTone(t)} className={`px-4 py-2 rounded-full text-sm transition-all border ${tone === t ? "bg-primary/20 border-primary text-primary" : "border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your Resume</label>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume..." rows={6} className="w-full bg-muted/30 border border-glass-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
        </div>

        <button onClick={generate} disabled={loading || !resume.trim() || !company.trim() || !role.trim()} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </div>

      {letter && (
        <div className="glass-surface p-8 space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Your Cover Letter</h2>
            <button onClick={copyLetter} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-glass-border text-xs text-muted-foreground hover:text-foreground transition-all">
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{letter}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
