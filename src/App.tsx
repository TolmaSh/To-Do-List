import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
function App() {
    const [tasks,setTasks] = useState([
        {id:v1(),title:"HTML&CSS",isDone:true},
        {id:v1(),title:"JS",isDone:false},
        {id:v1(),title:"React",isDone:true},
        {id:v1(),title:"Redux",isDone:false},
        {id:v1(),title:"JSON",isDone:true}
    ])
    const [error,setError] = useState(false)
    const changeTaskStatus = (id: string, value: boolean) => {
        setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))
    }
    const removeItem = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }

    const addTask = (newTitle: string) => {
        const newTask = {id:v1(),title:newTitle,isDone:true}
        if ( newTitle === "") {
            setError(true)
        } else {
            setError(false)
            setTasks([newTask, ...tasks])
        }
    }



    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                task={tasks}
                removeItem={removeItem}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                errorName={error}
            />

        </div>
    );
}
export default App;
