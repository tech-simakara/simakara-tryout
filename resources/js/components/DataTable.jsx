import { ControlledPagination } from '@/components/ControlledPagination';
import { DataTablePagination } from '@/components/DataTablePagination';
import { DataTableViewOptions } from '@/components/DataTableViewOptions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { cn } from '@/lib/utils';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

export function DataTable({
	columns,
	data,
	handlePerPageChange,
	handlePageChange,
	pagination,
	className,
	children,
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
			<div className='flex items-center justify-between gap-2 py-4'>
				{children}
				<DataTableViewOptions table={table} />
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
			<DataTablePagination
				handlePerPageChange={handlePerPageChange}
				data={data}
				table={table}
			>
				<ControlledPagination
					handlePageChange={handlePageChange}
					pagination={pagination}
				/>
			</DataTablePagination>
		</div>
	);
}
