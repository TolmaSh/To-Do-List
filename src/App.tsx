import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
// export type filterType = "All"|"Active"|"Completed"
function App() {
    const [tasks,setTasks] = useState([
        {id:v1(),title:"HTML&CSS",isDone:true},
        {id:v1(),title:"JS",isDone:false},
        {id:v1(),title:"React",isDone:true},
        {id:v1(),title:"Redux",isDone:false},
        {id:v1(),title:"JSON",isDone:true}
    ])
    const removeItem = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }

    const addTask = (newtitle: string) => {
        const newTask = {id:v1(),title:newtitle,isDone:true}
        setTasks([newTask, ...tasks])
    }
    // const [filterVal, setFilterVal] = useState("All")
    // let isDone = tasks
    // if ( filterVal === "Active") {
    //         isDone = tasks.filter(f =>f.isDone)
    //     }
    // if ( filterVal === "Completed") {
    //         isDone = tasks.filter(f=>!f.isDone)
    //
    //
    //     }
    // const filteredItems = (val: filterType) => {
    //     setFilterVal(val)
    // }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                task={tasks}
                removeItem={removeItem}
                addTask={addTask}
            />

        </div>
    );
}
export default App;
