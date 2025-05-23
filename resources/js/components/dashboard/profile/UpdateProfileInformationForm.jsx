import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function UpdateProfileInformationForm({ mustVerifyEmail, status, className, ...props }) {
	const pageErrors = usePage().props.errors;
	const { user } = usePage().props.auth;

	const form = useForm({
		defaultValues: {
			name: user.name,
			email: user.email,
		},
	});

	const { control, handleSubmit, formState, setError } = form;
	const { isSubmitting, isDirty, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.patch(getPathname('profile.update'), data, {
				preserveScroll: true,
				onSuccess: () => {
					toast.success('Berhasil memperbarui informasi profil.');
				},
				onFinish: () => resolve(),
			});
		});
	}

	useEffect(() => {
		Object.keys(pageErrors).forEach((error) => {
			setError(error, {
				type: 'server',
				message: pageErrors[error] || 'Terjadi kesalahan.',
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
					<CardTitle className='text-2xl'>Informasi Profil</CardTitle>
					<CardDescription>Perbarui informasi profil akun Anda.</CardDescription>
				</CardHeader>
				<CardContent className='p-4 sm:p-6'>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-4'>
								<FormField
									control={control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='email'>Email</FormLabel>
											<FormControl>
												<Input
													className={cn(
														errors.email &&
															'border-destructive focus-visible:ring-destructive',
													)}
													id='email'
													type='email'
													disabled
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor='name'>Nama Lengkap</FormLabel>
											<FormControl>
												<Input
													className={cn(
														errors.name &&
															'border-destructive focus-visible:ring-destructive',
													)}
													id='name'
													type='text'
													autoFocus
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{mustVerifyEmail && user.email_verified_at === null && (
									<div>
										<div
											className='space-y-2 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300'
											role='alert'
										>
											<p>Alamat email Anda belum diverifikasi.</p>
											<Button
												variant={'outline'}
												asChild
											>
												<Link
													href={route('verification.send')}
													method='post'
												>
													Kirim Ulang Tautan Verifikasi Email
												</Link>
											</Button>
										</div>
										{status === 'verification-link-sent' && (
											<div className='mt-4 text-sm font-medium text-success dark:text-success-400'>
												Berhasil mengirim tautan verifikasi baru.
											</div>
										)}
									</div>
								)}
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
