import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Todolist/AddItemForm/AddItemForm";
import {
    addTaskAC,
    addTasksForNewTodolistAC,
    changeTaskStatusAC,
    removeTaskAC,
    TaskReducer,
    updateTaskAC
} from "./store/TaskReducer";
import {
    addTodolistAC,
    deleteTodoAC,
    filteredTasksAC,
    TodolistReducer,
    updateTodolistTitleAC
} from "./store/TodolistReducer";


export type taskType = {
    id: string,
    taskTitle: string,
    isDone: boolean
}
export type filterType = "All" | "Active" | "Completed"
export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, todolistsDispatch] = useReducer(TodolistReducer, [
        {id: todolistID_1, title: 'What to learn', filter: "All"},
        {id: todolistID_2, title: 'What to buy', filter: "Active"}
    ])

    const [tasks, tasksDispatch] = useReducer(TaskReducer, {
        [todolistID_1]: [
            {id: v1(), taskTitle: "HTML&CSS", isDone: true},
            {id: v1(), taskTitle: "JS", isDone: false},
            {id: v1(), taskTitle: "React", isDone: true},
            {id: v1(), taskTitle: "Redux", isDone: false},
            {id: v1(), taskTitle: "JSON", isDone: true}
        ],
        [todolistID_2]: [
            {id: v1(), taskTitle: "Beer", isDone: true},
            {id: v1(), taskTitle: "Milk", isDone: true},
            {id: v1(), taskTitle: "Bread", isDone: true},
            {id: v1(), taskTitle: "Salt", isDone: false},
            {id: v1(), taskTitle: "Water", isDone: false}
        ]
    })

    const changeTaskStatus = (todolistID: string, id: string, checked: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID, id, checked))
    }
    const deleteTodo = (todolistID: string) => {
        todolistsDispatch(deleteTodoAC(todolistID))
        delete tasks[todolistID]
    }
    const deleteTask = (todolistID: string, id: string) => {
        tasksDispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string, newTitle: string) => {
        tasksDispatch(addTaskAC(todolistID, newTitle))
    }
    const updateTask = (todolistID: string, id: string, newTitle: string) => {
        tasksDispatch(updateTaskAC(todolistID, id, newTitle))
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        todolistsDispatch(updateTodolistTitleAC(todolistID, newTitle))
    }
    const addTodolist = (newTitle: string) => {
        const newID = v1();
        todolistsDispatch(addTodolistAC(newID, newTitle))
        tasksDispatch(addTasksForNewTodolistAC(newID))
    }
    const filteredTasks = (todolistID: string, val: filterType) => {
        todolistsDispatch(filteredTasksAC(todolistID, val))
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
                            deleteTask={deleteTask}
                            deleteTodo={deleteTodo}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            updateTask={updateTask}
                            updateTitle={updateTodolistTitle}
                            filteredItems={filteredTasks}
                            filter={t.filter}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
