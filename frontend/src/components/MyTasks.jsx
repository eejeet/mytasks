import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTasks, updateTaskStatus } from '../services/apiService';

const MyTasks = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState({
    'Pending': [],
    'Assigned': [],
    'Completed': [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
      // Organize tasks into status categories
      const initialStatuses = {
        'Pending': [],
        'Assigned': [],
        'Completed': [],
      };
      data.forEach((task) => {
        initialStatuses[task.status.name].push(task);
      });
      setStatuses(initialStatuses);
    };
    fetchTasks();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(statuses[result.source.droppableId]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update statuses in the state
    setStatuses({
      ...statuses,
      [result.source.droppableId]: items,
    });

    // Update the task status on the server
    updateTaskStatus(reorderedItem.id, result.destination.droppableId);
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>
      <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="row">
          {Object.entries(statuses).map(([statusName, tasks]) => (
            <div key={statusName} className="col-md-4">
              <h3 className="mb-3">{statusName}</h3>
              <Droppable droppableId={statusName}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {/* Your TaskItem component here (e.g., TaskItem task={task} /> */}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MyTasks;