import type { Config } from "tailwindcss";

export default {
  // Limit Tailwind to only your own files
  content: ["./app/**/*.{js,ts,jsx,tsx}"],

  // Turn off preflight so Tailwind doesn't inject its base styles
  corePlugins: {
    preflight: false,
  },

  theme: {
    // Instead of 'extend', we can directly define the entire colors object
    colors: {
      /*
       * Telling Tailwind: "Only use these color classes."
       * e.g. bg-primary, text-secondary, border-accent
       */
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      accent: "var(--color-accent)",
      card: "var(--color-card)",
      success: "var(--color-success)",
      error: "var(--color-error)",
      warning: "var(--color-warning)",
      info: "var(--color-info)",

      // Possibly also "brand-dark" and "brand-light" if you want classes for them
      "brand-dark": "var(--color-brand-dark)",
      "brand-light": "var(--color-brand-light)",

      // If you'd like a "text" color class with your var:
      text: "var(--color-text)",

      // If you want a "bg" variable specifically:
      bg: "var(--color-bg)",

      // Or you can create "transparent" / "current" placeholders if needed for certain utilities:
      transparent: "transparent",
      current: "currentColor",
    },

    /* ...add anything else you want, but remove everything else from default. */
  },

  plugins: [],
} satisfies Config;
