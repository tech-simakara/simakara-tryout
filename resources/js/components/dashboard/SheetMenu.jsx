import { Button } from '@/components/Button';
import { Menu } from '@/components/dashboard/Menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/Sheet';
import { Link } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';

export function SheetMenu() {
	return (
		<Sheet>
			<SheetTrigger
				className='lg:hidden'
				asChild
			>
				<Button
					className='h-8'
					variant='outline'
					size='icon'
				>
					<MenuIcon size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent
				className='flex h-full flex-col px-3 sm:w-72'
				side='left'
			>
				<SheetHeader>
					<Button
						className='mt-4 flex items-center justify-center pb-2 pt-1 hover:no-underline'
						variant='link'
						asChild
					>
						<Link
							href='/dashboard'
							className='flex items-center gap-2'
						>
							<img
								src='/images/logos/simakara-logo-primary.png'
								alt='SIMAKARA Logo'
								className='mr-1 h-8 w-8'
							/>
							<SheetTitle className='font-bold text-primary'>
								SIMAKARA Tryout
							</SheetTitle>
						</Link>
					</Button>
				</SheetHeader>
				<Menu isOpen />
			</SheetContent>
		</Sheet>
	);
}
