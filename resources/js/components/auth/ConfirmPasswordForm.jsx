import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn, getPathname } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export function ConfirmPasswordForm({ className, ...props }) {
	const pageErrors = usePage().props.errors;

	const form = useForm({
		defaultValues: {
			password: '',
		},
	});

	const { control, handleSubmit, formState, resetField, setError } = form;
	const { isSubmitting, errors } = formState;

	async function onSubmit(data) {
		await new Promise((resolve) => {
			router.post(getPathname('password.confirm'), data, {
				preserveScroll: true,
				onFinish: () => {
					resetField('password');
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
					<CardTitle className='text-2xl'>Konfirmasi Kata Sandi</CardTitle>
				</CardHeader>
				<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
				<CardContent className='pt-6'>
					<div className='flex flex-col gap-4'>
						<article>
							Ini adalah area aman dari aplikasi. Harap konfirmasi kata sandi Anda
							sebelum melanjutkan.
						</article>
						<Form {...form}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='flex flex-col gap-4'>
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
											'Konfirmasi'
										)}
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
