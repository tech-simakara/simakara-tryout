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
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function DeleteAlertDialog({ data: user, onFinish }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm();

	const { handleSubmit, formState } = form;
	const { isSubmitting } = formState;

	async function onSubmit() {
		try {
			await new Promise((resolve) => {
				router.delete(getPathname('users.destroy', user), {
					preserveState: true,
					preserveScroll: true,
					onError: () => {
						toast.error(`Gagal menghapus pengguna (${user.name}).`);
					},
					onSuccess: () => {
						toast.success(`Berhasil menghapus pengguna (${user.name}).`);
					},
					onFinish: () => resolve(),
				});
			});
		} catch (error) {
			console.error(`Failed to delete user (${user.name}):`, error);
		} finally {
			setIsOpen(false);
			onFinish();
		}
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<Button
				size='sm'
				variant={'destructive'}
				className='h-7 w-full text-xs'
				onSelect={(e) => e.preventDefault()}
				asChild
			>
				<AlertDialogTrigger>Hapus</AlertDialogTrigger>
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan. Ini akan secara permanen menghapus akun{' '}
						<span className='font-bold'>{user.name}</span> dan menghilangkan data
						tersebut dari server kita.
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
								variant={'destructive'}
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
