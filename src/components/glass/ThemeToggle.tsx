import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme") as Theme;
    if (saved) {
      document.documentElement.classList.toggle("dark", saved === "dark");
      return saved;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    return prefersDark ? "dark" : "light";
  });

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "glass-subtle rounded-full p-2.5 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300",
        "inline-flex items-center justify-center",
      )}
    >
      {theme === "dark" ? <Sun className="size-4 text-text-primary" /> : <Moon className="size-4 text-text-primary" />}
    </button>
  );
}
