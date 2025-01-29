import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Card, CardContent, CardHeader } from '@/components/Card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip.jsx';
import { getInitials } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { BadgeAlert, BadgeCheck } from 'lucide-react';

export default function UserDetailsCard({ user }) {
	const { url } = usePage();
	console.log('url:', url);
	console.log('route:', route('users.index'));
	return (
		<Card className='w-full max-w-2xl rounded-none border-none shadow-none'>
			<CardHeader className='flex flex-col items-center gap-4 p-4 sm:flex-row sm:p-6'>
				<Avatar className='h-24 w-24 sm:h-32 sm:w-32'>
					<AvatarImage
						src={user.profileImage}
						alt={user.name}
					/>
					<AvatarFallback className='text-2xl font-bold sm:text-4xl'>
						{getInitials(user.name)}
					</AvatarFallback>
				</Avatar>
				<div className='space-y-1 text-center sm:text-left'>
					<h2 className='text-lg font-bold sm:text-2xl'>{user.name}</h2>
					<div className='flex items-center space-x-1'>
						<p className='text-muted-foreground'>{user.email}</p>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									{user.email_verified_at ? (
										<BadgeCheck className='h-5 w-5 rounded-full bg-success p-0.5 text-white' />
									) : (
										<BadgeAlert className='h-5 w-5 rounded-full bg-warning p-0.5 text-white' />
									)}
								</TooltipTrigger>
								{user.email_verified_at ? (
									<TooltipContent className='bg-success'>
										<p>Verified</p>
									</TooltipContent>
								) : (
									<TooltipContent className='bg-warning'>
										<p>Unverified</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className='flex flex-wrap justify-center gap-1 sm:justify-start'>
						{user.roles.map((role, key) => (
							<Badge
								key={key}
								variant={
									role.name === 'administrator'
										? 'default'
										: role.name === 'maintainer'
											? 'secondary'
											: 'turquoise'
								}
							>
								{role.label}
							</Badge>
						))}
					</div>
				</div>
			</CardHeader>
			<hr className='mb-4 h-px border-0 bg-gray-200 dark:bg-gray-700 sm:mb-6' />
			<CardContent className='p-4 pt-0 sm:p-6 sm:pt-0'>
				<div className='grid gap-4'>
					<div className='space-y-1'>
						<h3 className='font-semibold'>Email Diverifikasi</h3>
						<p>{user.email_verified_at ?? '-'}</p>
					</div>
					<div className='space-y-1'>
						<h3 className='font-semibold'>Akun Dibuat</h3>
						<p>{user.created_at}</p>
					</div>
					<div className='space-y-1'>
						<h3 className='font-semibold'>Profil Diperbarui</h3>
						<p>{user.updated_at}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
