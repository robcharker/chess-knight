import { getFirestore, doc, setDoc } from "firebase/firestore";

const useCreateUser = () => {
  const db = getFirestore(); // Get the Firestore database instance

  const createUser = async (authUser, additionalData) => {
    // Destructure the user info you need
    const { uid, displayName, email, photoURL } = authUser;
    const [firstName, ...lastName] = displayName ? displayName.split(" ") : ["", ""];

    // Current timestamp in UNIX format
    const memberSince = Math.floor(Date.now() / 1000);

    // Set up the user data for Firestore
    const userData = {
      uid, // Use auth user's uid for document ID
      firstName,
      lastName: lastName.join(" "),
      email,
      photoURL,
      role: "member", // Set default role to 'member'
      tournaments: [], // Initialize tournaments array
      memberSince, // Add memberSince timestamp
      ...additionalData, // Spread any additional data you might want to include
    };

    // Reference the user's document in the users collection using the uid
    const userDocRef = doc(db, "users", uid);

    // Set the document with the specified ID
    await setDoc(userDocRef, userData);

    console.log(`User created with UID: ${uid}`);

    // Return the complete user data
    return userData;
  };

  return createUser;
};

export default useCreateUser;
