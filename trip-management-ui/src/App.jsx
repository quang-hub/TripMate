import { useState } from 'react';
import { UserProvider } from './components/User/UserContext';
import UserRegister from './components/User/UserRegister';
import UserLogin from './components/User/UserLogin';
import UserLogout from './components/User/UserLogout';
import UserProfileUpdate from './components/User/UserProfileUpdate';
import UserSearch from './components/UserSearch';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        {!currentUser && (
          <>
            <UserRegister />
            <UserLogin onLoginSuccess={setCurrentUser} />
          </>
        )}

        {currentUser && (
          <>
            <UserLogout onLogout={() => setCurrentUser(null)} />
            <UserProfileUpdate user={currentUser} />
          </>
        )}

        <UserSearch />
      </div>
    </UserProvider>
  );
}

export default App;
