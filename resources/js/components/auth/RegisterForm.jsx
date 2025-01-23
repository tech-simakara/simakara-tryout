import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function RegisterForm({ className, ...props }) {
	const pageErrors = usePage().props.errors;

	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
	});

	const { control, handleSubmit, formState, resetField, setError } = form;
	const { isSubmitting, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.post(getPathname('register'), data, {
				preserveScroll: true,
				onFinish: () => {
					resetField('password');
					resetField('password_confirmation');
					resolve();
				},
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
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Daftar</CardTitle>
					<CardDescription>
						Masukkan data Anda di bawah ini untuk membuat akun baru.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-4'>
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
											<FormLabel htmlFor='password'>Kata Sandi</FormLabel>
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
									className='w-full'
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader className='animate-spin duration-500' />
											Sedang memuat...
										</>
									) : (
										'Daftar'
									)}
								</Button>
							</div>
							<div className='mt-4 text-center text-sm'>
								Sudah memiliki akun?{' '}
								<Link
									href={route('login')}
									className='underline underline-offset-4 transition-colors hover:text-secondary'
								>
									Masuk
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
