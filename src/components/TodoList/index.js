import React, { useState, useEffect } from 'react';
import {get, post, deleteAll} from '../../helpers/http';
import URLS from '../../helpers/urls'
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
    const startTodo = [
        {id: 1, createAt:null, title: "zadanie 1"},
        {id: 2, createAt:null, title: "zadanie 2"},
        {id: 3, createAt:null, title: "zadanie 3"},
    ]

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        //getFromStorage();
        getFromJsonServer();
        setInterval(()=>{
            const date = new Date;
            setCurrentTime(date.toString());
        }, 1000)
    }, []);
   
    const startTimer = (date) => {
        setCurrentTime(date);
    }

    const getFromStorage = () => {
        let storageJSON = localStorage.getItem("TodoList");
        if(storageJSON == null){  
            localStorage.setItem("TodoList", JSON.stringify(startTodo));
        }
        storageJSON = localStorage.getItem("TodoList");
        setTasks(JSON.parse(storageJSON));
    }

    const addTaskToStorage = (task) => {
        let storageJSON = localStorage.getItem("TodoList");
	    if(storageJSON){
		    let storage = JSON.parse(storageJSON);
		    storage.push(task);
		    storageJSON = JSON.stringify(storage);
		    localStorage.setItem("TodoList", storageJSON);
        }
	    else{
		    localStorage.setItem("TodoList", JSON.stringify([task]));
	    }
    }

    const getFromJsonServer = () => {
        get(URLS.tasks)
        .then(data => {
            setTasks(data);
        })
    }

    const addTaskToJsonServer = (newTask) => {
        post(URLS.tasks, newTask)    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const newTask = {id: uuidv4(), 
                        createAt: date.toString(), 
                        title: inputValue}

        tasks.push(newTask);
        setTasks(tasks);
        addTaskToJsonServer(newTask);
        //addTaskToStorage({title: inputValue})
        setInputValue('')
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    const handleRemoveTodos = (e) => {
        e.preventDefault();
        setTasks([]); 
        
        tasks.forEach(task => deleteAll(URLS.tasks, task.id));        
    }

    return(
        <div>   
            {currentTime ? <p>{currentTime}</p> : null}
            <form onSubmit={handleSubmit}>
            <label>
                Temat zadania
            <input 
                type="text" 
                value={inputValue}
                onChange={handleInputChange}
            />
            </label>
                <button type="submit">Add</button>    
            </form>
            <ul>
                {tasks.map((task) => {
                    return(
                        <li key={task.id}>
                            nazwa: {task.title}
                            {task.createAt && <span> dodano: {task.createAt}</span>}
                        </li>
                    );
                }) ?? []}
            </ul>
            <button onClick={handleRemoveTodos}>Remove Todos</button>
        </div>
    )
}

export default TodoList