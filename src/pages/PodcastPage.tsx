import { useState } from "react";
import { Play, Pause, Headphones, Clock } from "lucide-react";
import { podcastEpisodes } from "@/lib/jobs-data";

export default function PodcastPage() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gradient">Career Intelligence Podcast</h1>
        <p className="text-muted-foreground">Insights from industry leaders on building your career with AI.</p>
      </div>

      <div className="grid gap-4">
        {podcastEpisodes.map((ep) => (
          <div key={ep.id} className="glass-surface p-6 card-hover">
            <div className="flex items-start gap-5">
              <button
                onClick={() => setPlaying(playing === ep.id ? null : ep.id)}
                className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors glow-btn"
              >
                {playing === ep.id ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
              </button>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-semibold text-lg">{ep.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ep.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Clock size={12} /> {ep.duration}</span>
                  <span className="flex items-center gap-1"><Headphones size={12} /> Episode</span>
                </div>

                {playing === ep.id && (
                  <div className="mt-3 space-y-2">
                    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-primary/60 to-primary rounded-full animate-pulse" />
                    </div>
                    <p className="text-xs text-primary">Playing (simulated)...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
