import { LayoutGrid, User, Users } from 'lucide-react';

export function getMenuList() {
	return [
		{
			groupLabel: '',
			menus: [
				{
					href: '/dashboard',
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
							href: '/users',
							label: 'Daftar Pengguna',
						},
						{
							href: '/users/create',
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
					href: '/account',
					label: 'Akun',
					icon: User,
				},
			],
		},
	];
}
