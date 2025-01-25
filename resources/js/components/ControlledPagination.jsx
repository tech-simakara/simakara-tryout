import { Button } from '@/components/Button';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
} from '@/components/Pagination';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export function ControlledPagination({ handlePageChange, pagination }) {
	const { current_page, last_page } = pagination;

	const getPageNumbers = () => {
		const maxPagesToShow = 5;
		const pages = [];

		if (last_page <= maxPagesToShow) {
			for (let i = 1; i <= last_page; i++) {
				pages.push(i);
			}
		} else if (current_page <= Math.ceil(maxPagesToShow / 2)) {
			for (let i = 1; i <= maxPagesToShow; i++) {
				pages.push(i);
			}
			pages.push('ellipsis-right');
		} else if (current_page >= last_page - Math.floor(maxPagesToShow / 2)) {
			pages.push('ellipsis-left');
			for (let i = last_page - (maxPagesToShow - 1); i <= last_page; i++) {
				pages.push(i);
			}
		} else {
			pages.push('ellipsis-left');
			for (let i = current_page - 2; i <= current_page + 2; i++) {
				pages.push(i);
			}
			pages.push('ellipsis-right');
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<Pagination className='w-fit'>
			<PaginationContent>
				<PaginationItem>
					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handlePageChange(1)}
						disabled={current_page === 1}
					>
						<ChevronsLeft />
					</Button>
				</PaginationItem>
				<PaginationItem>
					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handlePageChange(current_page - 1)}
						disabled={current_page === 1}
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
								variant={current_page === page ? 'default' : 'ghost'}
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
						onClick={handlePageChange(current_page + 1)}
						disabled={current_page === last_page}
					>
						<ChevronRight />
					</Button>
				</PaginationItem>
				<PaginationItem>
					<Button
						variant={'outline'}
						size={'icon'}
						onClick={handlePageChange(last_page)}
						disabled={current_page === last_page}
					>
						<ChevronsRight />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
