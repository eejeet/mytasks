import React, { useState, useEffect } from "react";
import api from "../services/api";
import { errorAlert } from "../services/helpers";
import {
  Card,
  CardHeader,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
      //   axiosErrorAlert(error, fetchTasks);
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

  const updateTask = async (taskId, updatedTask) => {
    // try {
    //   await api.put(`/tasks/${taskId}`, { task: updatedTask });
    //   fetchTasks();
    // Implement sweet alert with success message
    alert("Have to Implement");
    // } catch (error) {
    //   console.error("Error updating task:", error);
    // Implement sweet alert with error message
    // swal("Error", "Failed to update task", "error");
    // }

    // try {
    //   await api.put(`/tasks/${taskId}`, { task: updatedTask });
    //   fetchTasks();
    // } catch (error) {
    //   console.error("Error updating task:", error);
    // }
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

      <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)}>
          Add Task
        </ModalHeader>
        <ModalBody>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating mb-3"></div>
          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="deadline_date"
              placeholder="Enter deadline date"
              name="deadline_date"
              value={newTask.deadline_date}
              onChange={handleInputChange}
            />
            <label htmlFor="deadline_date">Deadline Date</label>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-control"
              id="status_id"
              name="status_id"
              value={newTask.status_id}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option
                  key={status.id}
                  value={status.id}
                  selected={status.is_default == 1}
                >
                  {status.name}
                </option>
              ))}
            </select>
            <label htmlFor="status_id">Status</label>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-control"
              id="user_id"
              name="user_id"
              value={newTask.user_id}
              onChange={handleInputChange}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  selected={user.is_default === 1}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <label htmlFor="user_id">For User</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />
            <label htmlFor="description">Description</label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={createTask}>Create Task</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </ModalFooter>
      </Modal>

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
            <th>Actions</th>
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
              <td>
                <button onClick={() => updateTask(task.id, "Updated Task")}>
                  Update Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
