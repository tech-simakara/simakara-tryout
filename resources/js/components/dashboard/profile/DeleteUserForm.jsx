/*import DangerButton from '@/components/DangerButton.jsx';
import InputError from '@/components/InputError.jsx';
import InputLabel from '@/components/InputLabel.jsx';
import Modal from '@/components/Modal.jsx';
import SecondaryButton from '@/components/SecondaryButton.jsx';
import TextInput from '@/components/TextInput.jsx';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
	const passwordInput = useRef();

	const {
		data,
		setData,
		delete: destroy,
		processing,
		reset,
		errors,
		clearErrors,
	} = useForm({
		password: '',
	});

	const confirmUserDeletion = () => {
		setConfirmingUserDeletion(true);
	};

	const deleteUser = (e) => {
		e.preventDefault();

		destroy(route('profile.destroy'), {
			preserveScroll: true,
			onSuccess: () => closeModal(),
			onError: () => passwordInput.current.focus(),
			onFinish: () => reset(),
		});
	};

	const closeModal = () => {
		setConfirmingUserDeletion(false);

		clearErrors();
		reset();
	};

	return (
		<section className={`space-y-6 ${className}`}>
			<header>
				<h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
					Delete Account
				</h2>

				<p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
					Once your account is deleted, all of its resources and data will be permanently
					deleted. Before deleting your account, please download any data or information
					that you wish to retain.
				</p>
			</header>

			<DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

			<Modal
				show={confirmingUserDeletion}
				onClose={closeModal}
			>
				<form
					onSubmit={deleteUser}
					className='p-6'
				>
					<h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
						Are you sure you want to delete your account?
					</h2>

					<p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
						Once your account is deleted, all of its resources and data will be
						permanently deleted. Please enter your password to confirm you would like to
						permanently delete your account.
					</p>

					<div className='mt-6'>
						<InputLabel
							htmlFor='password'
							value='Password'
							className='sr-only'
						/>

						<TextInput
							id='password'
							type='password'
							name='password'
							ref={passwordInput}
							value={data.password}
							onChange={(e) => setData('password', e.target.value)}
							className='mt-1 block w-3/4'
							isFocused
							placeholder='Password'
						/>

						<InputError
							message={errors.password}
							className='mt-2'
						/>
					</div>

					<div className='mt-6 flex justify-end'>
						<SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

						<DangerButton
							className='ms-3'
							disabled={processing}
						>
							Delete Account
						</DangerButton>
					</div>
				</form>
			</Modal>
		</section>
	);
}*/

import { Button } from '@/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/Input';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function DeleteUserForm({ className, ...props }) {
	const { errors } = usePage().props;

	const form = useForm({
		defaultValues: {
			password: '',
		},
	});

	const { control, handleSubmit, formState, reset, setError } = form;
	const { isSubmitting, isDirty } = formState;

	async function onSubmit() {
		await new Promise(() => {
			router.delete(route('profile.destroy'), {
				errorBag: 'deleteUser',
				preserveScroll: true,
				onSuccess: () => {
					toast.success('Berhasil menghapus akun.');
				},
				onFinish: () => {
					reset({ password: '' });
				},
			});
		});
	}

	useEffect(() => {
		Object.keys(errors.deleteUser || {}).forEach((error) => {
			const errorSchema = z.enum(['password']);
			if (errorSchema.safeParse(error).success) {
				setError(error, {
					type: 'server',
					message: errors.deleteUser[error] || 'Terjadi kesalahan.',
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
					<CardTitle className='text-2xl'>Hapus Akun</CardTitle>
					<CardDescription>
						Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara
						permanen. Sebelum menghapus akun Anda, harap salin data atau informasi apa
						pun yang ingin Anda simpan.
					</CardDescription>
				</CardHeader>
				<CardContent>
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
														errors.deleteUser &&
															errors.deleteUser.password &&
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
								<Button
									type='submit'
									className='w-fit self-end'
									variant='destructive'
									disabled={!isDirty || isSubmitting}
								>
									{isSubmitting ? (
										<>
											<Loader className='animate-spin duration-500' />
											Sedang memuat...
										</>
									) : (
										'Hapus Akun'
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
