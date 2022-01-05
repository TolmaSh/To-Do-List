import React, {useState, KeyboardEvent, MouseEvent, ChangeEvent, SetStateAction, Dispatch} from "react";
import s from "./Todolist.module.css"
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddTask} from "./AddTask/AddTask";
import {TodoListType} from "../App";


type propsType = {
    todolistID: string
    title: string
    task: Array<arrType>
    removeItem: (todolistID: string,id: string) => void
    addTask: (todolistID: string,newTitle: string) => void
    changeTaskStatus: (todolistID: string,id: string, value: boolean) => void
    filteredItems: (todolistID: string,val: filterType) => void
    errorName: boolean
    filter: filterType
}


export type arrType = {
    id: string,
    title: string,
    isDone: boolean
}

export type filterType = "All" | "Active" | "Completed"

export const Todolist = ({title, task, removeItem, addTask, changeTaskStatus, errorName,filter,todolistID,filteredItems, ...props}: propsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    // const [filterVal, setFilterVal] = useState<filterType>("All")


    // --- AddTask ---

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        addTask(todolistID,taskTitle)
        setTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    /// --- ---

    //------ FilterBtns -----

    const filterHandler = (value: filterType) => {
        filteredItems(todolistID ,value)
    }

    //---  ----

    // ----- TaskList ----

    let tasksForTodolist = task
    if (filter === "Active") {
        tasksForTodolist = task.filter(f => !f.isDone)
    }
    if (filter === "Completed") {
        tasksForTodolist = task.filter(f => f.isDone)
    }

    const onClickRemoveHandler = (id: string, value: MouseEvent<HTMLButtonElement>) => {
        value.stopPropagation()
        removeItem(todolistID,id)
    }

    // ----    -----


    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>{title}</h3>
            <AddTask
                errorName={errorName}
                taskTitle={taskTitle}
                onChangeHandler={onChangeHandler}
                onKeyPressHandler={onKeyPressHandler}
                onClickHandler={onClickHandler}
            />
            <TaskList
                todolistID={todolistID}
                tasksForTodolist={tasksForTodolist}
                changeTaskStatus={changeTaskStatus}
                onClickRemoveHandler={onClickRemoveHandler}
            />
            <FilterBtns filterVal={filter}
                        filterHandler={filterHandler}
            />
        </div>
    );
}