// StatusDropdown.jsx
import React from 'react';

const StatusDropdown = ({ onSelect }) => {
  const statuses = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Assigned' },
    { id: 3, name: 'Completed' },
  ];

  return (
    <div className="form-group">
      <label htmlFor="status">Status:</label>
      <select className="form-control" id="status" onChange={(e) => onSelect(e.target.value)}>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>{status.name}</option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;