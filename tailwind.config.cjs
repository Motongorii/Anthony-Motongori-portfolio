/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "#7c3aed",
					dark: "#6d28d9",
					light: "#a78bfa",
				},
			},
			fontFamily: {
				sans: [
					"Inter var",
					"Inter",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
				],
			},
			boxShadow: {
				soft: "0 8px 30px rgba(0,0,0,0.12)",
			},
		},
	},
	plugins: [],
}; 