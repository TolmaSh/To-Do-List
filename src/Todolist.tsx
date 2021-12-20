import React, {useState, KeyboardEvent, ChangeEvent} from "react";
// import {filterType} from "./App";

type propsType = {
    title: string
    task: Array<arrType>
    removeItem: (id: string) => void
    addTask: (newTitle: string) => void
}

type arrType = {
    id: string,
    title: string,
    isDone: boolean
}

type filterType = "All" | "Active" | "Completed"

export const Todolist = (props: propsType) => {

    const [filterVal, setFilterVal] = useState<filterType>("All")
    let isDone = props.task
    if (filterVal === "Active") {
        isDone = props.task.filter(f => !f.isDone)
    }
    if (filterVal === "Completed") {
        isDone = props.task.filter(f => f.isDone)


    }
    const filteredItems = (val: filterType) => {
        setFilterVal(val)
    }

    const [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    // const filteredAllHandler = () => {
    //     filteredItems("All")
    // }
    // const filteredActiveHandler = () => {
    //     filteredItems("Active")
    // }
    // const filteredCompletedHandler = () => {
    //     filteredItems(value)
    // }
    const filterHandler = (value: filterType) => {
        filteredItems(value)
    }
    const onClickRemoveHandler = (id: string) => {
        props.removeItem(id)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {isDone.map(item => {
                    return (
                        <li key={item.id}>
                            <button onClick={() => onClickRemoveHandler(item.id)}>X</button>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>

                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => filterHandler("All")}>All</button>
                <button onClick={() => filterHandler("Active")}>Active</button>
                <button onClick={() => filterHandler("Completed")}>Completed</button>
            </div>
        </div>
    );
}