import { logoutUser } from '../../api/api';

export default function UserLogout({ onLogout }) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout();
    } catch {
      // Optional error handling
    }
  };

  return (
    <button onClick={handleLogout} className="btn-secondary">
      Logout
    </button>
  );
}
