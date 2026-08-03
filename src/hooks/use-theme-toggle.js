import { useCallback } from "react";
import { useTheme } from "next-themes";

/**
 * Toggle tema dengan transisi halus: kelas `.theme-transition` ditambahkan
 * sesaat ke <html> sehingga warna latar/border/teks bertransisi mulus,
 * lalu kelas dihapus setelah animasi selesai.
 */
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;

    root.classList.add("theme-transition");

    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 400);
  }, [resolvedTheme, setTheme]);

  return { resolvedTheme, toggleTheme };
}
