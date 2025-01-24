import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Input } from '@/components/Input.jsx';
import { userColumns } from '@/components/dashboard/users/UserColumns';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getPathname } from '@/lib/utils.js';
import { Link, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

const Users = ({ users }) => {
	const [search, setSearch] = useState(users?.search || '');
	const [perPage, setPerPage] = useState(users.per_page);

	const debounce = (fn, delay) => {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	};

	const debouncedSearch = useMemo(
		() =>
			debounce((value) => {
				router.get(
					getPathname('users.index'),
					{ search: value, per_page: perPage },
					{
						only: ['users'],
						preserveState: true,
					},
				);
			}, 300),
		[perPage],
	);

	const handleSearch = (e) => {
		const value = e.target.value;

		setSearch(value);
		debouncedSearch(value);
	};

	useEffect(() => {
		setSearch((prevSearch) => prevSearch || users?.search || '');
	}, [users?.search]);

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={route('dashboard')}>Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Pengguna</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className='mt-6'>
				<Card className='overflow-hidden rounded-lg border-none'>
					<CardContent className='p-0'>
						<Card className='rounded-none border-none shadow-none'>
							<CardHeader>
								<CardTitle className='text-2xl'>Daftar Pengguna</CardTitle>
							</CardHeader>
							<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
							<CardContent>
								<DataTable
									className='max-w-7xl'
									placeholderSearch={'Cari nama lengkap atau email...'}
									valueSearch={search}
									onChangeSearch={handleSearch}
									columns={userColumns}
									data={users}
								/>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

Users.layout = (children) => (
	<DashboardLayout title={'Daftar Pengguna'}>
		<DashboardContentLayout title={'Pengguna'}>{children}</DashboardContentLayout>
	</DashboardLayout>
);

export default Users;
