import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../../redux/Slices/authSlice';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Auto-redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user type
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            
            // Simulating a login delay
            setTimeout(() => {
                const userData = { id: 1, email: formData.email, name: 'Admin', role: 'admin' };
                
                dispatch(login(userData));
                toast.success('Successfully logged in!');
                navigate('/admin');
                setIsSubmitting(false);
            }, 1000);

        } catch (err) {
            toast.error('Login failed');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4"
                        >
                            <LogIn size={32} />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
                        <p className="text-gray-500 mt-2">Sign in to manage your application</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                                    placeholder="admin@autogo.com"
                                />
                            </div>
                            {errors.email && (
                                <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-1 text-sm text-red-500 flex items-center gap-1"
                                >
                                    <AlertCircle size={14} /> {errors.email}
                                </motion.p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.password && (
                                <motion.p 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mt-1 text-sm text-red-500 flex items-center gap-1"
                                >
                                    <AlertCircle size={14} /> {errors.password}
                                </motion.p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-orange-500 text-sm font-medium transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
