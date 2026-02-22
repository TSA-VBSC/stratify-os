import { useState, useEffect } from "react";
import { Key, X } from "lucide-react";

export function useApiKey() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("openai_api_key") || "");
  const save = (key: string) => {
    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
  };
  return { apiKey, setApiKey: save };
}

export default function ApiKeyModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (key: string) => void }) {
  const [value, setValue] = useState(() => localStorage.getItem("openai_api_key") || "");

  useEffect(() => {
    if (open) setValue(localStorage.getItem("openai_api_key") || "");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-surface p-8 max-w-md w-full mx-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="text-primary" size={20} />
            <h2 className="text-lg font-semibold">OpenAI API Key</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your OpenAI API key to enable AI features. Your key is stored locally and never sent to any server except OpenAI.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="sk-..."
          className="w-full px-4 py-3 bg-muted/50 border border-glass-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          onClick={() => { onSave(value); onClose(); }}
          className="w-full py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn"
        >
          Save Key
        </button>
      </div>
    </div>
  );
}
