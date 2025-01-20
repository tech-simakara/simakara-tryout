import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Checkbox } from '@/components/Checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function LoginForm({ canResetPassword, className, ...props }) {
	const { errors } = usePage().props;

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	const { control, handleSubmit, formState, reset, setError } = form;
	const { isSubmitting } = formState;

	async function onSubmit(data) {
		await new Promise(() => {
			router.post(route('login'), data, {
				onFinish: () => {
					reset({ email: data.email, password: '', remember: data.remember });
				},
			});
		});
	}

	useEffect(() => {
		Object.keys(errors).forEach((error) => {
			const errorSchema = z.enum(['email', 'password', 'remember']);
			if (errorSchema.safeParse(error).success) {
				setError(error, {
					type: 'server',
					message: errors[error] || 'Terjadi kesalahan.',
				});
			}
		});
	}, [errors, setError]);

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Masuk</CardTitle>
					<CardDescription>
						Masukkan email Anda di bawah ini untuk masuk ke akun Anda.
					</CardDescription>
				</CardHeader>
				<CardContent>
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
									name='password'
									render={({ field }) => (
										<FormItem>
											<div className='flex items-center'>
												<FormLabel htmlFor='password'>Kata Sandi</FormLabel>
												{canResetPassword && (
													<Link
														href={route('password.request')}
														className='ml-auto inline-block text-sm underline-offset-4 transition hover:text-secondary hover:underline'
													>
														Lupa kata sandi?
													</Link>
												)}
											</div>
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
									name='remember'
									render={({ field }) => (
										<FormItem className='flex flex-row items-start space-y-0'>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className='ml-2 leading-none'>
												<FormLabel>Ingat saya</FormLabel>
											</div>
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
										'Masuk'
									)}
								</Button>
							</div>
							<div className='mt-4 text-center text-sm'>
								Belum memiliki akun?{' '}
								<Link
									href={route('register')}
									className='underline underline-offset-4 transition-colors hover:text-secondary'
								>
									Daftar
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
