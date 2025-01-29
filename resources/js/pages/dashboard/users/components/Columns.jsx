import { Badge } from '@/components/Badge';
import { Checkbox } from '@/components/Checkbox';
import { ActionsMenu } from '@/components/dashboard/users/ActionsMenu';
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader';

export const Columns = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				className='mr-4 bg-white shadow-white'
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
				<DataTableColumnHeader
					column={column}
					title='Nama Lengkap'
				/>
			);
		},
		cell: ({ row }) => {
			return <span className='line-clamp-1'>{row.getValue('name')}</span>;
		},
		enableHiding: false,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Email'
				/>
			);
		},
		cell: ({ row }) => {
			return <span className='line-clamp-1'>{row.getValue('email')}</span>;
		},
		enableHiding: false,
	},
	{
		accessorKey: 'roles',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Peran'
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<div className='flex flex-wrap gap-1'>
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
				<DataTableColumnHeader
					column={column}
					title='Diverifikasi'
				/>
			);
		},
		cell: ({ row }) => {
			return (
				<div>
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
				<DataTableColumnHeader
					column={column}
					title='Dibuat'
				/>
			);
		},
		cell: ({ row }) => {
			return <span>{row.getValue('created_at')}</span>;
		},
	},
	{
		accessorKey: 'updated_at',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Diperbarui'
				/>
			);
		},
		cell: ({ row }) => {
			return <span>{row.getValue('updated_at')}</span>;
		},
	},
	{
		id: 'actions',
		header: ({ column }) => {
			return (
				<DataTableColumnHeader
					column={column}
					title='Aksi'
				/>
			);
		},
		cell: ({ row }) => {
			const user = row.original;

			return <ActionsMenu data={user} />;
		},
		enableSorting: false,
		enableHiding: false,
	},
];
