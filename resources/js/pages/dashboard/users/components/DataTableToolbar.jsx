import { Button } from '@/components/Button';
import { BulkDeleteAlertDialog } from '@/components/dashboard/users/BulkDeleteAlertDialog';
import { Input } from '@/components/Input';
import useDebounce from '@/hooks/use-debounce';
import { useUserFilterStore } from '@/hooks/use-filters';
import { DataTableFacetedFilter } from '@/pages/dashboard/users/components/DataTableFacetedFilter';
import { DataTableRadioGroupFilter } from '@/pages/dashboard/users/components/DataTableRadioGroupFilter';
import { EmailVerified, Roles } from '@/pages/dashboard/users/data/Options';
import { Search, X } from 'lucide-react';
import { DataTableViewOptions } from './DataTableViewOptions';

export function DataTableToolbar({ table }) {
	const { search, setSearch, setRole, setEmailVerified, makeRequest, isFiltered, reset } =
		useUserFilterStore();

	const { value: searchValue, handleSearch } = useDebounce(search, setSearch, 500, (newValue) => {
		setSearch(newValue);
		makeRequest({ search: newValue });
	});

	const handleRoleChange = (selectedRoles) => {
		const role = selectedRoles.length > 0 ? selectedRoles.join(',') : '';

		setRole(role);
		makeRequest({ role });
	};

	const handleEmailVerifiedChange = (selectedStatus) => {
		setEmailVerified(selectedStatus);
		makeRequest({ email_verified: selectedStatus });
	};

	const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

	return (
		<div className='no-scrollbar flex w-full items-center justify-between space-x-2 overflow-x-scroll p-0.5'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					className='w-[160px] sm:w-[250px]'
					placeholder='Cari pengguna...'
					startIcon={Search}
					value={searchValue}
					onChange={handleSearch}
					autoFocus
				/>
				<DataTableFacetedFilter
					column={{
						getFilterValue: () => {
							const { role } = useUserFilterStore.getState();
							return role ? role.split(',') : [];
						},
						setFilterValue: (selectedRoles) => handleRoleChange(selectedRoles || []),
					}}
					title='Peran'
					options={Roles}
				/>
				<DataTableRadioGroupFilter
					column={{
						getFilterValue: () => {
							const { emailVerified } = useUserFilterStore.getState();
							return emailVerified;
						},
						setFilterValue: (selectedStatus) =>
							handleEmailVerifiedChange(selectedStatus),
					}}
					title='Email'
					options={EmailVerified}
				/>
				{hasSelectedRows && <BulkDeleteAlertDialog table={table} />}
				{isFiltered() && (
					<Button
						variant='ghost'
						onClick={() => reset()}
						className='px-2 lg:px-3'
					>
						Reset
						<X />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
