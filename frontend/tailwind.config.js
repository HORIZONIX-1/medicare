module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        primary: '#7c3aed',
        secondary: '#06b6d4',
        muted: '#6b7280',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      },
      borderRadius: {
        lg: '12px',
      },
      boxShadow: {
        card: '0 6px 20px rgba(16,24,40,0.08)',
        soft: '0 2px 10px rgba(2,6,23,0.06)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
};
