import { useState } from 'react';
import { searchUsers } from '../api/api';

export default function UserSearch() {
  const [nickname, setNickname] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await searchUsers(nickname);
      setResults(res.data.data || []);
      if (!res.data.data.length) setMessage('No users found');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Search failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Search by nickname"
          className="input flex-grow"
        />
        <button type="submit" className="btn-primary ml-2">Search</button>
      </form>
      {message && <p className="text-center text-gray-600">{message}</p>}
      <ul>
        {results.map(u => (
          <li key={u.id} className="p-2 border-b flex items-center space-x-4">
            <img src={u.avatarUrl || '/default-avatar.png'} alt={u.nickname} className="w-10 h-10 rounded-full" />
            <span>{u.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
