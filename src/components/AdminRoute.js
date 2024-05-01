// AdminRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AdminRoute = ({ element: Element, ...rest }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          // User is admin
          setCurrentUser(user);
          setIsAdmin(true);
        } else {
          // User is not admin
          setIsAdmin(false);
        }
      } else {
        // User is not signed in
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser && isAdmin ? Element : <Navigate to="/SignIn" replace />;
};

export default AdminRoute;
