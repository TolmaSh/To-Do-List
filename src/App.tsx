import React from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./Todolist/AddItemForm/AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskAC
} from "./store/TaskReducer";
import {
    addTodolistAC,
    deleteTodoAC,
    filteredTasksAC,
    updateTodolistTitleAC
} from "./store/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";


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

    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodoListType[]>(state => state.todolist)

    const changeTaskStatus = (todolistID: string, id: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, id, checked))
    }
    const deleteTodo = (todolistID: string) => {
        dispatch(deleteTodoAC(todolistID))
    }
    const deleteTask = (todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }
    const addTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    }
    const updateTask = (todolistID: string, id: string, newTitle: string) => {
        dispatch(updateTaskAC(todolistID, id, newTitle))
    }
    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(updateTodolistTitleAC(todolistID, newTitle))
    }
    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const filteredTasks = (todolistID: string, val: filterType) => {
        dispatch(filteredTasksAC(todolistID, val))
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
