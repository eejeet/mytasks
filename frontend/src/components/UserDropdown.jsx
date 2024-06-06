// UserDropdown.jsx
import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/apiService';

const UserDropdown = ({ onSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers(); // Replace getUsers() with your API call
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="form-group">
      <label htmlFor="user">Assign To:</label>
      <select className="form-control" id="user" onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserDropdown;

