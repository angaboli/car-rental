import type { Config } from 'tailwindcss'

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        segoe: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
        ubuntu: ["Dejavu", "sans-serif"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary-black": "#082130",
        "blue-green": "#05A3AB",
        "orange": "#FC9404",
        "light-orange": "#ECC19D",
        "light-gray": "#f1f1f1",
        "dark-gray": "#707070",
        "gray-100": "#f3f4f6",
        "gray-200": "#e5e7eb",
        "gray-500": "#6b7280",
        "slate-300": "#cbd5e1",
        "slate-400": "#94a3b8",
        "slate-700": "#334155",
        "slate-800": "#1e293b",
        "slate-900": "#0f172a",
        "zinc-600": "#52525b",
        "zinc-700": "#3f3f46",
        "zinc-800": "#27272a",
        "zinc-900": "#18181b",
        "cyan-400": "#22d3ee",
        "cyan-500": "#06b6d4",
        "cyan-600": "#0891b2",
        "cyan-700": "#0369a1",
        "sky-600": "#0284c7",
        "rose-700": "#be123c",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "light",
      "cupcake",
    ],
  },
}

module.exports = withMT(config);
