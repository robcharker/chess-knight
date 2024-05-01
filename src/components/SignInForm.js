import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleSignInButton from './GoogleSignInButton'; // Assuming you have a GoogleSignInButton component

const SignInForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const auth = getAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful sign in
      console.log('User signed in');
      setEmail('');
      setPassword('');
      setError(null);
      onClose(); // Close the sign-in form/modal
    } catch (error) {
      // Handle errors
      console.error('Sign in error', error);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful Google sign in
      console.log('User signed in with Google');
      onClose(); // Close the sign-in form/modal
    } catch (error) {
      // Handle errors
      console.error('Google sign in error', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Sign In</button>
      <GoogleSignInButton onClick={handleGoogleSignIn} />
    </form>
  );
};

export default SignInForm;
