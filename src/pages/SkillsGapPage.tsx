import { useState } from "react";
import { Target, Loader2, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatCompletion } from "@/lib/openai";

export default function SkillsGapPage() {
  const [resume, setResume] = useState(() => localStorage.getItem("user_resume_preview") || "");
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeGap = async () => {
    if (!resume.trim() || !jobDescription.trim()) return;
    setLoading(true);
    setAnalysis("");

    const systemPrompt = `You are an expert career advisor and skills gap analyst. Analyze the candidate's resume against the target job description.

Provide a structured analysis using markdown:
## Match Score
Give an overall match percentage (0-100%)

## ✅ Matching Skills
List skills from the resume that match the job requirements

## ⚠️ Missing Skills
List critical skills required by the job that are absent from the resume

## 📈 Recommended Actions
Provide 3-5 specific, actionable steps to close the gap (courses, certifications, projects)

## 🎯 Interview Preparation Tips
Key areas to prepare for based on gaps

Be specific, data-driven, and encouraging.`;

    try {
      const reply = await chatCompletion(
        [{ role: "user", content: `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jobDescription}` }],
        systemPrompt
      );
      setAnalysis(reply);
    } catch (err: any) {
      setAnalysis(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gradient">AI Skills Gap Analyzer</h1>
        <p className="text-muted-foreground text-sm">Compare your resume against any job description with AI precision.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-surface p-6 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-400" size={16} />
            <h2 className="font-semibold text-sm">Your Resume</h2>
          </div>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume here..." rows={10} className="w-full bg-muted/30 border border-glass-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed" />
        </div>

        <div className="glass-surface p-6 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-amber-400" size={16} />
            <h2 className="font-semibold text-sm">Target Job Description</h2>
          </div>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description you want to apply for..." rows={10} className="w-full bg-muted/30 border border-glass-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed" />
        </div>
      </div>

      <button onClick={analyzeGap} disabled={loading || !resume.trim() || !jobDescription.trim()} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Target size={18} />}
        {loading ? "Analyzing..." : "Analyze Skills Gap"}
      </button>

      {analysis && (
        <div className="glass-surface p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary" size={18} />
            <h2 className="font-semibold text-lg">Gap Analysis Results</h2>
          </div>
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
