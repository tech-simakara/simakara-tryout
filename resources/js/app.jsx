import '../css/app.css';
import './bootstrap';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/Sonner';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) =>
		resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
	setup({ el, App, props }) {
		if (import.meta.env.SSR) {
			hydrateRoot(
				el,
				<ThemeProvider
					defaultTheme='light'
					storageKey='theme'
					disableTransitionOnChange
				>
					<App {...props} />
					<Toaster
						richColors
						closeButton
					/>
				</ThemeProvider>,
			);
			return;
		}

		createRoot(el).render(
			<ThemeProvider
				defaultTheme='light'
				storageKey='theme'
				disableTransitionOnChange
			>
				<App {...props} />
				<Toaster
					richColors
					closeButton
				/>
			</ThemeProvider>,
		);
	},
	progress: {
		color: 'hsla(34, 76%, 55%, 1)',
	},
});
