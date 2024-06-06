import React, { useState } from "react";

const TasksDragDrop = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", section: "Todo" },
        { id: 2, title: "Task 2", section: "Todo" },
        { id: 3, title: "Task 3", section: "In Progress" },
        { id: 4, title: "Task 4", section: "In Progress" },
        { id: 5, title: "Task 5", section: "Done" },
        { id: 6, title: "Task 6", section: "Done" },
    ]);

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
                    <div className="card">
                        <div className="card-body">{task.title}</div>
                    </div>
                </div>
            ));
    };

    return (
        <div className="row">
            <div
                className="col-4 card p-1"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Todo")}
            >
                <h2>Todo</h2>
                {renderTasks("Todo")}
            </div>
            <div
                className="col-4 card p-1"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "In Progress")}
            >
                <h2>In Progress</h2>
                {renderTasks("In Progress")}
            </div>
            <div
                className="col-4 card p-1"
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, "Done")}
            >
                <h2>Done</h2>
                {renderTasks("Done")}
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
