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
		<div className='flex w-full flex-col items-center justify-between gap-4 xl:flex-row'>
			<div className='flex w-full flex-1 justify-between gap-4'>
				<div className='flex min-w-[80px] max-w-16 flex-1 items-center text-sm text-muted-foreground sm:max-w-none'>
					{table.getFilteredSelectedRowModel().rows.length} dari {totalRows} baris
					dipilih.
				</div>
				<div className='flex items-center space-x-2'>
					<p className='max-w-16 text-sm font-medium sm:max-w-none'>Baris per halaman</p>
					<Select
						defaultValue={`${perPage}`}
						onValueChange={handlePerPageChange}
					>
						<SelectTrigger className='w-[80px] border border-primary'>
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
			</div>
			<div className='flex flex-col items-center gap-x-6 gap-y-4 xl:flex-row xl:gap-x-8'>
				<div className='flex flex-col items-center gap-x-8 gap-y-4 xl:flex-row'>
					<div className='flex-shrink-0 text-center text-sm font-medium'>
						Halaman {currentPage} dari {lastPage}
					</div>
					<Pagination className='mx-0'>
						<PaginationContent className='grid gap-2'>
							<div className='col-start-2 row-start-1 flex justify-center gap-1 sm:col-start-1 sm:row-start-1'>
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
							</div>
							<div className='col-span-3 row-start-2 flex justify-center gap-1 sm:col-span-1 sm:col-start-2 sm:row-start-1'>
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
												size={'icon'}
												onClick={handlePageChange(page)}
											>
												{page}
											</Button>
										</PaginationItem>
									);
								})}
							</div>
							<div className='col-start-2 row-start-3 flex justify-center gap-1 sm:col-start-3 sm:row-start-1'>
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
							</div>
						</PaginationContent>
					</Pagination>
				</div>
			</div>
		</div>
	);
}
