import React, { useState, useEffect } from "react";
import api from "../services/api";
import {
    Card,
    CardHeader,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

const TasksDragDrop = () => {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        deadline_date: "",
        status_id: 1,
        user_id: "",
    });

    const fetchUsers = async () => {
        try {
            const response = await api.get("/users");
            setUsers(response.data.data);
        } catch (error) {
            errorAlert("Error fetching users");
            console.error("Error fetching users:", error);
        }
    };
    const fetchTaskStatuses = async () => {
        try {
            const response = await api.get("/task-statuses");
            setStatuses(response.data.data);
        } catch (error) {
            console.error("Error fetching task statuses:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
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

    useEffect(() => {
        fetchTaskStatuses();
        fetchTasks();
        fetchUsers();
    }, []);

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status_id) => {
        const taskId = e.dataTransfer.getData("taskId");
        const updatedTasks = tasks.map((task) => {
            if (task.id === parseInt(taskId)) {
                return { ...task, status_id };
            }
            return task;
        });
        setTasks(updatedTasks);

        // Update the task on the server
        const updatedTask = updatedTasks.find(
            (task) => task.id === parseInt(taskId)
        );
        api.put(`/tasks/${taskId}`, updatedTask)
            .then((response) => {
                console.log("Task updated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    const renderTasks = (status_id) => {
        return tasks
            .filter((task) => task.status_id === status_id)
            .map((task) => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDoubleClick={(e) => (e.target.draggable = false)}
                    className="card mt-1 p-1"
                    style={{ opacity: "0.8", cursor: "grab" }}
                >
                    <div className="card-header">
                        <div className="card-title">{task.name}</div>
                    </div>
                    <div className="card-body">{task.description}</div>
                    <div className="card-footer">
                        <div className="card-text">
                            <strong>Created By:</strong> {task.user.name}
                        </div>
                        <div className="card-text">
                            <strong>Deadline:</strong> {task.deadline_date}
                        </div>
                    </div>
                </div>
            ));
    };

    const getStatusCardColor = (index) => {
        const colors = [
            "bg-primary",
            "bg-secondary",
            "bg-success",
            "bg-danger",
            "bg-warning",
            "bg-info",
        ]; // Add more colors if needed
        return colors[index % colors.length];
    };

    return (
        <div className="container">
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
                            disabled
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
            <div className="row">
                {statuses.map((status, index) => (
                    <div
                        key={status.id}
                        className={`col-4 card p-1 statu-card ${getStatusCardColor(
                            index
                        )}`}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, status.id)}
                    >
                        <div className="card-header">
                            <div className="card-title">{status.name}</div>
                        </div>
                        <div className="card-body">
                            {renderTasks(status.id)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TasksDragDrop;
