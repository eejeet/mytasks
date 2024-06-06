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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksDragDrop = () => {
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
      errorAlert("Error fetching tasks");
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
    try {
      await api.put(`/tasks/${taskId}`, { task: updatedTask });
      fetchTasks();
      // Implement sweet alert with success message
      alert("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      // Implement sweet alert with error message
      alert("Failed to update task");
    }
  };

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, removed);

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={() => setShowModal(true)}>Add Task</button>

      <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        {/* Modal content */}
      </Modal>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <table className="table" ref={provided.innerRef}>
              <thead>{/* Table header */}</thead>
              <tbody>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* Table row */}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TasksDragDrop;
