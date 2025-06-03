import { useState } from 'react';
import { loginUser } from '../../api/api';

export default function UserLogin({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await loginUser(form);
      onLoginSuccess(res.data);  // pass user data up
      setMessage('Login successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} className="input" required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
      <button type="submit" className="btn-primary">Login</button>
      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </form>
  );
}
