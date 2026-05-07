import React, { useState } from 'react';
import TodoForm from './TodoForm';

function TodoApp() {
    const [tasks, setTasks] = useState([]);

    const addTask = (text) => {
        const newTask = { id: Date.now(), text: text, completed: false };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="container mt-5 p-4 rounded-4 shadow-lg text-white" 
             style={{ backgroundColor: '#141414', maxWidth: '600px', border: '1px solid #e50914' }}>
            
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#e50914' }}>To-Do App</h2>
            
            <TodoForm addTask={addTask} />

            <div className="list-group">
                {tasks.length === 0 ? (
                    <p className="text-center text-secondary">Let's get some work done!</p>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center mb-2 rounded">
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#6c757d' : 'white' }}>
                                {task.text}
                            </span>
                            <div>
                                <button onClick={() => toggleComplete(task.id)} className="btn btn-sm btn-outline-success me-2">
                                    <i className="bi bi-check-lg"></i>
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="btn btn-sm btn-outline-danger">
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoApp;