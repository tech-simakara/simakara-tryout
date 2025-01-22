import { LayoutGrid, User, Users } from 'lucide-react';
import { getPathname } from '@/lib/utils';

export function getMenuList() {
	return [
		{
			groupLabel: '',
			menus: [
				{
					href: getPathname('dashboard'),
					label: 'Dashboard',
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: 'Fitur',
			menus: [
				{
					href: '',
					label: 'Pengguna',
					icon: Users,
					submenus: [
						{
							href: 'dashboard/users',
							label: 'Daftar Pengguna',
						},
						{
							href: 'dashboard/users/create',
							label: 'Tambah Pengguna',
						},
					],
				},
			],
		},
		{
			groupLabel: 'Pengaturan',
			menus: [
				{
					href: getPathname('profile.edit'),
					label: 'Profil',
					icon: User,
				},
			],
		},
	];
}
