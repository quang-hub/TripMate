import { useState, useEffect } from 'react';
import { updateUserProfile } from '../../api/api';

export default function UserProfileUpdate({ user }) {
  const [form, setForm] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    email: '',
    nickname: '',
    avatarUrl: ''
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        nickname: user.nickname || '',
        avatarUrl: user.avatarUrl || '',
        oldPassword: '',
        newPassword: ''
      });
    }
  }, [user]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    try {
      await updateUserProfile(form);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <input name="username" placeholder="Username" value={form.username} disabled className="input" />
      <input type="password" name="oldPassword" placeholder="Old Password" onChange={handleChange} className="input" />
      <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} className="input" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
      <input name="nickname" placeholder="Nickname" value={form.nickname} onChange={handleChange} className="input" />
      <input name="avatarUrl" placeholder="Avatar URL" value={form.avatarUrl} onChange={handleChange} className="input" />
      <button type="submit" className="btn-primary">Update Profile</button>
      {message && <p className="mt-2 text-center text-green-600">{message}</p>}
    </form>
  );
}
