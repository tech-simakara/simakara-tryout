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
					className='mb-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400'
					role='alert'
				>
					<div className='flex items-center'>
						<svg
							className='me-2 h-4 w-4 flex-shrink-0'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
						</svg>
						<span className='sr-only'>Info</span>
						<h3 className='text-lg font-medium'>Tautan verifikasi terkirim</h3>
					</div>
					<div className='mb-4 mt-2 text-sm'>
						Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan
						saat pendaftaran.
					</div>
				</div>
			)}
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Terima kasih telah mendaftar!</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-4'>
						<article className='text-justify'>
							Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan
							mengklik tautan yang baru saja kami kirimkan melalui email? Jika Anda
							tidak menerima email tersebut, kami dengan senang hati akan mengirimkan
							yang baru.
						</article>
						<Form {...form}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className='mt-4 flex items-center justify-end gap-2'>
									<Button
										type='submit'
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader className='animate-spin duration-500' />
												Sedang memuat...
											</>
										) : (
											'Kirim Ulang Email Verifikasi'
										)}
									</Button>
									<Button
										variant={'outline'}
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
