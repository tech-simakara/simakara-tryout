import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import AuthLayout from '@/layouts/AuthLayout';
import { cn } from '@/lib/utils.js';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ForgotPassword = ({ status }) => {
	const { errors } = usePage().props;

	const form = useForm({
		defaultValues: {
			email: '',
		},
	});

	const { control, handleSubmit, formState, reset, setError } = form;
	const { isSubmitting } = formState;

	async function onSubmit(data) {
		await new Promise(() => {
			router.post(route('password.email'), data, {
				onFinish: () => {
					reset({ email: data.email });
				},
			});
		});
	}

	useEffect(() => {
		Object.keys(errors).forEach((error) => {
			const errorSchema = z.enum(['email']);
			if (errorSchema.safeParse(error).success) {
				setError(error, {
					type: 'server',
					message: errors[error] || 'Terjadi kesalahan.',
				});
			}
		});
	}, [errors, setError]);

	return (
		<section className='w-full max-w-sm'>
			{status && (
				<div
					className='mb-4 rounded-lg bg-success-100 p-4 text-success-800 dark:bg-gray-800 dark:text-success-400'
					role='alert'
				>
					<div className='flex items-center'>
						<svg
							className='me-2 h-4 w-4 flex-shrink-0'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								fillRule='evenodd'
								d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z'
								clipRule='evenodd'
							/>
						</svg>
						<span className='sr-only'>Success</span>
						<h3 className='text-lg font-medium'>Tautan terkirim</h3>
					</div>
					<div className='mb-4 mt-2 text-sm'>{status}</div>
				</div>
			)}
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Lupa Kata Sandi</CardTitle>
				</CardHeader>
				<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
				<CardContent className='pt-6'>
					<div className='flex flex-col gap-4'>
						<article>
							Lupa kata sandi Anda? Tidak masalah. Beri tahu kami alamat email Anda,
							dan kami akan mengirimkan tautan pengaturan ulang kata sandi yang
							memungkinkan Anda memilih kata sandi baru.
						</article>
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
											'Kirim Tautan Reset Kata Sandi'
										)}
									</Button>
									<Button
										variant={'ghost'}
										className='w-full'
										asChild
									>
										<Link href={route('login')}>
											<ChevronLeft /> Halaman Masuk
										</Link>
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</CardContent>
			</Card>
		</section>
	);
};

ForgotPassword.layout = (children) => <AuthLayout title={'Lupa Kata Sandi'}>{children}</AuthLayout>;

export default ForgotPassword;
