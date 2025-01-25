import { create } from 'zustand';

export const useUserFilterStore = create((set) => ({
	search: '',
	emailVerified: '',
	perPage: 10,

	setSearch: (value) => set({ search: value }),
	setEmailVerified: (value) => set({ emailVerified: value }),
	setPerPage: (value) => set({ perPage: value }),
}));
