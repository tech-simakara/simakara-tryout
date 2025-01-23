import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { Card, CardContent } from '@/components/Card';
import { DeleteUserForm } from '@/components/dashboard/profile/DeleteUserForm';
import { UpdatePasswordForm } from '@/components/dashboard/profile/UpdatePasswordForm';
import { UpdateProfileInformationForm } from '@/components/dashboard/profile/UpdateProfileInformationForm';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

const Edit = ({ mustVerifyEmail, status }) => {
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
						<BreadcrumbPage>Profil</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section className='mt-6'>
				<Card className='overflow-hidden rounded-lg border-none'>
					<CardContent className='p-0'>
						<UpdateProfileInformationForm
							mustVerifyEmail={mustVerifyEmail}
							status={status}
							className='max-w-xl'
						/>
					</CardContent>
				</Card>
			</section>
			<section className='mt-6'>
				<Card className='overflow-hidden rounded-lg border-none'>
					<CardContent className='p-0'>
						<UpdatePasswordForm className='max-w-xl' />
					</CardContent>
				</Card>
			</section>
			<section className='mt-6'>
				<Card className='overflow-hidden rounded-lg border-none'>
					<CardContent className='p-0'>
						<DeleteUserForm className='max-w-xl' />
					</CardContent>
				</Card>
			</section>
		</>
	);
};

Edit.layout = (children) => (
	<DashboardLayout title={'Profil'}>
		<DashboardContentLayout title={'Profil'}>{children}</DashboardContentLayout>
	</DashboardLayout>
);

export default Edit;
