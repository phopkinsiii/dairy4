import { useUserContext } from '../contexts/UserContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';

const AuthButton = () => {
	const { state, dispatch } = useUserContext();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
	};

	return !state.user ? (
		<Link
			to="/login"
			className="flex items-center gap-2 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-2xl sm:text-base font-medium hover:bg-black/80 transition-colors duration-300 shadow-md"
		>
			<LogIn className="w-5 h-5" />
			<span>Login</span>
		</Link>
	) : (
		<button
			onClick={handleLogout}
			className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-sm sm:text-base font-medium hover:bg-red-700 transition-colors duration-300 shadow-md"
		>
			<LogOut className="w-5 h-5" />
			<span>Logout</span>
		</button>
	);
};

export default AuthButton;
