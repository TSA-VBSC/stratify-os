import { useState } from "react";
import { Loader2, Route, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatCompletion } from "@/lib/openai";

export default function CareerPathPage() {
  const [currentRole, setCurrentRole] = useState("");
  const [dreamRole, setDreamRole] = useState("");
  const [experience, setExperience] = useState("0-2 years");
  const [pathResult, setPathResult] = useState("");
  const [loading, setLoading] = useState(false);

  const expLevels = ["Student", "0-2 years", "3-5 years", "5-10 years", "10+ years"];

  const generatePath = async () => {
    if (!currentRole.trim() || !dreamRole.trim()) return;
    setLoading(true);
    setPathResult("");

    const systemPrompt = `You are an expert career strategist. Create a detailed, actionable career roadmap.

Format with markdown using clear sections:

## 🗺️ Career Roadmap: {Current Role} → {Dream Role}

### Phase 1: Foundation (0-6 months)
- Specific skills to learn
- Courses/certifications
- Projects to build

### Phase 2: Growth (6-18 months)
- Role transitions to make
- Network building strategies
- Key milestones

### Phase 3: Acceleration (18-36 months)
- Advanced skills
- Leadership opportunities
- Target companies

### 💰 Expected Salary Progression
Show salary ranges at each phase

### 📚 Top Resources
List 5 specific resources (courses, books, communities)

Be specific, practical, and motivating. Include real company names, actual course recommendations, and realistic timelines.`;

    try {
      const reply = await chatCompletion(
        [{ role: "user", content: `Current Role: ${currentRole}\nDream Role: ${dreamRole}\nExperience: ${experience}\n\nResume context: ${localStorage.getItem("user_resume_preview") || "No resume uploaded"}` }],
        systemPrompt
      );
      setPathResult(reply);
    } catch (err: any) {
      setPathResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gradient">Career Path Visualizer</h1>
        <p className="text-muted-foreground text-sm">AI-powered roadmap from where you are to where you want to be.</p>
      </div>

      <div className="glass-surface p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Role / Status</label>
            <input value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} placeholder="e.g. Computer Science Student" className="w-full px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dream Role</label>
            <input value={dreamRole} onChange={(e) => setDreamRole(e.target.value)} placeholder="e.g. AI Research Scientist" className="w-full px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Experience Level</label>
          <div className="flex flex-wrap gap-2">
            {expLevels.map((e) => (
              <button key={e} onClick={() => setExperience(e)} className={`px-4 py-2 rounded-full text-sm transition-all border ${experience === e ? "bg-primary/20 border-primary text-primary" : "border-glass-border text-muted-foreground hover:text-foreground hover:border-primary/30"}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generatePath} disabled={loading || !currentRole.trim() || !dreamRole.trim()} className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50">
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Route size={18} />}
          {loading ? "Building Roadmap..." : "Generate Career Path"}
        </button>
      </div>

      {pathResult && (
        <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-center gap-2 py-4">
            <span className="px-4 py-2 rounded-full bg-muted text-sm font-medium">{currentRole}</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-0.5 bg-primary/40 rounded" style={{ opacity: 0.3 + i * 0.17 }} />
              ))}
              <Sparkles className="text-primary mx-1" size={16} />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-0.5 bg-primary rounded" style={{ opacity: 0.5 + i * 0.1 }} />
              ))}
            </div>
            <span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30">{dreamRole}</span>
          </div>

          <div className="glass-surface p-8">
            <div className="prose prose-sm prose-invert max-w-none">
              <ReactMarkdown>{pathResult}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
