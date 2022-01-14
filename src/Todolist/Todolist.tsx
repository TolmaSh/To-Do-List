import React, {MouseEvent,} from "react";
import s from "./Todolist.module.css"
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {EditableTitle} from "./EditableTitle/EditableTitle";


type propsType = {
    todolistID: string
    title: string
    task: Array<arrType>
    removeItem: (todolistID: string, id: string) => void
    deleteTodo: (todolistID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    updateTask: (todolistID: string, id: string, value: string) => void
    updateTitle: (tID: string, value: string) => void
    filteredItems: (todolistID: string, val: filterType) => void
    filter: filterType
}


export type arrType = {
    id: string,
    taskTitle: string,
    isDone: boolean
}

export type filterType = "All" | "Active" | "Completed"

export const Todolist = ({
                             title,
                             task,
                             removeItem,
                             addTask,
                             changeTaskStatus,
                             updateTask,
                             updateTitle,
                             filter,
                             todolistID,
                             filteredItems,
                             ...props
                         }: propsType) => {


    const addTaskCallBack = (title: string) => {
        addTask(todolistID, title)
    }
    const filterHandler = (value: filterType) => {
        filteredItems(todolistID, value)
    }
    const updateTitleCallback = (title:string) => {
        updateTitle(todolistID, title)
    }

    // let tasksForTodolist = task
    // if (filter === "Active") {
    //     tasksForTodolist = task.filter(f => !f.isDone)
    // }
    // if (filter === "Completed") {
    //     tasksForTodolist = task.filter(f => f.isDone)
    // }

    let tasksForTodolist;
    switch (filter) {
        case "Active":
            tasksForTodolist = task.filter(f => !f.isDone);
            break
        case "Completed":
            tasksForTodolist = task.filter(f => f.isDone);
            break
        default:
            tasksForTodolist = task
    }

    const onClickRemoveHandler = (id: string, value: MouseEvent<HTMLButtonElement>) => {
        value.stopPropagation()
        removeItem(todolistID, id)
    }

    const onClickDeleteTodoHandler = () => {
        props.deleteTodo(todolistID)
    }

    return (
        <div className={s.wrapper}>
            {/*<h3 className={s.title}>{title}*/}
            {/*    <IconButton aria-label="delete" onClick={onClickDeleteTodoHandler}>*/}
            {/*        <HighlightOffIcon/>*/}
            {/*    </IconButton>*/}
            {/*</h3>*/}
            <EditableTitle deleteTaskCallBack={onClickDeleteTodoHandler} title={title} updateTitleCallback={updateTitleCallback}/>
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