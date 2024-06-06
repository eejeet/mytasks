import React, { useState } from 'react';
import { createTask } from '../services/apiService';
import UserDropdown from './UserDropdown';
import StatusDropdown from './StatusDropdown';

const TaskForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [statusId, setStatusId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTask = {
      name,
      description,
      user_id: userId,
      deadline_date: deadlineDate,
      status_id: statusId,
    };
    try {
      const createdTask = await createTask(newTask);
      onCreate(createdTask); // Update the task list in TaskList
      // Reset form fields
      setName('');
      setDescription('');
      setUserId('');
      setDeadlineDate('');
      setStatusId('');
    } catch (error) {
      console.error('Error creating task:', error);
      // Display error message to the user
    }
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Task Name:</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            className="form-control" 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <UserDropdown onSelect={(selectedUserId) => setUserId(selectedUserId)} />
        <StatusDropdown onSelect={(selectedStatusId) => setStatusId(selectedStatusId)} />
        <div className="form-group">
          <label htmlFor="deadline">Deadline Date:</label>
          <input 
            type="date" 
            className="form-control" 
            id="deadline" 
            value={deadlineDate} 
            onChange={(e) => setDeadlineDate(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;