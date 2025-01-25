import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from '@/components/Select';

export function DataTablePagination({ handlePerPageChange, data, table, children }) {
	const { meta } = data;
	const totalRows = meta.total;
	const currentPage = meta.current_page;
	const lastPage = meta.last_page;
	const perPage = meta.per_page;

	return (
		<div className='flex flex-wrap items-center justify-center gap-4 py-4 sm:justify-between'>
			<div className='mr-auto text-sm text-muted-foreground'>
				{table.getFilteredSelectedRowModel().rows.length} dari {totalRows} baris dipilih
			</div>
			<div className='flex items-center justify-center gap-4 lg:gap-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Baris per halaman</p>
					<Select
						defaultValue={`${perPage}`}
						onValueChange={handlePerPageChange}
					>
						<SelectTrigger className='w-[70px] border border-primary'>
							<SelectValue placeholder={perPage} />
						</SelectTrigger>
						<SelectContent side='top'>
							<SelectGroup>
								<SelectLabel>Baris per halaman</SelectLabel>
								<SelectSeparator />
								{[10, 25, 50, 100].map((pageSize) => (
									<SelectItem
										key={pageSize}
										value={`${pageSize}`}
										selected={pageSize === perPage}
									>
										{pageSize}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center justify-center text-sm font-medium'>
					Halaman {currentPage} dari {lastPage}
				</div>
				{children}
			</div>
		</div>
	);
}
