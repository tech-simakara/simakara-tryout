import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { DeleteAlertDialog } from './DeleteAlertDialog';

export function ActionsMenu({ data: user }) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDropdown = () => {
		setIsOpen(false);
	};

	return (
		<DropdownMenu
			open={isOpen}
			onOpenChange={setIsOpen}
			modal={false}
		>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='hover:bg-primary-200'
				>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Aksi</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<div className='space-y-0.5'>
					<DropdownMenuItem className='p-0'>
						<Button
							size='sm'
							variant='outline'
							className='h-7 w-full text-xs'
							asChild
						>
							<Link href={route('users.show', user)}>Lihat</Link>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='p-0'
						onSelect={(e) => e.preventDefault()}
					>
						<DeleteAlertDialog
							data={user}
							onFinish={closeDropdown}
						/>
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
