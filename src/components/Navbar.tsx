import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotateY: 180 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <motion.span
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              whileHover={{ scale: 1.05 }}
            >
              ExcelAnalyzer
            </motion.span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <motion.div
                  className="hidden md:flex items-center space-x-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    { to: '/dashboard', label: 'Dashboard' },
                    { to: '/upload', label: 'Upload' },
                    { to: '/analytics', label: 'Analytics' },
                    ...(user.role === 'admin'
                      ? [{ to: '/admin', label: 'Admin' }]
                      : []),
                  ].map((link) => (
                    <motion.div key={link.to} whileHover={{ y: -2 }}>
                      <Link
                        to={link.to}
                        className="text-white hover:text-purple-300 transition-colors relative group"
                      >
                        {link.label}
                        <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span>{user.name}</span>
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-white/20"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-white hover:bg-white/10 flex items-center space-x-2 rounded-t-xl transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 flex items-center space-x-2 rounded-b-xl transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
