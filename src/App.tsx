import React, {useState} from 'react';
import './App.css';
import {filterType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";


export type TodoListType = {
    id: string
    title: string
    filter: filterType
    error: boolean
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: 'What to learn', filter: "All", error: false},
        {id: todolistID_2, title: 'What to buy', filter: "Active", error: false}
    ])

    const [tasks, setTasks] = useState({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "JSON", isDone: true}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
            {id: v1(), title: "Water", isDone: false}
        ]
    })

    // const [error, setError] = useState(false)
    const changeTaskStatus = (todolistID: string,id: string, value: boolean) => {
        // setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))

    }
    const removeItem = (todolistID: string,id: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(f => f.id !== id)})
        // setTasks(tasks.filter(f => f.id !== id))
    }

    const addTask = (todolistID: string,newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        if (newTitle === "") {
            setTodolists(todolists.map(t => t.id === todolistID ? {...t, error: true} : t))
        } else {
            setTodolists(todolists.map(t => t.id === todolistID ? {...t, error: false} : t))
            // setTasks([newTask, ...tasks])
            setTasks({...tasks, [todolistID]:[newTask,...tasks[todolistID]]})
        }
    }

    const filteredItems = (todolistID: string,val: filterType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: val} : t))
    }

    return (
        <div className="App">
            {todolists.map(t => {
                return (
                    <Todolist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        task={tasks[t.id]}
                        removeItem={removeItem}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filteredItems={filteredItems}
                        errorName={t.error}
                        filter={t.filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
