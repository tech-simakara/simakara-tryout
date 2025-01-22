import { Button } from '@/components/Button';
import { Menu } from '@/components/dashboard/Menu';
import { SidebarToggle } from '@/components/dashboard/SidebarToggle';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export function Sidebar() {
	const sidebar = useStore(useSidebar, (x) => x);

	if (!sidebar) return null;

	const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

	return (
		<aside
			className={cn(
				'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
				!getOpenState() ? 'w-[90px]' : 'w-72',
				settings.disabled && 'hidden',
			)}
		>
			<SidebarToggle
				isOpen={isOpen}
				setIsOpen={toggleOpen}
			/>
			<div
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				className='relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800'
			>
				<Button
					className={cn(
						'mb-1 transition-transform duration-300 ease-in-out hover:no-underline',
						!getOpenState() ? 'translate-x-1' : 'translate-x-0',
					)}
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
						<h1
							className={cn(
								'overflow-x-hidden whitespace-nowrap text-lg font-bold transition-[transform,opacity] duration-300 ease-in-out',
								!getOpenState() ? 'opacity-0' : 'opacity-100',
							)}
						>
							SIMAKARA Tryout
						</h1>
					</Link>
				</Button>
				<Menu isOpen={getOpenState()} />
			</div>
		</aside>
	);
}
