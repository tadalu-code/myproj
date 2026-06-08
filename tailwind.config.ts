import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Chú ý: fontFamily nên nằm trong extend
      fontFamily: {
      inter: ['var(--font-inter)', 'sans-serif'],
      oswald: ['var(--font-oswald)', 'sans-serif'],
      montserrat: ['var(--font-montserrat)', 'sans-serif'],      }, // <-- 2. Phải có dấu phẩy ở đây nếu phía sau còn code
    }, // <-- 3. Đóng của extend
  }, // <-- 4. Đóng của theme
  plugins: [],
};

export default config;