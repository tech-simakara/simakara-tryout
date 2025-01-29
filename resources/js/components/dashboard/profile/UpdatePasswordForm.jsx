import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function UpdatePasswordForm({ className, ...props }) {
	const pageErrors = usePage().props.errors;

	const form = useForm({
		defaultValues: {
			current_password: '',
			password: '',
			password_confirmation: '',
		},
	});

	const { control, handleSubmit, formState, resetField, setError } = form;
	const { isSubmitting, isDirty, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.put(getPathname('password.update'), data, {
				errorBag: 'updatePassword',
				preserveScroll: true,
				onSuccess: () => {
					toast.success('Berhasil memperbarui kata sandi.');
				},
				onFinish: () => {
					resetField('current_password');
					resetField('password');
					resetField('password_confirmation');
					resolve();
				},
			});
		});
	}

	useEffect(() => {
		Object.keys(pageErrors.updatePassword ?? {}).forEach((error) => {
			setError(error, {
				type: 'server',
				message: pageErrors.updatePassword[error] || 'Terjadi kesalahan.',
			});
		});
	}, [pageErrors, setError]);

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
			<Card className='rounded-none border-none shadow-none'>
				<CardHeader className='p-4 sm:p-6'>
					<CardTitle className='text-2xl'>Perbarui Kata Sandi</CardTitle>
					<CardDescription>
						Pastikan akun Anda menggunakan kata sandi yang panjang dan acak untuk
						menjaga keamanan.
					</CardDescription>
				</CardHeader>
				<CardContent className='p-4 sm:p-6'>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-4'>
								<FormField
									control={control}
									name='current_password'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='current_password'>
												Kata Sandi Saat Ini
											</FormLabel>
											<FormControl>
												<Input
													className={cn(
														errors.current_password &&
															'border-destructive focus-visible:ring-destructive',
													)}
													id='current_password'
													type='password'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='password'>
												Kata Sandi Baru
											</FormLabel>
											<FormControl>
												<Input
													className={cn(
														errors.password &&
															'border-destructive focus-visible:ring-destructive',
													)}
													id='password'
													type='password'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name='password_confirmation'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='password_confirmation'>
												Konfirmasi Kata Sandi
											</FormLabel>
											<FormControl>
												<Input
													className={cn(
														errors.password_confirmation &&
															'border-destructive focus-visible:ring-destructive',
													)}
													id='password_confirmation'
													type='password'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type='submit'
									className='w-fit self-end'
									disabled={!isDirty || isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader className='animate-spin duration-500' />
											Sedang memuat...
										</>
									) : (
										'Simpan'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
