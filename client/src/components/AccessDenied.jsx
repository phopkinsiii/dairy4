// src/pages/AccessDenied.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const AccessDenied = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <div className="absolute inset-0 opacity-10 animate-pulse z-0">
        <Logo />
      </div>

      <div className="z-10">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Access Denied</h1>
        <p className="text-gray-700 text-lg mb-6">
          You don’t have permission to view this page.
        </p>
        <p className="text-gray-500 text-sm">
          Redirecting you to the home page...
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
