// components/AdminRoute.jsx

import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext.jsx';

const AdminRoute = ({ children }) => {
  const { state } = useUserContext();

  if (!state.user) return <Navigate to="/login" />;
  if (state.user.role !== 'admin') return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
