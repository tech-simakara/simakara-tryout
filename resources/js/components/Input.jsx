import * as React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff, Lock } from 'lucide-react';

const Input = React.forwardRef(
	({ className, type, startIcon, endIcon, iconProps = {}, ...props }, ref) => {
		const [show, setShow] = React.useState(false);
		const StartIcon = startIcon;
		const EndIcon = endIcon;
		const { className: iconClassName, ...iconRest } = iconProps;

		if (type === 'password') {
			return (
				<div className='relative w-full'>
					<div className='group relative flex items-center'>
						<div className='absolute left-3 flex items-center'>
							<Lock
								size={18}
								className={cn(
									'text-muted-foreground transition-colors duration-300',
									'group-focus-within:text-primary',
									iconClassName,
								)}
								{...iconRest}
							/>
						</div>
						<input
							autoComplete='off'
							type={!show ? type : 'text'}
							className={cn(
								'peer flex h-9 w-full rounded-md border border-primary bg-transparent px-10 py-1 text-sm shadow-sm transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
								className,
							)}
							ref={ref}
							{...props}
						/>
					</div>
					<button
						onClick={() => setShow((prev) => !prev)}
						className='absolute right-3 top-1/2 -translate-y-1/2 transform'
						type='button'
					>
						{show ? (
							<Eye
								className='stroke-slate-700/70'
								size={18}
							/>
						) : (
							<EyeOff
								className='stroke-slate-700/70'
								size={18}
							/>
						)}
					</button>
				</div>
			);
		}

		return (
			<div className='group relative flex items-center'>
				{StartIcon && (
					<div className='absolute left-3 top-1/2 -translate-y-1/2 transform'>
						<StartIcon
							size={18}
							className={cn(
								'pointer-events-none text-muted-foreground transition-colors duration-300 group-focus-within:text-primary',
								iconClassName,
							)}
							{...iconRest}
						/>
					</div>
				)}
				<input
					type={type}
					className={cn(
						'peer flex h-9 w-full rounded-md border border-primary bg-transparent px-3 py-1 text-sm shadow-sm transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
						startIcon ? 'pl-10' : '',
						endIcon ? 'pr-10' : '',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{EndIcon && (
					<div className='absolute right-3 top-1/2 -translate-y-1/2 transform'>
						<EndIcon
							className={cn(
								'pointer-events-none text-muted-foreground transition-colors duration-300 group-focus-within:text-primary',
								iconClassName,
							)}
							{...iconRest}
							size={18}
						/>
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
