import { useState } from "react";
import { MapPin, Key } from "lucide-react";
import ChatBot from "@/components/ChatBot";
import ApiKeyModal, { useApiKey } from "@/components/ApiKeyModal";

const cities = ["San Francisco", "Austin", "New York", "Seattle", "Chicago"];

export default function ArticlesPage() {
  const { apiKey, setApiKey } = useApiKey();
  const [showKeyModal, setShowKeyModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-gradient">Articles & Insights</h1>

      {/* Opportunity Map */}
      <div className="glass-surface p-6 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="text-primary" size={18} />
          <h2 className="font-semibold text-lg">Opportunity Map</h2>
        </div>
        <div className="rounded-xl overflow-hidden border border-glass-border">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-125.0%2C24.0%2C-66.0%2C50.0&layer=mapnik"
            className="w-full h-80"
            title="Opportunity Map"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <span key={c} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* AI Resume Builder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">AI Resume Builder</h2>
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-glass-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <Key size={12} />
            {apiKey ? "Update Key" : "Set Key"}
          </button>
        </div>
        <ChatBot apiKey={apiKey} />
      </div>

      <ApiKeyModal open={showKeyModal} onClose={() => setShowKeyModal(false)} onSave={setApiKey} />
    </div>
  );
}
