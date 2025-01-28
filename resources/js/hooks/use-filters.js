import { getPathname } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { create } from 'zustand';

export const useUserFilterStore = create((set) => ({
	setSearch: (value) => set({ search: value }),
	setRole: (value) => set({ role: value }),
	setEmailVerified: (value) => set({ emailVerified: value }),
	setPerPage: (value) => set({ perPage: value }),
	setPage: (value) => set({ page: value }),

	syncFromQuery: (queryParams) => {
		const search = queryParams.search;
		const role = queryParams.role;
		const emailVerified = queryParams.email_verified;
		const perPage = parseInt(queryParams.per_page, 10);
		const page = parseInt(queryParams.page, 10);

		set({ search, role, emailVerified, perPage, page });
	},

	buildQueryParams: (overrides = {}) => {
		const { search, role, perPage, emailVerified, page } = useUserFilterStore.getState();
		const params = {
			search,
			role,
			email_verified: emailVerified,
			per_page: perPage,
			page,
			...overrides,
		};

		return Object.fromEntries(
			Object.entries(params).filter(
				([, value]) =>
					value !== undefined && value !== null && value !== '' && !Number.isNaN(value),
			),
		);
	},

	makeRequest: (overrides = {}) => {
		router.get(
			getPathname('users.index'),
			useUserFilterStore.getState().buildQueryParams(overrides),
			{
				only: ['users', 'pagination'],
				preserveState: true,
				preserveScroll: true,
			},
		);
	},

	isFiltered: () => {
		const { search, role, emailVerified } = useUserFilterStore.getState();

		return Object.values({ search, role, emailVerified }).some(Boolean);
	},

	reset: () => {
		const keysToReset = ['search', 'role', 'emailVerified'];
		const resetState = keysToReset.reduce((acc, key) => {
			acc[key] = undefined;
			return acc;
		}, {});

		set(resetState);
		useUserFilterStore.getState().makeRequest(resetState);
	},
}));
