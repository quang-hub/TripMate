import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/api';

export default function UserLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(form);
    navigate('/home');
  };

  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Authentication System</h1>
            <p className="text-slate-600">Complete user authentication and profile management system</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-200">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6 mx-auto">
                <span className="material-symbols-outlined text-primary-600 text-2xl">login</span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Sign In</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                      email
                    </span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Enter your email"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                      lock
                    </span>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <span className="text-slate-600">Don't have an account? </span>
                  <button
                    type="button"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              {/* Next: "Add social login buttons (Google, Facebook, Apple)" */}
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-slate-500">
              <span className="material-symbols-outlined">security</span>
              <span className="text-sm">Your data is protected with end-to-end encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
