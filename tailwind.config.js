const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		colors: {
			...colors,
			primary: '#DD6E42',
			secondary: '#2B2D42'
		}
	},
	plugins: [],
};