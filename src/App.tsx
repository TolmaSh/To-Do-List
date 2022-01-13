import React, {useState} from 'react';
import './App.css';
import {filterType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm/AddItemForm";


export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID_1, title: 'What to learn', filter: "All"},
        {id: todolistID_2, title: 'What to buy', filter: "Active"}
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

    const changeTaskStatus = (todolistID: string, id: string, value: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === id ? {...m, isDone: value} : m)})
    }
    const deleteTodo = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }
    const removeItem = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }
    const addTask = (todolistID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const updateTask = (todolistID: string, id: string, value: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, title: value} : t)})
    }
    const addTodolist = (newTitle: string) => {
        const newID = v1();
        setTodolists([...todolists, {id: newID, title: newTitle, filter: "All"}])
        setTasks({...tasks, [newID]: [{id: v1(), title: "Write your todo", isDone: false}]})
    }
    const filteredItems = (todolistID: string, val: filterType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: val} : t))
    }
    return (
        <div className="App">
            <div className="todolist_add">
                <AddItemForm callBack={addTodolist} label={'Add your new todoList'}/>
            </div>
            <div className="todolist_wrapper">
                {todolists.map(t => {
                    return (
                        <Todolist
                            key={t.id}
                            todolistID={t.id}
                            title={t.title}
                            task={tasks[t.id]}
                            removeItem={removeItem}
                            deleteTodo={deleteTodo}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            updateTask={updateTask}
                            filteredItems={filteredItems}
                            filter={t.filter}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
