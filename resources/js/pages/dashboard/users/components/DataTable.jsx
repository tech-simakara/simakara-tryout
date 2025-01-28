import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/Table';
import { cn } from '@/lib/utils';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DataTablePagination } from './DataTablePagination';
import { DataTableToolbar } from './DataTableToolbar';

export function DataTable({ data, pagination, columns, className, ...props }) {
	const [sorting, setSorting] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable({
		data,
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
			className={cn('max-w-7xl space-y-4', className)}
			{...props}
		>
			<DataTableToolbar table={table} />
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
									className='h-48 text-center'
								>
									<img
										src='/images/placeholders/placeholder-no-data.png'
										alt='Not Found'
										className='mx-auto w-20'
									/>
									Tidak ada hasil.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination
				table={table}
				pagination={pagination}
			/>
		</div>
	);
}
