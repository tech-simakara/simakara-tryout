import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getPathname(routeName, params = {}) {
	return new URL(route(routeName, params)).pathname;
}

export function isActiveMenu(menuHref, url) {
	const currentPath = new URL(url).pathname;
	return currentPath === menuHref || currentPath.startsWith(menuHref);
}

export function getInitials(name) {
	if (!name) return 'ST';
	return name
		.split(' ')
		.map((word) => word[0]?.toUpperCase())
		.slice(0, 2)
		.join('');
}

export const isObjectEmpty = (obj) => !Object.keys(obj).length;

export function snakeToNormal(string) {
	return string.replace(/_/g, ' ');
}
