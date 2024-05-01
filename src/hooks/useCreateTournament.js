import { getFirestore, collection, addDoc } from "firebase/firestore";

const useCreateTournament = () => {
  const db = getFirestore(); // Get the Firestore database instance

  const createTournament = async (tournamentData) => {
    // Validate the required tournament data
    if (!tournamentData || 
        !tournamentData.name ||
        !tournamentData.location ||
        !tournamentData.startDate ||
        !Array.isArray(tournamentData.participants)) {
      console.error("Invalid tournament data provided.");
      return;
    }

    // Prepare the data to be stored
    const dataToStore = {
      ...tournamentData,
      startDate: new Date(tournamentData.startDate).toISOString() // Convert startDate to ISO string
    };

    // Reference to the tournaments collection
    const tournamentsCollectionRef = collection(db, "tournaments");

    // Add the tournament document to Firestore with an auto-generated ID
    try {
      const docRef = await addDoc(tournamentsCollectionRef, dataToStore);
      console.log(`Tournament created with ID: ${docRef.id}`);
      return docRef.id; // Return the generated ID
    } catch (error) {
      console.error('Error creating tournament:', error);
      return null;
    }
  };

  return createTournament;
};

export default useCreateTournament;
