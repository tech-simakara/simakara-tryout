import forms from '@tailwindcss/forms';
import tailwindcssAnimate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                black: {
                    100: 'hsl(var(--black-100))',
                    200: 'hsl(var(--black-200))',
                    300: 'hsl(var(--black-300))',
                    400: 'hsl(var(--black-400))',
                    500: 'hsl(var(--black-500))',
                    600: 'hsl(var(--black-600))',
                    700: 'hsl(var(--black-700))',
                    800: 'hsl(var(--black-800))',
                    DEFAULT: 'hsl(var(--black-900))',
                    foreground: 'hsl(var(--black-foreground))',
                },
                white: {
                    DEFAULT: 'hsl(var(--white-100))',
                    foreground: 'hsl(var(--white-foreground))',
                    200: 'hsl(var(--white-200))',
                    300: 'hsl(var(--white-300))',
                    400: 'hsl(var(--white-400))',
                    500: 'hsl(var(--white-500))',
                    600: 'hsl(var(--white-600))',
                    700: 'hsl(var(--white-700))',
                    800: 'hsl(var(--white-800))',
                    900: 'hsl(var(--white-900))',
                },
                primary: {
                    100: 'hsl(var(--primary-100))',
                    200: 'hsl(var(--primary-200))',
                    300: 'hsl(var(--primary-300))',
                    400: 'hsl(var(--primary-400))',
                    DEFAULT: 'hsl(var(--primary-500))',
                    foreground: 'hsl(var(--primary-foreground))',
                    600: 'hsl(var(--primary-600))',
                    700: 'hsl(var(--primary-700))',
                    800: 'hsl(var(--primary-800))',
                    900: 'hsl(var(--primary-900))',
                },
                secondary: {
                    100: 'hsl(var(--secondary-100))',
                    200: 'hsl(var(--secondary-200))',
                    300: 'hsl(var(--secondary-300))',
                    400: 'hsl(var(--secondary-400))',
                    DEFAULT: 'hsl(var(--secondary-500))',
                    foreground: 'hsl(var(--secondary-foreground))',
                    600: 'hsl(var(--secondary-600))',
                    700: 'hsl(var(--secondary-700))',
                    800: 'hsl(var(--secondary-800))',
                    900: 'hsl(var(--secondary-900))',
                },
                red: {
                    100: 'hsl(var(--red-100))',
                    200: 'hsl(var(--red-200))',
                    300: 'hsl(var(--red-300))',
                    400: 'hsl(var(--red-400))',
                    DEFAULT: 'hsl(var(--red-500))',
                    foreground: 'hsl(var(--red-foreground))',
                    600: 'hsl(var(--red-600))',
                    700: 'hsl(var(--red-700))',
                    800: 'hsl(var(--red-800))',
                    900: 'hsl(var(--red-900))',
                },
                turquoise: {
                    100: 'hsl(var(--turquoise-100))',
                    200: 'hsl(var(--turquoise-200))',
                    300: 'hsl(var(--turquoise-300))',
                    400: 'hsl(var(--turquoise-400))',
                    DEFAULT: 'hsl(var(--turquoise-500))',
                    foreground: 'hsl(var(--turquoise-foreground))',
                    600: 'hsl(var(--turquoise-600))',
                    700: 'hsl(var(--turquoise-700))',
                    800: 'hsl(var(--turquoise-800))',
                    900: 'hsl(var(--turquoise-900))',
                },
                success: {
                    100: 'hsl(var(--success-100))',
                    200: 'hsl(var(--success-200))',
                    300: 'hsl(var(--success-300))',
                    400: 'hsl(var(--success-400))',
                    DEFAULT: 'hsl(var(--success-500))',
                    foreground: 'hsl(var(--success-foreground))',
                    600: 'hsl(var(--success-600))',
                    700: 'hsl(var(--success-700))',
                    800: 'hsl(var(--success-800))',
                    900: 'hsl(var(--success-900))',
                },
                warning: {
                    100: 'hsl(var(--warning-100))',
                    200: 'hsl(var(--warning-200))',
                    300: 'hsl(var(--warning-300))',
                    400: 'hsl(var(--warning-400))',
                    DEFAULT: 'hsl(var(--warning-500))',
                    foreground: 'hsl(var(--warning-foreground))',
                    600: 'hsl(var(--warning-600))',
                    700: 'hsl(var(--warning-700))',
                    800: 'hsl(var(--warning-800))',
                    900: 'hsl(var(--warning-900))',
                },
                destructive: {
                    100: 'hsl(var(--destructive-100))',
                    200: 'hsl(var(--destructive-200))',
                    300: 'hsl(var(--destructive-300))',
                    400: 'hsl(var(--destructive-400))',
                    DEFAULT: 'hsl(var(--destructive-500))',
                    foreground: 'hsl(var(--destructive-foreground))',
                    600: 'hsl(var(--destructive-600))',
                    700: 'hsl(var(--destructive-700))',
                    800: 'hsl(var(--destructive-800))',
                    900: 'hsl(var(--destructive-900))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    1: 'hsl(var(--chart-1))',
                    2: 'hsl(var(--chart-2))',
                    3: 'hsl(var(--chart-3))',
                    4: 'hsl(var(--chart-4))',
                    5: 'hsl(var(--chart-5))',
                },
            },
        },
    },
    plugins: [forms, tailwindcssAnimate],
};
