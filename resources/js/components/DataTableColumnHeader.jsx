import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';

import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { cn } from '@/lib/utils';

export function DataTableColumnHeader({ column, title, className, ...props }) {
	if (!column.getCanSort()) {
		return (
			<div
				className={cn(className)}
				{...props}
			>
				{title}
			</div>
		);
	}

	return (
		<div
			className={cn('flex items-center space-x-2', className)}
			{...props}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						className='h-8 text-sm data-[state=open]:bg-accent data-[state=open]:text-foreground'
					>
						<span>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : (
							<ChevronsUpDown />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<ArrowUp className='h-3.5 w-3.5 text-muted-foreground/70' />
						Naik
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<ArrowDown className='h-3.5 w-3.5 text-muted-foreground/70' />
						Turun
					</DropdownMenuItem>
					{column.getCanHide() && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
								<EyeOff className='h-3.5 w-3.5 text-muted-foreground/70' />
								Hide
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
