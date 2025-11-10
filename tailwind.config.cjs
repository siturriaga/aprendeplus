module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        base: "var(--color-base)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        border: "var(--color-border)"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      boxShadow: {
        subtle: "0 10px 30px rgba(31, 34, 51, 0.12)"
      }
    }
  },
  plugins: []
};
