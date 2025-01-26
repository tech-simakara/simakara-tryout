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
		set((state) => {
			const updatedState = { ...state };

			if ('search' in queryParams) updatedState.search = queryParams.search;
			if ('role' in queryParams) updatedState.role = queryParams.role;
			if ('email_verified' in queryParams)
				updatedState.emailVerified = queryParams.email_verified;
			if ('per_page' in queryParams && queryParams.per_page !== undefined) {
				updatedState.perPage = parseInt(queryParams.per_page, 10);
			}
			if ('page' in queryParams && queryParams.page !== undefined) {
				updatedState.page = parseInt(queryParams.page, 10);
			}

			return updatedState;
		});
	},

	buildQueryParams: (overrides = {}) => {
		const { search, role, perPage, emailVerified, page } = useUserFilterStore.getState();
		const params = {
			search,
			role,
			per_page: perPage,
			email_verified: emailVerified,
			page,
			...overrides,
		};

		return Object.fromEntries(
			Object.entries(params).filter(
				([, value]) => value !== undefined && value !== null && value !== '',
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
}));
