import { useState } from 'react';
import Column from './Column';

function KanbanBoard() {

    const [columns, setColumns] = useState({
        todo: {
            id: 'todo',
            title: 'Сделать',
            tasks: [
                { id: 1, content: 'Изучить React' },
                { id: 2, content: 'Написать тесты' }
            ]
        },
        progress: {
            id: 'progress',
            title: 'В процессе',
            tasks: [
                { id: 3, content: 'Разработка канбан-доски' }
            ]
        },
        done: {
            id: 'done',
            title: 'Готово',
            tasks: [
                { id: 4, content: 'Создать репозиторий' }
            ]
        }
    });

    const [newTaskContent, setNewTaskContent] = useState('');

    const moveTask = (taskId, fromColumnId, toColumnId) => {
        if (fromColumnId === toColumnId) return;

        setColumns(prevColumns => {
            const fromColumn = prevColumns[fromColumnId];
            const toColumn = prevColumns[toColumnId];

            const taskToMove = fromColumn.tasks.find(task => task.id === taskId);

            if (!taskToMove) return prevColumns;

            return {
                ...prevColumns,
                [fromColumnId]: {
                    ...fromColumn,
                    tasks: fromColumn.tasks.filter(task => task.id !== taskId)
                },
                [toColumnId]: {
                    ...toColumn,
                    tasks: [...toColumn.tasks, taskToMove]
                }
            };
        });
    };

    return (
        <div className="kanban-board">
            <h1>Канбан Доска</h1>
            <div className="columns-container">
                {Object.values(columns).map(column => (
                    <Column
                        column={column}
                        onMoveTask={moveTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default KanbanBoard