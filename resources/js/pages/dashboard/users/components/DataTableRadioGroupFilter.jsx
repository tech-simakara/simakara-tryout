import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { PlusCircle } from 'lucide-react';

export function DataTableRadioGroupFilter({ column, title, options }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='h-9 border-dashed focus-visible:ring-0'
				>
					<PlusCircle />
					{title}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={column.getFilterValue()}
					onValueChange={(value) => column.setFilterValue(value)}
				>
					{options.map((option) => (
						<DropdownMenuRadioItem
							key={option.value}
							value={option.value}
							className='[&_svg]:size-3 [&_svg]:rounded-full [&_svg]:ring-1 [&_svg]:ring-primary [&_svg]:ring-offset-1 [&_svg]:data-[state=checked]:text-primary'
						>
							{option.label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
