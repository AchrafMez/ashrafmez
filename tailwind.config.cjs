/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
				serif: ['"Instrument Serif"', 'Georgia', 'serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
			},
			colors: {
				bg: 'rgb(var(--bg) / <alpha-value>)',
				surface: 'rgb(var(--surface) / <alpha-value>)',
				fg: 'rgb(var(--fg) / <alpha-value>)',
				muted: 'rgb(var(--muted) / <alpha-value>)',
				faint: 'rgb(var(--faint) / <alpha-value>)',
				line: 'rgb(var(--line) / <alpha-value>)',
				signal: 'rgb(var(--signal) / <alpha-value>)',
			},
			screens: {
				xs: '475px',
			},
			letterSpacing: {
				tightest: '-0.055em',
			},
			transitionTimingFunction: {
				out: 'cubic-bezier(0.16, 1, 0.3, 1)',
				inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
			},
		},
	},
	plugins: [],
};
