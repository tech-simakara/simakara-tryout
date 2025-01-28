import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/Button';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from '@/components/Pagination';
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
import { useUserFilterStore } from '@/hooks/use-filters';

export function DataTablePagination({ table, pagination }) {
	const { setPerPage, setPage, makeRequest } = useUserFilterStore();
	const {
		total: totalRows,
		current_page: currentPage,
		last_page: lastPage,
		per_page: perPage,
	} = pagination;

	const handlePerPageChange = (value) => {
		setPerPage(value);
		makeRequest({ per_page: value, page: null });
	};

	const pageHandler = (page) => {
		setPage(page);
		makeRequest({ page });
	};

	const handlePageChange = (page) => () => pageHandler(page);

	const getPageNumbers = () => {
		const maxPagesToShow = 5;
		const pages = [];

		if (lastPage <= maxPagesToShow) {
			for (let i = 1; i <= lastPage; i++) {
				pages.push(i);
			}
		} else if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
			for (let i = 1; i <= maxPagesToShow; i++) {
				pages.push(i);
			}
			pages.push('ellipsis-right');
		} else if (currentPage >= lastPage - Math.floor(maxPagesToShow / 2)) {
			pages.push('ellipsis-left');
			for (let i = lastPage - (maxPagesToShow - 1); i <= lastPage; i++) {
				pages.push(i);
			}
		} else {
			pages.push('ellipsis-left');
			for (let i = currentPage - 2; i <= currentPage + 2; i++) {
				pages.push(i);
			}
			pages.push('ellipsis-right');
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className='no-scrollbar flex items-center justify-between space-x-6 overflow-x-scroll p-0.5'>
			<div className='min-w-[80px] text-sm text-muted-foreground'>
				{table.getFilteredSelectedRowModel().rows.length} dari {totalRows} baris dipilih.
			</div>
			<div className='flex items-center space-x-6 lg:space-x-8'>
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
				<Pagination className='w-fit'>
					<PaginationContent>
						<PaginationItem>
							<Button
								variant={'outline'}
								size={'icon'}
								onClick={handlePageChange(1)}
								disabled={currentPage === 1}
							>
								<ChevronsLeft />
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								variant={'outline'}
								size={'icon'}
								onClick={handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ChevronLeft />
							</Button>
						</PaginationItem>
						{pageNumbers.map((page, index) => {
							if (page === 'ellipsis-left' || page === 'ellipsis-right') {
								return (
									<PaginationItem key={`ellipsis-${index}`}>
										<PaginationEllipsis />
									</PaginationItem>
								);
							}

							return (
								<PaginationItem key={page}>
									<Button
										variant={currentPage === page ? 'default' : 'ghost'}
										onClick={handlePageChange(page)}
									>
										{page}
									</Button>
								</PaginationItem>
							);
						})}
						<PaginationItem>
							<Button
								variant={'outline'}
								size={'icon'}
								onClick={handlePageChange(currentPage + 1)}
								disabled={currentPage === lastPage}
							>
								<ChevronRight />
							</Button>
						</PaginationItem>
						<PaginationItem>
							<Button
								variant={'outline'}
								size={'icon'}
								onClick={handlePageChange(lastPage)}
								disabled={currentPage === lastPage}
							>
								<ChevronsRight />
							</Button>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
