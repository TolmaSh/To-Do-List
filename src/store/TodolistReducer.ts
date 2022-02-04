import {filterType, TodoListType} from "../App";
import {v1} from "uuid";

export const TodolistReducer = (state: Array<TodoListType>, action: generalType): Array<TodoListType> => {
    switch (action.type) {
        case 'DELETE-TODO': {
            return state.filter(t => t.id !== action.payload.todolistID)
        }
        case 'UPDATE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.newTitle} : t)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.newID, title: action.payload.newTitle, filter: "All"}]
        }
        case 'FILTERED-TASKS': {
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.value} : t)
        }

        default:
            return state
    }
}


type generalType = deleteTodoActionType
    | updateTodolistTitleActionType
    | addTodolistActionType
    | filteredTasksActionType


export type deleteTodoActionType = ReturnType<typeof deleteTodoAC>
export const deleteTodoAC = (tID: string) => {
    return {
        type: 'DELETE-TODO',
        payload: {
            todolistID: tID
        }

    } as const
}


type updateTodolistTitleActionType = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (tID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST-TITLE',
        payload: {
            todolistID: tID,
            newTitle: newTitle,
        }
    } as const
}

export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = ( newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newID: v1(),
            newTitle: newTitle
        }
    } as const
}


type filteredTasksActionType = ReturnType<typeof filteredTasksAC>
export const filteredTasksAC = (tID: string, val: filterType) => {
    return {
        type: 'FILTERED-TASKS',
        payload: {
            todolistID: tID,
            value: val
        }
    } as const
}