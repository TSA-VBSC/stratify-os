import { useNavigate } from "react-router-dom";
import { Brain, ScanFace, Briefcase, MessageSquare, Target, FileText, Route, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "Resume Intelligence", desc: "AI analyzes and builds resumes tailored to your target roles.", path: "/resume" },
  { icon: MessageSquare, title: "AI Interview Simulator", desc: "Practice mock interviews with AI and get real-time scoring.", path: "/interview" },
  { icon: Target, title: "Skills Gap Analyzer", desc: "AI compares your resume against any job description.", path: "/skills-gap" },
  { icon: FileText, title: "Cover Letter Generator", desc: "Generate personalized cover letters with AI in any tone.", path: "/cover-letter" },
  { icon: Route, title: "Career Path Visualizer", desc: "AI-powered roadmap from your current role to your dream job.", path: "/career-path" },
  { icon: ScanFace, title: "Face Scanner", desc: "Simulates career matching based on age detection.", path: "/scanner" },
  { icon: Briefcase, title: "Job Intelligence", desc: "Dynamic job discovery, salary insights, and favorites.", path: "/jobs" },
  { icon: BarChart3, title: "Career Dashboard", desc: "Unified analytics across all your career data.", path: "/dashboard" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative z-10 text-center px-6 space-y-8 max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter opacity-0 animate-fade-in">
            <span className="text-gradient">STRATIFY</span>{" "}
            <span className="text-foreground">OS</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A smarter way to structure your career journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <button onClick={() => navigate("/dashboard")} className="px-8 py-4 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-semibold text-lg glow-btn">
              Start Stratifying
            </button>
            <button onClick={() => navigate("/interview")} className="px-8 py-4 rounded-full border border-primary/30 text-primary font-medium text-lg hover:bg-primary/10 transition-all">
              Try AI Interview
            </button>
          </div>
        </div>
      </section>

      {/* AI-Powered label */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60 text-center opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          AI-Powered Career Intelligence Suite
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <button
              key={f.title}
              onClick={() => navigate(f.path)}
              className="glass-surface p-6 card-hover opacity-0 animate-fade-in-up text-left group"
              style={{ animationDelay: `${0.6 + i * 0.08}s` }}
            >
              <f.icon className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300" size={28} />
              <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
