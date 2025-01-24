import { Button } from '@/components/Button.jsx';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useMemo } from 'react';

export function Pagination({ data }) {
	const currentParams = useMemo(() => {
		const params = new URLSearchParams(window.location.search);
		const queryObject = {};
		params.forEach((value, key) => {
			queryObject[key] = value;
		});
		return queryObject;
	}, [window.location.search]);

	const buildUrl = (baseUrl, newParams = {}) => {
		if (!baseUrl) return null;

		const url = new URL(baseUrl);
		const params = new URLSearchParams(currentParams);

		Object.entries(newParams).forEach(([key, value]) => {
			if (value === null || value === undefined) {
				params.delete(key);
			} else {
				params.set(key, value);
			}
		});

		url.search = params.toString();
		return url.toString();
	};

	const nextPage =
		data.meta.current_page < data.meta.last_page
			? data.meta.current_page + 1
			: data.meta.current_page;
	const prevPage =
		data.meta.current_page > 1 ? data.meta.current_page - 1 : data.meta.current_page;

	return (
		<div className='flex items-center space-x-1 sm:space-x-2'>
			<Button
				variant='outline'
				size='icon'
				disabled={data.meta.current_page === 1}
				asChild
			>
				<Link
					href={buildUrl(data.links.first, { page: 1 })}
					as='button'
					preserveState
				>
					<ChevronsLeft />
				</Link>
			</Button>
			<Button
				variant='outline'
				size='icon'
				disabled={!data.links.prev}
				asChild
			>
				<Link
					href={buildUrl(data.links.prev, { page: prevPage })}
					as='button'
					preserveState
				>
					<ChevronLeft />
				</Link>
			</Button>
			<Button
				variant='outline'
				size='icon'
				disabled={!data.links.next}
				asChild
			>
				<Link
					href={buildUrl(data.links.next, { page: nextPage })}
					as='button'
					preserveState
				>
					<ChevronRight />
				</Link>
			</Button>
			<Button
				variant='outline'
				size='icon'
				disabled={data.meta.current_page === data.meta.last_page}
				asChild
			>
				<Link
					href={buildUrl(data.links.last, { page: data.meta.last_page })}
					as='button'
					preserveState
				>
					<ChevronsRight />
				</Link>
			</Button>
		</div>
	);
}
