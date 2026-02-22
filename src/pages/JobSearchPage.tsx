import { useState, useEffect } from "react";
import { Heart, MapPin, DollarSign } from "lucide-react";
import { presetJobs, type Job } from "@/lib/jobs-data";

export default function JobSearchPage() {
  const [favorites, setFavorites] = useState<Job[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favored_jobs") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favored_jobs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (job: Job) => {
    setFavorites((prev) =>
      prev.some((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job]
    );
  };

  const isFav = (id: string) => favorites.some((j) => j.id === id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gradient">Job Search</h1>
        <span className="text-sm text-muted-foreground">
          {favorites.length} favorited
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presetJobs.map((job) => (
          <div key={job.id} className="glass-surface p-5 card-hover flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-xs text-primary/80">{job.company}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(job)}
                  className="shrink-0 p-2 rounded-full transition-all duration-300 hover:bg-primary/10"
                >
                  <Heart
                    size={18}
                    className={isFav(job.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{job.description}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
              <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
