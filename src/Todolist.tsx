import React from "react";
import {filterType} from "./App";

type propsType = {
    title: string
    task: Array<arrType>
    removeItem:(id:number)=>void
    filteredItems:(val:filterType)=>void
}

type arrType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist = (props: propsType) => {

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(item => {
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
                <button onClick={()=>props.filteredItems("All")}>All</button>
                <button onClick={()=>props.filteredItems("Active")}>Active</button>
                <button onClick={()=>props.filteredItems("Completed")}>Completed</button>
            </div>
        </div>
    );
}