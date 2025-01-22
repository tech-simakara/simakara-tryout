import { Card, CardContent } from '@/components/Card';

export function PlaceholderContent() {
	return (
		<Card className='mt-6 rounded-lg border-none'>
			<CardContent className='p-6'>
				<div className='flex min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] items-center justify-center'>
					<div className='relative flex flex-col'>
						<img
							src='/images/placeholders/placeholder-content.png'
							alt='Placeholder Image'
							width={400}
							height={400}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
