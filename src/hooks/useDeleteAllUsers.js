import { getFirestore, collection, getDocs, writeBatch } from "firebase/firestore";

const useDeleteAllUsers = () => {
  const db = getFirestore();

  const deleteAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);
    const batch = writeBatch(db);

    usersSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    try {
      await batch.commit();
      console.log('All users have been successfully deleted.');
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return deleteAllUsers;
};

export default useDeleteAllUsers;