import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronLeft, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function ForgotPasswordForm({ className, ...props }) {
	const pageErrors = usePage().props.errors;

	const form = useForm({
		defaultValues: {
			email: '',
		},
	});

	const { control, handleSubmit, formState, setError } = form;
	const { isSubmitting, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.post(getPathname('password.email'), data, {
				preserveScroll: true,
				onFinish: () => {
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
		</div>
	);
}
