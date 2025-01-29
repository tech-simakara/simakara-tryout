import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { useUserFilterStore } from '@/hooks/use-filters';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { Columns } from './components/Columns';
import { DataTable } from './components/DataTable';

const Users = ({ users, pagination }) => {
	const { syncFromQuery } = useUserFilterStore();

	useEffect(() => {
		syncFromQuery(route().params);
	}, [syncFromQuery]);

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
							<CardHeader className='p-4 sm:p-6'>
								<CardTitle className='text-2xl'>Daftar Pengguna</CardTitle>
							</CardHeader>
							<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
							<CardContent className='p-4 sm:p-6'>
								<DataTable
									data={users}
									pagination={pagination}
									columns={Columns}
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
