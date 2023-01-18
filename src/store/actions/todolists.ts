import {v1} from "uuid";
import {filterType} from "../reducers/TodolistReducer";


export const deleteTodo = (todolistID: string) => {
    return {
        type: 'DELETE-TODO',
        payload: {
            todolistID,
        }

    } as const
}

export const updateTodolistTitle = (todolistID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistID,
            newTitle,
        }
    } as const
}

export const addTodolist = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newID: v1(),
            newTitle,
        }
    } as const
}

export const filteredTasks = (todolistID: string, value: filterType) => {
    return {
        type: 'FILTERED-TASKS',
        payload: {
            todolistID,
            value,
        }
    } as const
}