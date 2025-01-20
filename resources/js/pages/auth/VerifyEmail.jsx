import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Form } from '@/components/Form';
import AuthLayout from '@/layouts/AuthLayout';
import { Link, router } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

const VerifyEmail = ({ status }) => {
	const form = useForm();

	const { handleSubmit, formState, reset } = form;
	const { isSubmitting } = formState;

	async function onSubmit() {
		await new Promise(() => {
			router.post(
				route('verification.send'),
				{},
				{
					onFinish: () => reset(),
				},
			);
		});
	}

	return (
		<section className='w-full max-w-md'>
			{status === 'verification-link-sent' && (
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
					<div className='mb-4 mt-2 text-sm'>
						Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan
						saat pendaftaran.
					</div>
				</div>
			)}
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Terima Kasih</CardTitle>
				</CardHeader>
				<hr className='h-px border-0 bg-gray-200 dark:bg-gray-700' />
				<CardContent className='pt-6'>
					<div className='flex flex-col gap-4'>
						<article>
							Terima kasih sudah bergabung! Sebelum memulai, bisakah Anda
							memverifikasi alamat email Anda dengan mengklik tautan yang baru saja
							kami kirimkan melalui email? Jika Anda tidak menerima email tersebut,
							kami dengan senang hati akan mengirimkan yang baru.
						</article>
						<Form {...form}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='mt-4 flex flex-col items-center justify-end gap-4'>
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
											'Kirim Ulang Tautan Verifikasi Email'
										)}
									</Button>
									<Button
										variant={'outline'}
										className='w-full'
										asChild
									>
										<Link
											href={route('logout')}
											method='post'
										>
											Keluar
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

VerifyEmail.layout = (children) => <AuthLayout title={'Verifikasi Email'}>{children}</AuthLayout>;

export default VerifyEmail;
