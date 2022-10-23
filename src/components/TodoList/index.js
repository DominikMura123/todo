import React, { useState, useEffect } from 'react';

function TodoList() {
    const todo = [
        {title: "zadanie 1"},
        {title: "zadanie 2"},
        {title: "zadanie 3"},
    ]

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setTasks(todo); 
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault();
        tasks.push({title: inputValue})
        setTasks(tasks)
        setInputValue('')
    }

    const handleInputChange = (e) =>{
        e.preventDefault();
        setInputValue(e.target.value);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                Temat zadania
            <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
            />
            </label>
                <button type="submit">Show</button>    
            </form>
            <ul>
                {tasks.map((task) => {
                    return(
                        <li>{task.title}</li>
                    );
                }) ?? []}
            </ul>
        </div>
    )
}

export default TodoList