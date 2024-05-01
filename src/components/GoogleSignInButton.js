// GoogleSignInButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import useCreateUser from "../hooks/useCreateUser";

const GoogleSignInButton = ({ onClose }) => {
  const navigate = useNavigate();
  const createUser = useCreateUser(); // This hook should handle creating the user document
  const db = getFirestore();

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if the user document already exists
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If user document doesn't exist, call the createUser hook
        await createUser(user);
      }

      // Redirect the user or perform some state updates
      navigate("/");
      if(onClose) onClose();
    } catch (error) {
      // Handle Errors here.
      console.error('Error during Google Sign In:', error);
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export default GoogleSignInButton;
