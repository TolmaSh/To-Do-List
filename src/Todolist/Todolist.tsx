import React from "react";
import s from "./Todolist.module.css";
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableTitle} from "./EditableTitle/EditableTitle";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {addTaskAC, removeTaskAC, taskType} from "../store/TaskReducer";
import {deleteTodoAC, filteredTasksAC, filterType, TodoListType, updateTodolistTitleAC} from "../store/TodolistReducer";


type propsType = {
    todolistID: string
}

export const Todolist = ({todolistID}: propsType) => {

    const dispatch = useDispatch()
    let tasks = useSelector<rootReducerType, taskType[]>(state => state.tasks[todolistID])
    const todolist = useSelector<rootReducerType, TodoListType>(state => state.todolist
        .filter(todo => todo.id === todolistID)[0])

    if (todolist.filter === 'Active') {
        tasks = tasks.filter(task => !task.isDone);
    } else if (todolist.filter === 'Completed') {
        tasks = tasks.filter(f => f.isDone);
    }


    const addTaskCallBack = (title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const onClickFilteredTask = (value: filterType) => {
        dispatch(filteredTasksAC(todolistID, value))
    }
    const updateTitleCallback = (title: string) => {
        dispatch(updateTodolistTitleAC(todolistID, title))
    }

    const onClickRemoveHandler = (id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }
    const onClickDeleteTodoHandler = () => {
        dispatch(deleteTodoAC(todolistID))
    }

    return (
        <div className={s.wrapper}>
            <EditableTitle deleteTaskCallBack={onClickDeleteTodoHandler} title={todolist.title}
                           updateTitleCallback={updateTitleCallback}/>
            <AddItemForm
                callBack={(title) => addTaskCallBack(title)}
            />
            <TaskList
                todolistID={todolistID}
                tasksForTodolist={tasks}
                onClickRemoveHandler={onClickRemoveHandler}
            />
            <FilterBtns filterVal={todolist.filter}
                        filterHandler={onClickFilteredTask}
            />
        </div>
    );
}