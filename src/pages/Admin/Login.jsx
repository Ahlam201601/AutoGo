import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Car } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure } from '../../redux/Slices/authSlice';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Mock Authentication Logic
    // In a real app, you would make an API call here
    setTimeout(() => {
      if (email === 'admin@autogo.com' && password === 'admin123') {
        const mockUser = { id: 1, name: 'Admin', email: email, role: 'admin' };
        dispatch(loginSuccess(mockUser));
        toast.success('Welcome, Admin!');
        navigate('/admin');
      } else {
        dispatch(loginFailure('Invalid credentials'));
        toast.error('Incorrect email or password');
      }
    }, 1000);
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#f3f5f9] flex items-center justify-center p-4 selection:bg-orange-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-orange-500/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-orange-400/10 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/40 overflow-hidden border border-white/20">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-10 flex flex-col items-center">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-orange-900/20"
            >
              <Car className="text-orange-500 w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">AutoGo Admin</h1>
            <p className="text-orange-50 mt-1 text-center text-sm font-medium opacity-90">Secure admin access</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6 bg-white">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-orange-400 transition-all font-medium"
                  placeholder="admin@autogo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-orange-400 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Log In</span>
                </>
              )}
            </motion.button>
          </form>

          <p className="pb-8 text-center text-xs text-gray-400 font-medium">
            © 2026 AutoGo • Management Panel
          </p>
        </div>
      </motion.div>
    </div>
    </>
  );
}
