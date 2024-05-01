// useUpdateRole.js
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const useUpdateRole = () => {
  const db = getFirestore(); // Get the Firestore database instance

  const updateRole = async (uid, newRole) => {
    // Validate the new role
    const validRoles = ["member", "admin", "moderator"];
    if (!validRoles.includes(newRole)) {
      console.error("Invalid role. Role must be 'member', 'admin', or 'moderator'.");
      return;
    }

    // Reference to the user document in the Firestore collection
    const userRef = doc(db, "users", uid);

    // Update the role field in the user document
    await updateDoc(userRef, { role: newRole })
      .then(() => console.log(`Role updated to ${newRole} for user with UID: ${uid}`))
      .catch((error) => console.error('Error updating role:', error));
  };

  return updateRole;
};

export default useUpdateRole;
