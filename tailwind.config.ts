import type {Config} from 'tailwindcss';

export default {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#101318',
        white: '#FFFFFF',

        gray: {
          100: '#F2F4F8',
          300: '#CFDBEA',
          500: '#9FACBD',
          800: '#2D3034',
        },

        purple: {
          100: '#6A42DB',
          10: '#F1EDFC',
        },
      },
      extend: {
        fontFamily: {
          sans: ['var(--font-pretendard)', 'sans-serif'],
        },
        fontSize: {
          '3xl': ['32px', '42px'],
          '2xl': ['24px', '32px'],
          xl: ['20px', '32px'],
          '2lg': ['18px', '26px'],
          lg: ['16px', '26px'],
          md: ['14px', '24px'],
          sm: ['13px', '22px'],
          xs: ['12px', '20px'],
        },
        fontWeight: {
          bold: '700',
          semibold: '600',
          medium: '500',
          regular: '400',
        },
        screens: {
          // PC (1200px 이상)
          pc: '1200px',
          // Tablet (745px 이상 ~ 1199px 이하)
          tablet: '745px',
          // Mobile (375px 이상 ~ 744px 이하)
        },
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
        large: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
