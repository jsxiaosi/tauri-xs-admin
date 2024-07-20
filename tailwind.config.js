/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // 关闭默认样式
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--main-color)',
      },
    },
  },
  plugins: [],
};
