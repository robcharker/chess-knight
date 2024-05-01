import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { format } from 'date-fns';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        console.log(user.uid);

        getDoc(userDocRef)
          .then((doc) => {
            if (doc.exists()) {
              setUserProfile(doc.data());
            } else {
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.error('Error fetching user document:', error);
          });
      }
    });

    // Clean up the listener on component unmount
    return unsubscribe;
  }, []);

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  // Convert the UNIX timestamp to a readable date format
  const memberSinceDate = format(new Date(userProfile.memberSince * 1000), 'MMMM do, yyyy');

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3" style={{margin: "0px 0px"}}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Profile</h5>
              <div className="card-text">
                <img src={userProfile.photoURL} alt="Profile" className="img-fluid rounded-circle"/>
              </div>
              <p className="card-text">Email: {userProfile.email}</p>
              <p className="card-text">First Name: {userProfile.firstName}</p>
              <p className="card-text">Last Name: {userProfile.lastName}</p>
              <p className="card-text">UID: {userProfile.uid}</p>
              <p className="card-text">Member Since: {memberSinceDate}</p> {/* Display the formatted date */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
