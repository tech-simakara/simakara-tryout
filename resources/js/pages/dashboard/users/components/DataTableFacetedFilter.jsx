import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover';
import { Separator } from '@/components/Separator';
import { cn } from '@/lib/utils';
import { Check, PlusCircle } from 'lucide-react';

export function DataTableFacetedFilter({ column, title, options }) {
	const selectedValues = new Set(column?.getFilterValue());

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='h-9 border-dashed'
				>
					<PlusCircle />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator
								orientation='vertical'
								className='mx-2 h-4'
							/>
							<Badge
								variant='secondary'
								className='rounded-sm px-1 font-normal lg:hidden'
							>
								{selectedValues.size}
							</Badge>
							<div className='hidden space-x-1 lg:flex'>
								{selectedValues.size > 2 ? (
									<Badge className='rounded-sm px-1 font-normal'>
										{selectedValues.size} terpilih
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.name))
										.map((option) => (
											<Badge
												variant={option.variant}
												key={option.name}
												className='rounded-sm px-1 font-normal'
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-[200px] p-0'
				align='start'
			>
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.name);
								return (
									<CommandItem
										key={option.name}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.name);
											} else {
												selectedValues.add(option.name);
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(
												filterValues.length ? filterValues : undefined,
											);
										}}
									>
										<div
											className={cn(
												'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
												isSelected
													? 'bg-primary text-primary-foreground'
													: 'opacity-50 [&_svg]:invisible',
											)}
										>
											<Check />
										</div>
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className='justify-center text-center'
									>
										Bersihkan Filter
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
