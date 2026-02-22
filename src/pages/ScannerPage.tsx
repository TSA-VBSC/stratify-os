import { useState, useRef, useEffect } from "react";
import { Camera, ScanLine, MapPin, DollarSign, ExternalLink } from "lucide-react";
import { scannerJobsYoung, scannerJobsSenior, type Job } from "@/lib/jobs-data";

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const [results, setResults] = useState<Job[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScan = async () => {
    setScanning(true);
    setScanned(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      // Camera not available — simulate
    }

    // Simulate scan
    setTimeout(() => {
      const simAge = Math.random() > 0.5 ? 20 : 28;
      setAge(simAge);
      const jobs = simAge < 22 ? scannerJobsYoung : scannerJobsSenior;
      setResults(jobs);
      setScanned(true);
      setScanning(false);

      localStorage.setItem("user_age", String(simAge));
      localStorage.setItem("scanner_jobs", JSON.stringify(jobs));

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-gradient">Face Scanner</h1>

      {/* Scanner area */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-64 h-64 scanner-ring flex items-center justify-center overflow-hidden bg-muted/20">
          {scanning || scanned ? (
            <video ref={videoRef} className="w-full h-full object-cover rounded-full" muted playsInline />
          ) : (
            <Camera className="text-primary/40" size={48} />
          )}

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-primary/60 animate-scan-line rounded" />
            </div>
          )}
        </div>

        {!scanned && (
          <button
            onClick={startScan}
            disabled={scanning}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary/80 to-primary text-primary-foreground font-medium glow-btn disabled:opacity-50"
          >
            <ScanLine size={18} />
            {scanning ? "Scanning..." : "Start Scan"}
          </button>
        )}

        {scanned && age !== null && (
          <p className="text-sm text-muted-foreground">
            Detected age: <span className="text-primary font-semibold">{age}</span> — showing {age < 22 ? "internship" : "senior"} matches
          </p>
        )}
      </div>

      {/* Results */}
      {scanned && results.length > 0 && (
        <div className="grid gap-4">
          {results.map((job) => (
            <div key={job.id} className="glass-surface p-6 card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                  </div>
                </div>
                {job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors shrink-0"
                  >
                    Apply <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
