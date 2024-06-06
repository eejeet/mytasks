import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td>{task.user ? task.user.name : ''}</td>
      <td>{task.deadline_date}</td>
      <td>{task.status.name}</td>
      <td>{/* Actions (Edit, Delete) */}</td>
    </tr>
  );
};

export default TaskItem;