import { Button } from '@/components/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/Collapsible';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function CollapseMenuButton({ icon: Icon, label, submenus, isOpen }) {
	const { url } = usePage();

	const isMenuActive = (currentUrl, href) => {
		if (currentUrl === href) return true;

		const [path] = currentUrl.split('?');
		return path === href;
	};

	const isSubmenuActive = submenus.some((submenu) =>
		submenu.active === undefined ? isMenuActive(url, submenu.href) : submenu.active,
	);

	const [isCollapsed, setIsCollapsed] = useState(isSubmenuActive);

	return isOpen ? (
		<Collapsible
			open={isCollapsed}
			onOpenChange={setIsCollapsed}
			className='w-full'
		>
			<CollapsibleTrigger
				className='mb-1 [&[data-state=open]>div>div>svg]:rotate-180'
				asChild
			>
				<Button
					variant={isSubmenuActive ? 'default' : 'ghost'}
					className='h-10 w-full justify-start'
				>
					<div className='flex w-full items-center justify-between'>
						<div className='flex items-center'>
							<span className='mr-4'>
								<Icon size={18} />
							</span>
							<p
								className={cn(
									'max-w-[150px] transition-[colors,opacity] duration-300',
									isOpen ? 'opacity-100' : 'opacity-0',
								)}
							>
								{label}
							</p>
						</div>
						<div
							className={cn(
								'whitespace-nowrap transition-[colors,opacity] duration-300',
								isOpen ? 'opacity-100' : 'opacity-0',
							)}
						>
							<ChevronDown
								size={18}
								className='transition-transform duration-300'
							/>
						</div>
					</div>
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className='ml-4 overflow-hidden border-l pl-2 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
				{submenus.map(({ href, label, active }, index) => (
					<Button
						key={index}
						variant={
							(active === undefined && isMenuActive(url, href)) || active
								? 'default'
								: 'ghost'
						}
						className={cn(
							'mb-1 h-10 w-full justify-start',
							(active === undefined && isMenuActive(url, href)) || active
								? 'bg-primary-100 text-foreground hover:bg-primary-200'
								: '',
						)}
						asChild
					>
						<Link href={href}>
							<p
								className={cn(
									'ml-2 max-w-[170px] transition-[colors,opacity] duration-300',
									isOpen ? 'opacity-100' : 'opacity-0',
								)}
							>
								{label}
							</p>
						</Link>
					</Button>
				))}
			</CollapsibleContent>
		</Collapsible>
	) : (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant={isSubmenuActive ? 'default' : 'ghost'}
								className='mb-1 h-10 w-full justify-start'
							>
								<div className='flex w-full items-center justify-between'>
									<div className='flex items-center'>
										<span className={cn(isOpen === false ? '' : 'mr-4')}>
											<Icon size={18} />
										</span>
										<p
											className={cn(
												'max-w-[200px] transition-[colors,opacity] duration-300',
												isOpen === false ? 'opacity-0' : 'opacity-100',
											)}
										>
											{label}
										</p>
									</div>
								</div>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent
						side='right'
						align='start'
						alignOffset={2}
					>
						{label}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent
				side='right'
				sideOffset={25}
				align='start'
			>
				<DropdownMenuLabel className='max-w-[190px]'>{label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{submenus.map(({ href, label, active }, index) => (
					<DropdownMenuItem
						key={index}
						asChild
					>
						<Link
							className={cn(
								'cursor-pointer',
								((active === undefined && isMenuActive(url, href)) || active) &&
									'bg-primary text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground',
							)}
							href={href}
						>
							<p className='max-w-[180px]'>{label}</p>
						</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuArrow className='fill-border' />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
