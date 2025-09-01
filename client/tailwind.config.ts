import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-Poppins)', 'sans-serif'],
        josefin: ['var(--font-Josefin)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      "400px": '400px',
      "800px": '800px', // ✅ use this in classNames like `md:hidden`
      "1000px": '1000px',
      "1200px": '1200px',
      '1500px': '1500px',
    },
  },
  plugins: [],
};

export default config;
