import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Resume", path: "/resume" },
  { label: "Scanner", path: "/scanner" },
  { label: "Job Search", path: "/jobs" },
  { label: "Podcast", path: "/podcast" },
  { label: "Articles", path: "/articles" },
  { label: "About", path: "/about" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-gradient tracking-wider">STRATIFY</span>
            <span className="hidden md:inline text-xs text-muted-foreground tracking-widest animate-typewriter">
              Strategy. Thought. Reasoning. AI. Together.
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={pathname === item.path ? "nav-btn-active" : "nav-btn"}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 pb-3 flex flex-wrap gap-2 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={pathname === item.path ? "nav-btn-active" : "nav-btn"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main>{children}</main>
    </div>
  );
}
