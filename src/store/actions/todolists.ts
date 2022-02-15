import {v1} from "uuid";
import {filterType} from "../reducers/TodolistReducer";


export const deleteTodo = (tID: string) => {
    return {
        type: 'DELETE-TODO',
        payload: {
            todolistID: tID
        }

    } as const
}

export const updateTodolistTitle = (tID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistID: tID,
            newTitle: newTitle,
        }
    } as const
}

export const addTodolist = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newID: v1(),
            newTitle: newTitle
        }
    } as const
}

export const filteredTasks = (tID: string, val: filterType) => {
    return {
        type: 'FILTERED-TASKS',
        payload: {
            todolistID: tID,
            value: val
        }
    } as const
}