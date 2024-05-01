// RoleUpdateDropdown.js
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import useUpdateRole from '../hooks/useUpdateRole'; // Assuming useUpdateRole is in the same directory

const RoleUpdateDropdown = ({ userId, currentRole }) => {
  const [role, setRole] = useState(currentRole);
  const updateRole = useUpdateRole();

  // Update the local state if the prop changes
  useEffect(() => {
    setRole(currentRole);
  }, [currentRole]);

  const roles = ['admin', 'member', 'moderator'];
  const otherRoles = roles.filter(r => r !== role);

  const handleSelect = async (newRole) => {
    await updateRole(userId, newRole);
    setRole(newRole); // Update the local state to reflect the new role
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {role}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {otherRoles.map(r => (
          <Dropdown.Item key={r} onClick={() => handleSelect(r)}>
            {r}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RoleUpdateDropdown;
