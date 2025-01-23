import { Button } from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { Form } from '@/components/Form';
import { cn, getPathname } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';

export function VerifyEmailForm({ className, ...props }) {
	const form = useForm();

	const { handleSubmit, formState } = form;
	const { isSubmitting } = formState;

	async function onSubmit() {
		await new Promise((resolve) => {
			router.post(
				getPathname('verification.send'),
				{},
				{
					onFinish: () => resolve(),
				},
			);
		});
	}

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
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
		</div>
	);
}
