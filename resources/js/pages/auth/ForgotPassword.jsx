import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/layouts/AuthLayout';

const ForgotPassword = ({ status }) => {
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
			<ForgotPasswordForm />
		</section>
	);
};

ForgotPassword.layout = (children) => <AuthLayout title={'Lupa Kata Sandi'}>{children}</AuthLayout>;

export default ForgotPassword;
