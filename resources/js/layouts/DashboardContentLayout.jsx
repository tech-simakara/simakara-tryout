import { Navbar } from '@/components/dashboard/Navbar';

export function DashboardContentLayout({ title, children }) {
	return (
		<>
			<Navbar title={title} />
			<div className='px-4 pb-8 pt-8 sm:px-8'>{children}</div>
		</>
	);
}
