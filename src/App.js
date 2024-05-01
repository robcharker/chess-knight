import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';
import AppHome from './pages/AppHome'; 
import Tournaments from './pages/Tournaments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MemberList from './pages/MemberList';
import DevTools from './pages/DevTools';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <NavigationBar user={user} onSignOut={handleSignOut} />
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute element={<AppHome />} />} />
          <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/Tournaments" element={<ProtectedRoute element={<Tournaments />} />} />
          <Route path="/Settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/MemberList" element={<ProtectedRoute element={<MemberList />} />} />
          <Route path="/DevTools" element={<ProtectedRoute element={<DevTools />} />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
