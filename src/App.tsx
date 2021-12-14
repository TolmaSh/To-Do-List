import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
// export type filterType = "All"|"Active"|"Completed"
function App() {
    const [tasks,setTasks] = useState([
        {id:1,title:"HTML&CSS",isDone:true},
        {id:2,title:"JS",isDone:false},
        {id:3,title:"React",isDone:true},
        {id:4,title:"Redux",isDone:false},
        {id:5,title:"JSON",isDone:true}
    ])
    const removeItem = (id: number) => {
        setTasks(tasks.filter(f => f.id !== id))
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
            />

        </div>
    );
}


export default App;
