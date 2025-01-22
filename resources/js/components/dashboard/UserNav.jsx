import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Button } from '@/components/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip';
import { Link } from '@inertiajs/react';
import { LayoutGrid, LogOut, User } from 'lucide-react';

export function UserNav() {
	return (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='relative h-8 w-8 rounded-full'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage
										src='#'
										alt='Avatar'
									/>
									<AvatarFallback className='bg-transparent'>ST</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side='bottom'>Profil</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>Muhammad Aziz Prasetyo</p>
						<p className='text-xs leading-none text-muted-foreground'>
							muhammadazizprasetyo@example.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className='hover:cursor-pointer'
						asChild
					>
						<Link
							href='/dashboard'
							className='flex items-center'
						>
							<LayoutGrid className='mr-3 h-4 w-4 text-muted-foreground' />
							Dashboard
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='hover:cursor-pointer'
						asChild
					>
						<Link
							href='/account'
							className='flex items-center'
						>
							<User className='mr-3 h-4 w-4 text-muted-foreground' />
							Akun
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='p-0'>
					<Button
						className='w-full'
						variant={'destructive'}
						asChild
					>
						<Link
							method='post'
							href={route('logout')}
						>
							<LogOut className='mr-3 h-4 w-4' />
							Keluar
						</Link>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
