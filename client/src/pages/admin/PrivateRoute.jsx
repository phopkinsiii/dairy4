// @ts-nocheck

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly }) => {
	const role = JSON.parse(localStorage.getItem('role'));

	if (!role) {
		return <Navigate to='/login' replace />;
	}

	if (adminOnly && role !== 'admin') {
		return <Navigate to='/products' replace />;
	}
	return children;
};

export default PrivateRoute;
