import { SheetMenu } from '@/components/dashboard/SheetMenu';
import { UserNav } from '@/components/dashboard/UserNav';
import { ModeToggle } from '@/components/ModeToggle';

export function Navbar({ title }) {
	return (
		<header className='sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='mx-4 flex h-14 items-center sm:mx-8'>
				<div className='flex items-center space-x-4 lg:space-x-0'>
					<SheetMenu />
					<h1 className='font-bold'>{title}</h1>
				</div>
				<div className='flex flex-1 items-center justify-end'>
					<ModeToggle />
					<UserNav />
				</div>
			</div>
		</header>
	);
}
