import React, { useState, useEffect } from "react";
import api from "../services/api";

const TasksDragDrop = () => {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTaskStatuses();
        fetchTasks();
    }, []);

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
            console.error("Error fetching task statuses:", error);
        }
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, section) => {
        const taskId = e.dataTransfer.getData("taskId");
        const updatedTasks = tasks.map((task) => {
            if (task.id === parseInt(taskId)) {
                return { ...task, section };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const renderTasks = (section) => {
        return tasks
            .filter((task) => task.section === section)
            .map((task) => (
                <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                >
                    <div className="card mt-1 p-1">{task.title}</div>
                </div>
            ));
    };

    return (
        <div className="row">
            {statuses.map((status) => {
                return (
                    <div
                        key={status.id}
                        className="col-4 card p-1 status-section"
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, status.name)}
                    >
                        <div className="card-header">
                            <div className="card-title">{status.name}</div>
                        </div>
                        <div className="card-body">
                            {renderTasks(status.name)}
                        </div>
                    </div>
                );
            })}
            <div
                className="col-4 card p-1 status-section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Todo")}
            >
                <div className="card-header">
                    <div className="card-title">Todo</div>
                </div>
                <div className="card-body">{renderTasks("Todo")}</div>
            </div>

            <div
                className="col-4 card p-1 status-section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Todo")}
            >
                <div className="card-header">
                    <div className="card-title">Todo</div>
                </div>
                <div className="card-body">{renderTasks("Todo")}</div>
            </div>

            <div
                className="col-4 card p-1 status-section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Todo")}
            >
                <div className="card-header">
                    <div className="card-title">Todo</div>
                </div>
                <div className="card-body">{renderTasks("Todo")}</div>
            </div>
        </div>
    );

    return (
        <div>
            <div
                className="section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Todo")}
            >
                <h2>Todo</h2>
                {tasks
                    .filter((task) => task.section === "Todo")
                    .map((task) => (
                        <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                        >
                            {task.title}
                        </div>
                    ))}
            </div>
            <div
                className="section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "In Progress")}
            >
                <h2>In Progress</h2>
                {tasks
                    .filter((task) => task.section === "In Progress")
                    .map((task) => (
                        <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                        >
                            {task.title}
                        </div>
                    ))}
            </div>
            <div
                className="section"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Done")}
            >
                <h2>Done</h2>
                {tasks
                    .filter((task) => task.section === "Done")
                    .map((task) => (
                        <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                        >
                            {task.title}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TasksDragDrop;
