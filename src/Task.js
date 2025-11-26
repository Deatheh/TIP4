function Task  ({ task, columnId }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('fromColumnId', columnId);
  };

  return (
    <div
      className="task"
      draggable="true"
      onDragStart={handleDragStart}
    >
      <div className="task-content">{task.content}</div>
    </div>
  );
};

export default Task