import { RegisterForm } from '@/components/auth/RegisterForm';
import AuthLayout from '@/layouts/AuthLayout';

const Register = () => {
	return (
		<section className='w-full max-w-sm'>
			<RegisterForm />
		</section>
	);
};

Register.layout = (children) => <AuthLayout title={'Daftar'}>{children}</AuthLayout>;

export default Register;
