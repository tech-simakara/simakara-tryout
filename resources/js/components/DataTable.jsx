import { Button } from '@/components/Button.jsx';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu.jsx';
import { Input } from '@/components/Input.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { cn, getPathname, snakeToNormal } from '@/lib/utils.js';
import { Link, router } from '@inertiajs/react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings2 } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select.jsx';

export function DataTable({
	columns,
	data,
	placeholderSearch,
	valueSearch,
	onChangeSearch,
	className,
	...props
}) {
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data: data.data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handlePerPageChange = (perPage) => {
		router.get(
			getPathname('users.index'),
			{ per_page: perPage },
			{ only: ['users'] }
		);
	};

	return (
		<div
			className={cn(className)}
			{...props}
		>
			<div className='flex items-center py-4 gap-2'>
				<Input
					placeholder={placeholderSearch}
					value={valueSearch}
					onChange={onChangeSearch}
					className='max-w-sm'
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='ml-auto'
						>
							<>
								<Settings2 /> Kolom
							</>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{snakeToNormal(column.id)}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='overflow-hidden rounded-md border'>
				<Table>
					<TableHeader className='h-14 bg-primary'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className='font-bold text-white'
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									Tidak ada hasil.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex flex-wrap items-center justify-center sm:justify-between py-4 gap-4'>
				<div className='text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} dari{' '}
					{table.getFilteredRowModel().rows.length} baris dipilih
				</div>
				<div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
					{/*<div className="flex items-center space-x-2">
						<p className="text-sm font-medium">Baris per halaman</p>
						<Select
							defaultValue={'10'}
							onValueChange={(value) => handlePerPageChange(value)}
						>
							<SelectTrigger className="w-[70px] border border-primary">
								<SelectValue placeholder={table.getState().pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								{[10, 25, 50, 100].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>*/}
					<div className='flex items-center justify-center text-sm font-medium'>
						Halaman {data.meta.current_page} dari {data.meta.last_page}
					</div>
					<div className='flex items-center space-x-1 sm:space-x-2'>
						<Button
							variant='outline'
							size='icon'
							disabled={data.meta.current_page === 1}
							asChild
						>
							<Link
								href={data.links.first}
								as='button'
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
								href={data.links.prev}
								as='button'
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
								href={data.links.next}
								as='button'
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
								href={data.links.last}
								as='button'
							>
								<ChevronsRight />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
