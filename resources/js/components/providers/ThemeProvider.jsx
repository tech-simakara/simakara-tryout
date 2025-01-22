import { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
	theme: 'system',
	setTheme: () => null,
	disableTransitionOnChange: false,
};

const ThemeProviderContext = createContext(initialState);

const disableAnimation = (nonce) => {
	const css = document.createElement('style');
	if (nonce) css.setAttribute('nonce', nonce);
	css.appendChild(
		document.createTextNode(
			`*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
		),
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();

		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'theme',
	disableTransitionOnChange = false,
	nonce,
	...props
}) {
	const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

	useEffect(() => {
		const root = window.document.documentElement;
		let cleanupAnimation;

		if (disableTransitionOnChange) {
			cleanupAnimation = disableAnimation(nonce);
		}

		root.classList.remove('light', 'dark');

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';

			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}

		// Re-enable transitions after theme change
		if (disableTransitionOnChange && cleanupAnimation) {
			cleanupAnimation();
		}
	}, [theme, disableTransitionOnChange, nonce]);

	const value = {
		theme,
		setTheme: (theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		disableTransitionOnChange,
	};

	return (
		<ThemeProviderContext.Provider
			{...props}
			value={value}
		>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
