import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getPathname(routeName) {
	return new URL(route(routeName)).pathname;
}

export function getInitials(name) {
	if (!name) return 'ST';
	return name
		.split(' ')
		.map((word) => word[0]?.toUpperCase())
		.slice(0, 2)
		.join('');
}
