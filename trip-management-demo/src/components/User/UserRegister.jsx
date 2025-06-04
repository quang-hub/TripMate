import { useState } from 'react';
import { registerUser } from '../../api/api';

export default function UserRegister() {
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
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                <span className="material-symbols-outlined text-green-600 text-2xl">person_add</span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Create Account</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Account name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="John123"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nickname
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="John Doe"
                      value={form.nickname}
                      onChange={handleChange}
                    />
                  </div>

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
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
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
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">
                      lock
                    </span>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Confirm your password"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                </div> */}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-slate-600">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Create Account
                </button>
              </form>
              {/* Next: "Add email verification step and progress indicator" */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
