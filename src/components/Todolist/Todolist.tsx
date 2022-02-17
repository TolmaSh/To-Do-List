import React from "react";
import s from "./Todolist.module.css";
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableTitle} from "./EditableTitle/EditableTitle";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {taskType} from "../../store/reducers/TaskReducer";
import {filterType, TodoListType} from "../../store/reducers/TodolistReducer";
import {addTask, deleteTodo, filteredTasks, removeTask, updateTodolistTitle} from "../../store/actions";


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
        dispatch(addTask(todolistID, title))
    }
    const onClickFilteredTask = (value: filterType) => {
        dispatch(filteredTasks(todolistID, value))
    }
    const updateTodolistTitleCallback = (title: string) => {
        dispatch(updateTodolistTitle(todolistID, title))
    }
    const onClickRemoveTaskHandler = (id: string) => {
        dispatch(removeTask(todolistID, id))
    }
    const onClickDeleteTodoHandler = () => {
        dispatch(deleteTodo(todolistID))
    }

    return (
        <div className={s.wrapper}>
            <EditableTitle deleteTaskCallBack={onClickDeleteTodoHandler} title={todolist.title}
                           updateTitleCallback={updateTodolistTitleCallback}/>
            <AddItemForm
                callBack={(title) => addTaskCallBack(title)}
            />
            <TaskList
                todolistID={todolistID}
                tasksForTodolist={tasks}
                onClickRemoveHandler={onClickRemoveTaskHandler}
            />
            <FilterBtns filterVal={todolist.filter}
                        filterHandler={onClickFilteredTask}
            />
        </div>
    );
}