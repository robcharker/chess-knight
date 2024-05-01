import { getFirestore, collection, getDocs, writeBatch } from "firebase/firestore";

const useDeleteAllTournaments = () => {
  const db = getFirestore();

  const deleteAllTournaments = async () => {
    const tournamentsCollectionRef = collection(db, "tournaments");
    const tournamentsSnapshot = await getDocs(tournamentsCollectionRef);
    const batch = writeBatch(db);

    tournamentsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    try {
      await batch.commit();
      console.log('All tournaments have been successfully deleted.');
    } catch (error) {
      console.error('Error deleting tournaments:', error);
    }
  };

  return deleteAllTournaments;
};

export default useDeleteAllTournaments;
