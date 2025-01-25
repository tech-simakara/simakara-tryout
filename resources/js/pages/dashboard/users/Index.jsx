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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/Select.jsx';
import { userColumns } from '@/components/dashboard/users/UserColumns';
import { useUserFilterStore } from '@/hooks/use-user-filter-store';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getPathname } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo } from 'react';

const Users = ({ users, filters }) => {
	const { search, setSearch, perPage, setPerPage, emailVerified, setEmailVerified } =
		useUserFilterStore();

	const buildQueryParams = (overrides = {}) => {
		const { search, perPage, emailVerified } = useUserFilterStore.getState();

		const params = {
			search,
			per_page: perPage,
			email_verified: emailVerified,
			...overrides,
		};

		return Object.fromEntries(
			Object.entries(params).filter(
				([, value]) => value !== undefined && value !== null && value !== '',
			),
		);
	};

	const makeRequest = (overrides = {}) => {
		router.get(getPathname('users.index'), buildQueryParams(overrides), {
			only: ['users'],
			preserveState: true,
		});
	};

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
				makeRequest({ search: value });
			}, 300),
		[perPage, emailVerified],
	);

	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		debouncedSearch(value);
	};

	const handlePerPageChange = (value) => {
		setPerPage(value);
		makeRequest({ per_page: value });
	};

	const handleEmailVerifiedChange = (value) => {
		const normalizedValue = value === 'all' ? '' : value;

		setEmailVerified(normalizedValue);
		makeRequest({
			email_verified: normalizedValue || undefined,
		});
	};

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
									handlePerPageChange={handlePerPageChange}
									columns={userColumns}
									data={users}
								>
									<div className='flex w-fit items-center gap-2'>
										<Input
											className='w-[150px] lg:w-[250px]'
											startIcon={Search}
											placeholder='Cari pengguna...'
											value={search}
											onChange={handleSearchChange}
										/>
										<Select
											defaultValue={`${emailVerified}` || ''}
											onValueChange={handleEmailVerifiedChange}
										>
											<SelectTrigger className='border border-primary w-48'>
												<SelectValue placeholder={emailVerified || 'Semua'} />
											</SelectTrigger>
											<SelectContent side='top'>
												<SelectGroup>
													<SelectLabel>Status verifikasi</SelectLabel>
													<SelectSeparator />
													<SelectItem value='all' selected={!emailVerified}>
														Semua
													</SelectItem>
													<SelectItem
														value='true'
														selected={!!emailVerified}
													>
														Terverifikasi
													</SelectItem>
													<SelectItem
														value='false'
														selected={!!emailVerified}
													>
														Belum terverifikasi
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								</DataTable>
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
