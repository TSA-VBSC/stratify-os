const acronym = [
  { letter: "S", word: "Strategy", desc: "Map your career path with precision and purpose." },
  { letter: "T", word: "Thought", desc: "Deep thinking and self-awareness drive better decisions." },
  { letter: "R", word: "Reasoning", desc: "Logical frameworks to evaluate opportunities." },
  { letter: "A", word: "AI", desc: "Artificial intelligence amplifying human potential." },
  { letter: "T", word: "Together", desc: "Collaborative intelligence for collective growth." },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gradient">About STRATIFY</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          STRATIFY is a premium AI-powered career intelligence platform designed to help students and professionals
          structure their career path using artificial intelligence.
        </p>
      </div>

      {/* Acronym */}
      <div className="space-y-4">
        {acronym.map((item, i) => (
          <div
            key={item.word}
            className="glass-surface p-6 card-hover flex items-center gap-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="text-4xl font-bold text-primary w-12 text-center">{item.letter}</span>
            <div>
              <h3 className="font-semibold text-lg">{item.word}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="glass-surface p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Helping students and professionals structure their career path using AI intelligence.
          We believe in the power of human-AI collaboration to unlock career potential that traditional tools miss.
        </p>
      </div>
    </div>
  );
}
