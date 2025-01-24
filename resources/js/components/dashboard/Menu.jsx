import { Button } from '@/components/Button';
import { CollapseMenuButton } from '@/components/dashboard/CollapseMenuButton';
import { ScrollArea } from '@/components/ScrollArea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip';
import { getMenuList } from '@/lib/menu-list';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { Ellipsis, LogOut } from 'lucide-react';

export function Menu({ isOpen }) {
	const { url, component } = usePage();
	const menuList = getMenuList();

	const isMenuActive = (currentUrl, href) => {
		// Jika URL saat ini sama persis dengan href
		if (currentUrl === href) return true;

		// Jika URL saat ini mengandung query string, cocokkan hanya bagian path
		const [path] = currentUrl.split('?'); // Pisahkan path dan query string
		return path === href;
	};

	return (
		<ScrollArea className='-mr-2 [&>div>div[style]]:!block'>
			<nav className='mt-4 h-full w-full pr-2 lg:mt-8'>
				<ul className='flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]'>
					{menuList.map(({ groupLabel, menus }, index) => (
						<li
							className={cn('w-full', groupLabel ? 'pt-5' : '')}
							key={index}
						>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className='max-w-[248px] px-4 pb-2 text-sm font-medium text-muted-foreground'>
									{groupLabel}
								</p>
							) : !isOpen && true && groupLabel ? (
								<TooltipProvider>
									<Tooltip delayDuration={100}>
										<TooltipTrigger className='w-full'>
											<div className='flex w-full items-center pl-[15px]'>
												<Ellipsis className='my-px h-5 w-5' />
											</div>
										</TooltipTrigger>
										<TooltipContent side='right'>
											<p>{groupLabel}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<p className='pb-2'></p>
							)}
							{menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
								!submenus || submenus.length === 0 ? (
									<div
										className='w-full'
										key={index}
									>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={
															(active === undefined &&
																isMenuActive(url, href)) ||
															active
																? 'default'
																: 'ghost'
														}
														className='mb-1 h-10 w-full justify-start'
														asChild
													>
														<Link href={href}>
															<Icon
																className='mr-2'
																size={18}
															/>
															<p
																className={cn(
																	'max-w-[200px] transition-[colors,opacity] duration-300',
																	isOpen === false
																		? 'opacity-0'
																		: 'opacity-100',
																)}
															>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{isOpen === false && (
													<TooltipContent side='right'>
														{label}
													</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									<div
										className='w-full'
										key={index}
									>
										<CollapseMenuButton
											icon={Icon}
											label={label}
											submenus={submenus}
											isOpen={isOpen}
										/>
									</div>
								),
							)}
						</li>
					))}
					<li className='flex w-full grow items-end'>
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button
										variant={'destructive'}
										className='mt-5 h-10 w-full justify-center'
										asChild
									>
										<Link
											method='post'
											href={route('logout')}
										>
											<LogOut
												className={cn(
													'transition-all duration-300',
													isOpen === false ? '-mr-12' : 'mr-2',
												)}
												size={18}
											/>
											<p
												className={cn(
													'whitespace-nowrap transition-all duration-300',
													isOpen === false ? 'opacity-0' : 'opacity-100',
												)}
											>
												Keluar
											</p>
										</Link>
									</Button>
								</TooltipTrigger>
								{isOpen === false && (
									<TooltipContent side='right'>Keluar</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	);
}
