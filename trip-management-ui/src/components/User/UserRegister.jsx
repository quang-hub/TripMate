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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} className="input" required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input" required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input" required />
      <input name="nickname" placeholder="Nickname" onChange={handleChange} className="input" required />
      <input name="avatarUrl" placeholder="Avatar URL" onChange={handleChange} className="input" />
      <button type="submit" className="btn-primary">Register</button>
      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </form>
  );
}
