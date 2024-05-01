import { getFirestore, collection, addDoc, updateDoc } from "firebase/firestore";
import { faker } from '@faker-js/faker';

const useCreateMockUsers = () => {
  const db = getFirestore();

  const createMockUsers = async () => {
    const usersCollectionRef = collection(db, "users");

    for (let i = 0; i < 20; i++) {
      // Randomized mock data for a user
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const mockUserData = {
        email: faker.internet.email(firstName, lastName),
        firstName: firstName,
        lastName: lastName,
        memberSince: faker.date.past().getTime(), // UNIX timestamp
        photoURL: faker.image.avatar(),
        role: 'member',
        tournaments: [], // Assuming this is an array of tournament IDs
      };

      // Create a user document with the mock data
      const userDocRef = await addDoc(usersCollectionRef, mockUserData);
      
      // After the document is created, set the uid to the document ID
      await updateDoc(userDocRef, {
        uid: userDocRef.id
      });
    }

    console.log('20 mock users have been successfully created.');
  };

  return createMockUsers;
};

export default useCreateMockUsers;
