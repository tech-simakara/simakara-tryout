import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import AuthLayout from '@/layouts/AuthLayout';

const ResetPassword = ({ token, email }) => {
	return (
		<section className='w-full max-w-sm'>
			<ResetPasswordForm
				token={token}
				email={email}
			/>
		</section>
	);
};

ResetPassword.layout = (children) => <AuthLayout title={'Reset Kata Sandi'}>{children}</AuthLayout>;

export default ResetPassword;
