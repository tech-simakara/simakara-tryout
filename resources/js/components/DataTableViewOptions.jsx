import { Settings2 } from 'lucide-react';

import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { isValidElement } from 'react';

export function DataTableViewOptions({ table }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='ml-auto h-9 flex'
				>
					<Settings2 />
					Kolom
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Tampilkan kolom</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter(
						(column) => typeof column.accessorFn !== 'undefined' && column.getCanHide(),
					)
					.map((column) => {
						let headerText = 'unknown';
						const columnHeader = column.columnDef.header;

						if (typeof columnHeader === 'function') {
							const renderedHeader = columnHeader({ column });

							if (isValidElement(renderedHeader)) {
								headerText = renderedHeader.props.title || 'unknown';
							}
						} else if (typeof columnHeader === 'string') {
							headerText = columnHeader;
						} else if (isValidElement(columnHeader)) {
							headerText = columnHeader.props.title || 'unknown';
						}

						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{headerText}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
