import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from '@/components/Breadcrumb';
import { PlaceholderContent } from '@/components/PlaceholderContent';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<PlaceholderContent />
		</>
	);
};

Dashboard.layout = (children) => (
	<DashboardLayout title={'Dashboard'}>
		<DashboardContentLayout title={'Dashboard'}>{children}</DashboardContentLayout>
	</DashboardLayout>
);

export default Dashboard;
