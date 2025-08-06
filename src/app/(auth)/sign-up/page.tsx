'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { signup } from '@/app/service/api/Auth';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Cricket stadium ambiance animation
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.username) newErrors.username = 'Required';
        if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
        if (formData.phone.length < 10) newErrors.phone = 'Invalid phone';
        if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'No match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        const response = await signup(formData);
        if (response.status != 201) { throw new Error(response.message || 'Registration failed. Please try again.'); }
        if (!response) {
            console.error("Registration failed:", response, response.message);
            throw new Error(response.message || 'Registration failed. Please try again.');
        }
        setIsSubmitting(true);
        router.push('/sign-in')
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col lg:flex-row">
            {/* Left Column - Cricket Visuals */}
            <div className="lg:w-3/5 bg-gradient-to-b from-gray-900 to-gray-950 p-8 lg:p-12 relative overflow-hidden">
                {/* Stadium background with parallax */}
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e')] bg-cover bg-center opacity-20"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                />

                {/* Content overlay */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-white">CricketExprt</h1>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                            Join the <span className="text-blue-400">Ultimate</span> Cricket Network
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-md">
                            Access real-time analytics, player stats, and exclusive match predictions with your free account.
                        </p>
                    </div>

                    {/* Cricket features */}
                    <div className="space-y-5">
                        {[
                            { icon: '📊', title: 'Advanced Analytics', desc: 'Deep dive into player performance metrics' },
                            { icon: '🔔', title: 'Live Alerts', desc: 'Get notifications for key match events' },
                            { icon: '🏆', title: 'Fantasy Tools', desc: 'Optimize your fantasy cricket teams' }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                                <span className="text-2xl mt-1">{feature.icon}</span>
                                <div>
                                    <h3 className="font-medium text-white">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:w-3/5 bg-gray-900 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Start your cricket analytics journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-500" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => {
                                        setFormData({ ...formData, username: e.target.value });
                                        setErrors({ ...errors, username: '' });
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${errors.username ? 'border-red-500' : 'border-gray-700'
                                        } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 transition-all`}
                                    placeholder="cricketpro99"
                                />
                            </div>
                            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setErrors({ ...errors, email: '' });
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'
                                        } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 transition-all`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                Phone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="text-gray-500" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData({ ...formData, phone: e.target.value });
                                        setErrors({ ...errors, phone: '' });
                                    }}
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'
                                        } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 transition-all`}
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                        </div>

                        {/* Password fields in flex */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-500" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => {
                                            setFormData({ ...formData, password: e.target.value });
                                            setErrors({ ...errors, password: '' });
                                        }}
                                        className={`w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'
                                            } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 transition-all`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="text-gray-500 hover:text-gray-400 transition-colors" />
                                        ) : (
                                            <FiEye className="text-gray-500 hover:text-gray-400 transition-colors" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-500" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => {
                                            setFormData({ ...formData, confirmPassword: e.target.value });
                                            setErrors({ ...errors, confirmPassword: '' });
                                        }}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                                            } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-200 transition-all`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-800 border-gray-700 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                                I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${isSubmitting
                                ? 'bg-blue-700 text-blue-200 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white '
                                } transition-all`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <span>Register Now</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}