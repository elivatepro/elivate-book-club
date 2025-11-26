const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,md,mdx,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        black: "#0A0908",
        "elivate-black": "#0A0908",
        "elivate-parchment": "#F7F3E9",
        "elivate-graphite": "#2C2B28",
        "ink-blue": "#1E3A5F",
        "margin-red": "#8B2635",
        "gold-leaf": "#C9A961",
        sage: "#6B7F59",
        "stone-gray": "#B8B5AD",
        "soft-gray": "#E8E6DC",
        whisper: "#FAF9F5",
        primary: "#1E3A5F",
        secondary: "#2C2B28",
        success: "#6B7F59",
        warning: "#C9A961",
        error: "#8B2635",
        text: "#0A0908",
        "text-light": "#2C2B28",
        background: "#F7F3E9",
        surface: "#FFFFFF",
        border: "#B8B5AD",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Crimson Pro", "Georgia", "serif"],
        ui: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        hero: [
          "3rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-0.02em",
            fontWeight: "900",
          },
        ],
        h1: [
          "2.5rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h2: [
          "2rem",
          {
            lineHeight: "2.5rem",
            fontWeight: "700",
          },
        ],
        h3: [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "700",
          },
        ],
        h4: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            fontWeight: "400",
          },
        ],
        body: [
          "1rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        small: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
          },
        ],
        caption: [
          "0.75rem",
          {
            lineHeight: "1rem",
            fontWeight: "400",
          },
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
      },
      maxWidth: {
        "content-narrow": "640px",
        "content-medium": "768px",
        "content-wide": "1024px",
        reading: "75ch",
      },
      borderRadius: {
        button: "4px",
        card: "8px",
        modal: "12px",
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgba(10, 9, 8, 0.05)",
        DEFAULT: "0 4px 6px -1px rgba(10, 9, 8, 0.1)",
        md: "0 4px 6px -1px rgba(10, 9, 8, 0.1)",
        lg: "0 10px 15px -3px rgba(10, 9, 8, 0.1)",
        xl: "0 20px 25px -5px rgba(10, 9, 8, 0.1)",
        "2xl": "0 25px 50px -12px rgba(10, 9, 8, 0.25)",
        focus: "0 0 0 3px rgba(30, 58, 95, 0.2)",
      },
    },
  },
  plugins: [],
};
