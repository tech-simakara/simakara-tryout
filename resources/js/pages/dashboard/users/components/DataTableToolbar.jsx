import { Input } from '@/components/Input';
import useDebounce from '@/hooks/use-debounce';
import { useUserFilterStore } from '@/hooks/use-filters';
import { DataTableFacetedFilter } from '@/pages/dashboard/users/components/DataTableFacetedFilter';
import { Roles } from '@/pages/dashboard/users/data/Options';
import { Search } from 'lucide-react';
import { DataTableViewOptions } from './DataTableViewOptions';

export function DataTableToolbar({ table }) {
	const { search, setSearch, setRole, makeRequest } = useUserFilterStore();

	const handleRoleChange = (selectedRoles) => {
		const role = selectedRoles.length > 0 ? selectedRoles.join(',') : '';

		setRole(role);
		makeRequest({ role });
	};

	const { value: searchValue, handleSearch } = useDebounce(
		search,
		setSearch,
		1000,
		(newValue) => {
			setSearch(newValue);
			makeRequest({ search: newValue });
		},
	);

	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div className='flex items-center justify-between'>
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
			</div>
			<DataTableViewOptions table={table} />
		</div>
	);
}
