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
import { useUserFilterStore } from '@/hooks/use-user-filter-store';
import { DashboardContentLayout } from '@/layouts/DashboardContentLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import { getPathname } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useMemo } from 'react';

const Users = ({ users, filters }) => {
	/*const [search, setSearch] = useState(users?.search || '');
	const [perPage, setPerPage] = useState(users?.meta.per_page);

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

	const handlePerPageChange = (value) => {
		setPerPage(value);
		router.get(getPathname('users.index'), { per_page: value }, { only: ['users'] });
	};

	useEffect(() => {
		setSearch((prevSearch) => prevSearch || users?.search || '');
	}, [users?.search]);*/

	const { search, setSearch, perPage, setPerPage, emailVerified, setEmailVerified } = useUserFilterStore();

	/*useEffect(() => {
		setSearch(filters.search || '');
		setEmailVerified(filters.email_verified || '');
		setPerPage(filters.per_page || 10);
	}, [filters]);*/

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

	const handleEmailVerifiedChange = (e) => {
		const value = e.target.value;
		setEmailVerified(value);
		makeRequest({ email_verified: value });
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
									<div className='grid grid-cols-2 w-full gap-4'>
										<Input
											startIcon={Search}
											placeholder='Cari nama lengkap atau email...'
											value={search}
											onChange={handleSearchChange}
										/>
										<div>
											Halo
										</div>
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
