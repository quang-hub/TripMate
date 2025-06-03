import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 bg-gray-100 p-4 shadow mb-6">
      <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
      <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
      <Link to="/logout" className="text-blue-600 font-medium hover:underline">Logout</Link>
      <Link to="/update-profile" className="text-blue-600 font-medium hover:underline">Update Profile</Link>
      <Link to="/search-user" className="text-blue-600 font-medium hover:underline">Search User</Link>
    </nav>
  );
}
