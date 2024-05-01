import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Accordion } from 'react-bootstrap';
import { format } from 'date-fns'; // Import the format function
import RoleUpdateDropdown from './RoleUpdateDropdown';

const ListOfMembers = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, [db]);

  return (
    <Accordion defaultActiveKey="0" style={{maxWidth: "750px", marginTop: "40px"}}>
      {users.map((user, index) => {
        // Format the memberSince date for each user
        const memberSinceDate = format(new Date(user.memberSince * 1000), 'MMMM do, yyyy');

        return (
          <Accordion.Item eventKey={String(index)} key={user.id}>
            <Accordion.Header>
              {user.firstName} {user.lastName} | {user.role} | Member Since: {memberSinceDate}
            </Accordion.Header>
            <Accordion.Body>
              <img src={user.photoURL} alt={`${user.firstName}'s profile`} style={{ maxWidth: '100px' }} />
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              {/* Role Update Dropdown */}
              <div style={{ position: 'relative'}}>
                <RoleUpdateDropdown userId={user.id} currentRole={user.role} />
              </div>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default ListOfMembers;
