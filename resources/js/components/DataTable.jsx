import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Input } from '@/components/Input';
import { Pagination } from '@/components/Pagination';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { cn, snakeToNormal } from '@/lib/utils';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { useState } from 'react';

export function DataTable({
	columns,
	data,
	placeholderSearch,
	valueSearch,
	onChangeSearch,
	valuePerPage,
	onValueChangePerPage,
	className,
	...props
}) {
	const [sorting, setSorting] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data: data.data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div
			className={cn(className)}
			{...props}
		>
			<div className='flex items-center gap-2 py-4'>
				<Input
					placeholder={placeholderSearch}
					value={valueSearch}
					onChange={onChangeSearch}
					className='max-w-sm'
					autoFocus
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
			<div className='flex flex-wrap items-center justify-center gap-4 py-4 sm:justify-between'>
				<div className='text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} dari{' '}
					{table.getFilteredRowModel().rows.length} baris dipilih
				</div>
				<div className='flex flex-wrap items-center justify-center gap-4 lg:gap-8'>
					<div className='flex items-center space-x-2'>
						<p className='text-sm font-medium'>Baris per halaman</p>
						<Select
							defaultValue={`${data.meta.per_page}`}
							onValueChange={onValueChangePerPage}
						>
							<SelectTrigger className='w-[70px] border border-primary'>
								<SelectValue placeholder={data.meta.per_page} />
							</SelectTrigger>
							<SelectContent side='top'>
								<SelectGroup>
									<SelectLabel>Baris per halaman</SelectLabel>
									{[10, 25, 50, 100].map((pageSize) => (
										<SelectItem
											key={pageSize}
											value={`${pageSize}`}
											selected={pageSize === data.meta.per_page}
										>
											{pageSize}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='flex items-center justify-center text-sm font-medium'>
						Halaman {data.meta.current_page} dari {data.meta.last_page}
					</div>
					<Pagination data={data} />
				</div>
			</div>
		</div>
	);
}
