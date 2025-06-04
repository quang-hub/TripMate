import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TripList from './components/Trip/TripList';
import UserLogin from './components/User/UserLogin';
import UserRegister from './components/User/UserRegister';
import Navbar from './components/Navbar';
import Component from './components/component';
import './App.css';
import UserProfileUpdate from './components/User/UserProfileUpdate';
import UserResetPass from './components/User/UserResetPass';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/profile" element={<UserProfileUpdate />} />
        <Route path="/reset-pass" element={<UserResetPass />} />
        <Route path="/home" element={<Component />} />
        <Route path="/my-trip" element={<TripList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
