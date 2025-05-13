import { useUserContext } from '../contexts/UserContext';

const UserGreeting = () => {
	const { state } = useUserContext();

	if (!state.user || !state.user.name) return null;

	return (
		<div className='flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm sm:text-base font-medium shadow-lg'>
			<span>
				Welcome,{' '}
				<span className='uppercase font-semibold'>{state.user.name}</span>
			</span>
			{state.user.role === 'admin' && (
				<span className='text-xs bg-white text-black px-2 py-0.5 rounded-full uppercase font-bold tracking-wide'>
					Admin
				</span>
			)}
		</div>
	);
};

export default UserGreeting;
