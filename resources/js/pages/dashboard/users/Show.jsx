import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import UserDetailsCard from '@/components/dashboard/users/UserDetailsCard';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

const UsersShow = ({ user }) => {
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
						<BreadcrumbLink asChild>
							<Link href={route('users.index')}>Pengguna</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Detail</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className='mt-6'>
				<Card className='overflow-hidden rounded-lg border-none'>
					<CardContent className='p-0'>
						<Card className='rounded-none border-none shadow-none'>
							<CardHeader className='p-4 sm:p-6'>
								<CardTitle className='text-2xl'>Detail Pengguna</CardTitle>
							</CardHeader>
							<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
							<CardContent className='p-0'>
								<UserDetailsCard user={user} />
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</section>
		</>
	);
};

UsersShow.layout = (children) => (
	<DashboardLayout title={'Detail Pengguna'}>
		<DashboardContentLayout title={'Detail'}>{children}</DashboardContentLayout>
	</DashboardLayout>
);

export default UsersShow;
