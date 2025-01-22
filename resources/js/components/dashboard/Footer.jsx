import { Link } from '@inertiajs/react';

export function Footer() {
	return (
		<div className='z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='mx-4 flex h-14 items-center sm:mx-8'>
				<p className='text-left text-xs leading-loose text-muted-foreground sm:text-sm'>
					© 2025{' '}
					<Link
						href='https://simakara.id'
						target='_blank'
						rel='noopener noreferrer'
						className='font-medium underline underline-offset-4'
					>
						SIMAKARA
					</Link>
					. All rights reserved
				</p>
			</div>
		</div>
	);
}
