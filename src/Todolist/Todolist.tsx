import React, {useState, KeyboardEvent, MouseEvent, ChangeEvent} from "react";
import s from "./Todolist.module.css"
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddTask} from "./AddTask/AddTask";


type propsType = {
    title: string
    task: Array<arrType>
    removeItem: (id: string) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (id: string, value: boolean) => void
    errorName: boolean
}


export type arrType = {
    id: string,
    title: string,
    isDone: boolean
}

export type filterType = "All" | "Active" | "Completed"

export const Todolist = ({title, task, removeItem, addTask, changeTaskStatus, errorName, ...props}: propsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [filterVal, setFilterVal] = useState<filterType>("All")


    // --- AddTask ---

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    /// --- ---

    //------ FilterBtns -----

    const filteredItems = (val: filterType) => {
        setFilterVal(val)
    }
    const filterHandler = (value: filterType) => {
        filteredItems(value)
    }

    //---  ----

    // ----- TaskList ----

    let tasksForTodolist = task
    if (filterVal === "Active") {
        tasksForTodolist = task.filter(f => !f.isDone)
    }
    if (filterVal === "Completed") {
        tasksForTodolist = task.filter(f => f.isDone)
    }

    const onClickRemoveHandler = (id: string, value: MouseEvent<HTMLButtonElement>) => {
        value.stopPropagation()
        removeItem(id)
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
                tasksForTodolist={tasksForTodolist}
                changeTaskStatus={changeTaskStatus}
                onClickRemoveHandler={onClickRemoveHandler}
            />
            <FilterBtns filterVal={filterVal}
                        filterHandler={filterHandler}
            />
        </div>
    );
}