import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { Loader, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function DeleteUserForm({ className, ...props }) {
	const pageErrors = usePage().props.errors;

	const form = useForm({
		defaultValues: {
			password: '',
		},
	});

	const { control, handleSubmit, formState, resetField, setError } = form;
	const { isSubmitting, isDirty, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.post(
				getPathname('profile.destroy'),
				{
					...data,
					_method: 'DELETE',
				},
				{
					errorBag: 'deleteUser',
					preserveScroll: true,
					onSuccess: () => {
						toast.success('Berhasil menghapus akun.');
					},
					onFinish: () => {
						resetField('password');
						resolve();
					},
				},
			);
		});
	}

	const handleDialogClose = (isOpen) => {
		if (!isOpen) {
			resetField('password');
		}
	};

	useEffect(() => {
		Object.keys(pageErrors.deleteUser ?? {}).forEach((error) => {
			setError(error, {
				type: 'server',
				message: pageErrors.deleteUser[error] || 'Terjadi kesalahan.',
			});
		});
	}, [pageErrors, setError]);

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
			<Card className='rounded-none border-none shadow-none'>
				<CardHeader>
					<CardTitle className='text-2xl'>Hapus Akun</CardTitle>
					<CardDescription>
						Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara
						permanen. Sebelum menghapus akun Anda, harap salin data atau informasi apa
						pun yang ingin Anda simpan.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Dialog onOpenChange={handleDialogClose}>
						<DialogTrigger asChild>
							<Button variant='destructive'>
								<Trash2 className='mr-2' /> Hapus Akun
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-lg'>
							<DialogHeader>
								<DialogTitle>
									Apakah Anda yakin ingin menghapus akun Anda?
								</DialogTitle>
								<DialogDescription>
									Setelah akun Anda dihapus, semua sumber daya dan data yang
									terkait akan dihapus secara permanen. Silakan masukkan kata
									sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun
									Anda secara permanen.
								</DialogDescription>
							</DialogHeader>
							<Form {...form}>
								<form
									id='deleteUserForm'
									onSubmit={handleSubmit(onSubmit)}
								>
									<div className='flex flex-col gap-4'>
										<FormField
											control={control}
											name='password'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Kata Sandi</FormLabel>
													<FormControl>
														<Input
															className={cn(
																errors.password &&
																	'border-destructive focus-visible:ring-destructive',
															)}
															type='password'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</form>
							</Form>
							<DialogFooter>
								<Button
									type='submit'
									className='w-fit self-end'
									form='deleteUserForm'
									variant='destructive'
									disabled={!isDirty || isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader className='animate-spin duration-500' />
											Sedang memuat...
										</>
									) : (
										<>
											<Trash2 className='mr-2' /> Hapus Akun
										</>
									)}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>
		</div>
	);
}
