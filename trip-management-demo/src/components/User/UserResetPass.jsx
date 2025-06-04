import { useState } from 'react';
import { registerUser } from '../../api/api';

export default function UserResetPass() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
        nickname: '',
        avatarUrl: ''
    });
    const [message, setMessage] = useState(null);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        try {
            await registerUser(form);
            setMessage('Registration successful!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div id="webcrumbs">
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200">
                            <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                                <span className="material-symbols-outlined text-orange-600 text-2xl">help</span>
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Reset Password</h2>

                            <div className="text-center mb-6">
                                <p className="text-slate-600">
                                    Forgot your password? No worries! Enter your email address and we'll send you a
                                    reset link.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                                            email
                                        </span>
                                        <input
                                            type="email"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    Send Reset Link
                                </button>

                                <div className="text-center">
                                    <span className="text-slate-600">Remember your password? </span>
                                    <button
                                        type="button"
                                        className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                                    >
                                        Back to Sign In
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <span className="material-symbols-outlined text-slate-400 mt-0.5">info</span>
                                    <div className="text-sm text-slate-600">
                                        <p className="font-medium mb-1">Security Tips:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Check your spam folder for the reset email</li>
                                            <li>The reset link expires in 24 hours</li>
                                            <li>Create a strong, unique password</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Next: "Add password strength indicator and security questions" */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}