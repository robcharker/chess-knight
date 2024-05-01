// ParticipantsMultiSelect.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Search } from '@mui/icons-material';

const ParticipantsMultiSelect = ({ onParticipantsSelected }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const db = getFirestore();
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  useEffect(() => {
    onParticipantsSelected(selectedUserIds);
  }, [selectedUserIds, onParticipantsSelected]);

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeSelectedUser = (userId) => {
    setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
  };

  return (
    <div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="search-addon">
          <Search /> {/* Search icon */}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for participants"
          aria-describedby="search-addon"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm && (
        <div className="participants-dropdown" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ced4da', borderRadius: '0.25rem' }}>
          {filteredUsers.map(user => (
            <div key={user.id} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={user.id}
                id={`user-${user.id}`}
                onChange={() => handleCheckboxChange(user.id)}
                checked={selectedUserIds.includes(user.id)}
              />
              <label className="form-check-label" htmlFor={`user-${user.id}`}>
                {user.firstName} {user.lastName}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="selected-participants mt-2">
        {selectedUserIds.map(id => {
          const user = users.find(user => user.id === id);
          return (
            <span key={id} className="badge bg-secondary m-1">
              {user.firstName} {user.lastName}
              <button type="button" className="btn-close ms-2" aria-label="Close" onClick={() => removeSelectedUser(id)}></button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsMultiSelect;
