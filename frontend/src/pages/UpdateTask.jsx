import React, { useState, useEffect } from "react";
import api from "../services/api";
import { errorAlert } from "../services/helpers";

const UpdateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      setNewTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline_date: "",
    status_id: "",
    user_id: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchStatuses();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      errorAlert("Error fetching users");
      console.error("Error fetching users:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await api.get("/task-statuses");
      setStatuses(response.data.data);
    } catch (error) {
      errorAlert("Error fetching statuses");
      console.error("Error fetching statuses:", error);
    }
  };

  const createTask = async () => {
    try {
      await api.post("/tasks", newTask);
      setNewTask({
        name: "",
        description: "",
        deadline_date: "",
        status_id: "",
        user_id: "",
      });
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={() => setShowModal(true)}>Add Task</button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created By</th>
            <th>User For</th>
            <th>Deadline Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.creator.name ?? "-"}</td>
              <td>{task.user.name ?? "-"}</td>
              <td>{task.deadline_date}</td>
              <td>{task.status.name ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateTask;
