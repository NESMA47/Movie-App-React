import React, { useState } from 'react';

function TodoForm({ addTask }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTask(input);
            setInput(""); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
            <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary shadow-none" 
                placeholder="Enter new task..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-danger fw-bold shadow" style={{ backgroundColor: '#e50914', border: 'none' }}>
                ADD
            </button>
        </form>
    );
}

export default TodoForm;