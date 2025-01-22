import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { PlaceholderContent } from '@/components/PlaceholderContent';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

const Users = () => {
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
			<PlaceholderContent />
		</>
	);
};

Users.layout = (children) => (
	<DashboardLayout title={'Daftar Pengguna'}>
		<DashboardContentLayout title={'Pengguna'}>{children}</DashboardContentLayout>
	</DashboardLayout>
);

export default Users;
