import { useState, useEffect } from "react";
import { BarChart3, Heart, FileText, MapPin, TrendingUp, Briefcase, DollarSign, Target, Activity } from "lucide-react";
import { type Job } from "@/lib/jobs-data";

export default function DashboardPage() {
  const [resume, setResume] = useState("");
  const [scannerJobs, setScannerJobs] = useState<Job[]>([]);
  const [favJobs, setFavJobs] = useState<Job[]>([]);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    setResume(localStorage.getItem("user_resume_preview") || "");
    setAge(Number(localStorage.getItem("user_age")) || null);
    try { setScannerJobs(JSON.parse(localStorage.getItem("scanner_jobs") || "[]")); } catch { /* */ }
    try { setFavJobs(JSON.parse(localStorage.getItem("favored_jobs") || "[]")); } catch { /* */ }
  }, []);

  const meanScannerSalary = scannerJobs.length > 0
    ? Math.round(scannerJobs.reduce((a, j) => a + j.salaryNum, 0) / scannerJobs.length)
    : 0;

  const meanFavSalary = favJobs.length > 0
    ? Math.round(favJobs.reduce((a, j) => a + j.salaryNum, 0) / favJobs.length)
    : 0;

  const cities = ["San Francisco", "Austin", "New York", "Seattle", "Chicago"];

  const locationBreakdown = favJobs.reduce<Record<string, number>>((acc, j) => {
    acc[j.location] = (acc[j.location] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { icon: Target, label: "Scanner Matches", value: scannerJobs.length, color: "text-primary" },
    { icon: Heart, label: "Favorited Jobs", value: favJobs.length, color: "text-pink-400" },
    { icon: DollarSign, label: "Avg Scanner Salary", value: meanScannerSalary ? `$${meanScannerSalary.toLocaleString()}` : "—", color: "text-emerald-400" },
    { icon: TrendingUp, label: "Avg Favorite Salary", value: meanFavSalary ? `$${meanFavSalary.toLocaleString()}` : "—", color: "text-amber-400" },
    { icon: Activity, label: "Detected Age", value: age ?? "—", color: "text-primary" },
    { icon: FileText, label: "Resume Status", value: resume ? "Uploaded" : "Missing", color: resume ? "text-emerald-400" : "text-destructive" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gradient">Career Dashboard</h1>
        <p className="text-muted-foreground">Your unified career intelligence overview.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((s, i) => (
          <div key={s.label} className="glass-surface p-5 card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
            <s.icon className={`${s.color} mb-2`} size={22} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Salary Breakdown */}
      {favJobs.length > 0 && (
        <div className="glass-surface p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-primary" size={18} />
            <h2 className="font-semibold">Salary Breakdown — Favorites</h2>
          </div>
          <div className="space-y-3">
            {favJobs.map((j) => {
              const maxSalary = Math.max(...favJobs.map((x) => x.salaryNum));
              const pct = (j.salaryNum / maxSalary) * 100;
              return (
                <div key={j.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{j.title}</span>
                    <span className="text-primary font-medium">{j.salary}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Highlighted Cities */}
        <div className="glass-surface p-6 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={18} />
            <h2 className="font-semibold">Hot Markets</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <span key={c} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                {c}
              </span>
            ))}
          </div>
          {Object.keys(locationBreakdown).length > 0 && (
            <div className="mt-3 space-y-1.5">
              <p className="text-xs text-muted-foreground">Your favorite locations:</p>
              {Object.entries(locationBreakdown).map(([loc, count]) => (
                <div key={loc} className="flex justify-between text-sm">
                  <span>{loc}</span>
                  <span className="text-primary">{count} job{count > 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resume Preview */}
        <div className="glass-surface p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="text-primary" size={18} />
            <h2 className="font-semibold">Resume Preview</h2>
          </div>
          {resume ? (
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed bg-muted/20 rounded-xl p-3">
              {resume.slice(0, 800)}{resume.length > 800 && "..."}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">No resume uploaded yet. Head to the Resume page to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
