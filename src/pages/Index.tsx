import { useNavigate } from "react-router-dom";
import { Brain, ScanFace, Briefcase } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Brain, title: "Resume Intelligence", desc: "AI analyzes and builds resumes tailored to your target roles." },
  { icon: ScanFace, title: "Face Scanner", desc: "Simulates career matching based on age detection." },
  { icon: Briefcase, title: "Job Intelligence", desc: "Dynamic job discovery and salary insights." },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

        <div className="relative z-10 text-center px-6 space-y-8 max-w-3xl mx-auto">
          <h1
            className="text-6xl md:text-8xl font-bold tracking-tighter opacity-0 animate-fade-in"
          >
            <span className="text-gradient">STRATIFY</span>{" "}
            <span className="text-foreground">OS</span>
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            A smarter way to structure your career journey.
          </p>
          <button
            onClick={() => navigate("/resume")}
            className="opacity-0 animate-fade-in px-8 py-4 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-semibold text-lg glow-btn"
            style={{ animationDelay: "0.4s" }}
          >
            Start Stratifying
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-surface p-8 card-hover opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.6 + i * 0.15}s` }}
            >
              <f.icon className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
