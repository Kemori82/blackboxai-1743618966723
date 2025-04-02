import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Demon List Admin</Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Welcome, {user?.username}</span>
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:underline">
                  <i className="fas fa-cog mr-1"></i> Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;