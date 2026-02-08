module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
			screens: {
				'xs': '475px',
			},
		},
	},
	plugins: [],
};
