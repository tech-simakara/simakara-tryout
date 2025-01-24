import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { Link } from '@inertiajs/react';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const userColumns = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				className='bg-white'
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Pilih Semua'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Pilih Baris'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<div>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Nama Lengkap
						<ArrowUpDown />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			return <span className='ml-4 line-clamp-1'>{row.getValue('name')}</span>;
		},
		enableHiding: false,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<div>
					<Button
						variant='ghost'
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Email
						<ArrowUpDown />
					</Button>
				</div>
			);
		},
		cell: ({ row }) => {
			return <span className='ml-4 line-clamp-1'>{row.getValue('email')}</span>;
		},
		enableHiding: false,
	},
	{
		accessorKey: 'roles',
		header: 'Peran',
		cell: ({ row }) => {
			return (
				<div>
					{row.getValue('roles').map((role, key) => (
						<Badge
							key={key}
							variant={
								role.name === 'administrator'
									? 'default'
									: role.name === 'maintainer'
										? 'secondary'
										: 'turquoise'
							}
						>
							{role.label}
						</Badge>
					))}
				</div>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'email_verified_at',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Tanggal Diverifikasi
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div className='ml-4'>
					{row.getValue('email_verified_at') ? (
						row.getValue('email_verified_at')
					) : (
						<Badge variant='warning'>Unverified</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: 'created_at',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Tanggal Dibuat
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <span className='ml-4'>{row.getValue('created_at')}</span>;
		},
	},
	{
		accessorKey: 'updated_at',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Tanggal Diperbarui
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <span className='ml-4'>{row.getValue('updated_at')}</span>;
		},
	},
	{
		id: 'actions',
		header: 'Aksi',
		cell: ({ row }) => {
			const user = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='hover:bg-primary-200'
						>
							<span className='sr-only'>Open Menu</span>
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
							<DropdownMenuItem className='p-0'>
								<Button
									size='sm'
									variant='secondary'
									className='h-7 w-full text-xs'
									asChild
								>
									<Link href={route('users.edit', user)}>Edit</Link>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem className='p-0'>
								<Button
									size='sm'
									variant={'destructive'}
									className='h-7 w-full text-xs'
									asChild
								>
									<Link
										method='delete'
										href={route('users.destroy', user)}
									>
										Hapus
									</Link>
								</Button>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];
