import { Head } from '@inertiajs/react';

export default function AuthLayout({ children, title }) {
	return (
		<>
			<Head title={title} />
			<main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
				{children}
			</main>
		</>
	);
}
