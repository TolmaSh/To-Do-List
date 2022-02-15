import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./reducers/TaskReducer";
import {TodolistReducer} from "./reducers/TodolistReducer";


const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolist: TodolistReducer,
})


export type rootReducerType = ReturnType<typeof rootReducer>
export const index = createStore(rootReducer)