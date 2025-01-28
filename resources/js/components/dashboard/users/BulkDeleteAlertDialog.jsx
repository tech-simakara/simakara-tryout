import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/AlertDialog';
import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { cn, getPathname } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Loader, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function BulkDeleteAlertDialog({ table }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm();

	const { handleSubmit, formState } = form;
	const { isSubmitting } = formState;

	const selectedRows = table.getSelectedRowModel().rows;
	const totalSelected = selectedRows.length;
	const selectedIds = selectedRows.map((row) => row.original.id);

	async function onSubmit() {
		try {
			await new Promise((resolve) => {
				router.post(
					getPathname('users.destroy', { user: selectedIds[0] }),
					{
						ids: selectedIds,
						_method: 'DELETE',
					},
					{
						preserveState: true,
						preserveScroll: true,
						onError: () => {
							toast.error(`Gagal menghapus ${totalSelected} pengguna.`);
						},
						onSuccess: () => {
							toast.success(`Berhasil menghapus ${totalSelected} pengguna.`);
						},
						onFinish: () => resolve(),
					},
				);
			});
		} catch (error) {
			console.error(`Failed to delete ${totalSelected} user(s):`, error);
		} finally {
			table.resetRowSelection();
			setIsOpen(false);
		}
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button
				className='h-9 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground'
				size='sm'
				variant='outline'
				asChild
			>
				<AlertDialogTrigger>
					<Trash2 />
					Hapus ({totalSelected})
				</AlertDialogTrigger>
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus akun
						mereka dan menghilangkan data mereka dari server kita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className={cn(isSubmitting && 'pointer-events-none')}>
						Batal
					</AlertDialogCancel>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Button
								type='submit'
								variant='destructive'
								className='w-full'
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<Loader className='animate-spin duration-500' />
										Sedang memuat...
									</>
								) : (
									'Hapus'
								)}
							</Button>
						</form>
					</Form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
