import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./TaskReducer";
import {TodolistReducer} from "./TodolistReducer";


const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolist: TodolistReducer,
})


export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)