import React, {useState} from "react";
// import {filterType} from "./App";

type propsType = {
    title: string
    task: Array<arrType>
    removeItem:(id:number)=>void
}

type arrType = {
    id: number,
    title: string,
    isDone: boolean
}

type filterType = "All"|"Active"|"Completed"

export const Todolist = (props: propsType) => {

    const [filterVal, setFilterVal] = useState<filterType>("All")
    let isDone = props.task
    if ( filterVal === "Active") {
        isDone = props.task.filter(f =>f.isDone)
    }
    if ( filterVal === "Completed") {
        isDone = props.task.filter(f=>!f.isDone)


    }
    const filteredItems = (val: filterType) => {
        setFilterVal(val)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {isDone.map(item => {
                    // debugger
                    return (
                        <li key={item.id}>
                            <button onClick={()=>props.removeItem(item.id)}>X</button>
                            <input type="checkbox" checked={item.isDone}/>
                            <span>{item.title}</span>

                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={()=>filteredItems("All")}>All</button>
                <button onClick={()=>filteredItems("Active")}>Active</button>
                <button onClick={()=>filteredItems("Completed")}>Completed</button>
            </div>
        </div>
    );
}