import { ConfirmPasswordForm } from '@/components/auth/ConfirmPasswordForm';
import AuthLayout from '@/layouts/AuthLayout';

const ConfirmPassword = () => {
	return (
		<section className='w-full max-w-sm'>
			<ConfirmPasswordForm />
		</section>
	);
};

ConfirmPassword.layout = (children) => (
	<AuthLayout title={'Konfirmasi Kata Sandi'}>{children}</AuthLayout>
);

export default ConfirmPassword;
