import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/apiService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleTaskCreate = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container">
      <h1>Task Management</h1>
      <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
      <TaskForm onCreate={handleTaskCreate} />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;