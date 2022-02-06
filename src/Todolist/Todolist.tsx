import React from "react";
import s from "./Todolist.module.css";
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableTitle} from "./EditableTitle/EditableTitle";
import {filterType} from "../App";
import {useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {TasksStateType} from "../store/TaskReducer";


type propsType = {
    todolistID: string
    title: string
    deleteTask: (todolistID: string, id: string) => void
    deleteTodo: (todolistID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    updateTask: (todolistID: string, id: string, value: string) => void
    updateTitle: (todolistID: string, value: string) => void
    filteredItems: (todolistID: string, val: filterType) => void
    filter: filterType
}

export const Todolist = ({
                             title,
                             deleteTask,
                             addTask,
                             changeTaskStatus,
                             updateTask,
                             updateTitle,
                             filter,
                             todolistID,
                             filteredItems,
                             ...props
                         }: propsType) => {

    const tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)
    const addTaskCallBack = (title: string) => {
        addTask(todolistID, title)
    }
    const filterHandler = (value: filterType) => {
        filteredItems(todolistID, value)
    }
    const updateTitleCallback = (title: string) => {
        updateTitle(todolistID, title)
    }

    let tasksForTodolist;
    switch (filter) {
        case "Active":
            tasksForTodolist = tasks[todolistID].filter(f => !f.isDone);
            break
        case "Completed":
            tasksForTodolist = tasks[todolistID].filter(f => f.isDone);
            break
        default:
            tasksForTodolist = tasks[todolistID]
    }

    const onClickRemoveHandler = (id: string) => {
        deleteTask(todolistID, id)
    }
    const onClickDeleteTodoHandler = () => {
        props.deleteTodo(todolistID)
    }

    return (
        <div className={s.wrapper}>
            <EditableTitle deleteTaskCallBack={onClickDeleteTodoHandler} title={title}
                           updateTitleCallback={updateTitleCallback}/>
            <AddItemForm
                callBack={(title) => addTaskCallBack(title)}
            />
            <TaskList
                todolistID={todolistID}
                tasksForTodolist={tasksForTodolist}
                changeTaskStatus={changeTaskStatus}
                updateTask={updateTask}
                onClickRemoveHandler={onClickRemoveHandler}
            />
            <FilterBtns filterVal={filter}
                        filterHandler={filterHandler}
            />
        </div>
    );
}