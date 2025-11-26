import { useState } from 'react';
import Task from './Task';

const Column = ({ column, onMoveTask }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const fromColumnId = e.dataTransfer.getData('fromColumnId');

    onMoveTask(taskId, fromColumnId, column.id);
  };

  return (
    <div
      className={`column ${isDraggingOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>{column.title}</h2>
      <div className="tasks-list">
        {column.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
          />
        ))}
        {column.tasks.length === 0 && (
          <div className="empty-column">Нет задач</div>
        )}
      </div>

    </div>
  );
};


export default Column