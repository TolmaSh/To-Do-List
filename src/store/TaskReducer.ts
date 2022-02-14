import {v1} from "uuid";
import {addTodolistActionType, deleteTodoActionType, todolistID_1, todolistID_2} from "./TodolistReducer";


export type taskType = {
    id: string,
    taskTitle: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: taskType[]
}
const initialState: TasksStateType = {
    [todolistID_1]: [
        {id: v1(), taskTitle: "HTML&CSS", isDone: true},
        {id: v1(), taskTitle: "JS", isDone: false},
        {id: v1(), taskTitle: "React", isDone: true},
        {id: v1(), taskTitle: "Redux", isDone: false},
        {id: v1(), taskTitle: "JSON", isDone: true}
    ],
    [todolistID_2]: [
        {id: v1(), taskTitle: "Beer", isDone: true},
        {id: v1(), taskTitle: "Milk", isDone: true},
        {id: v1(), taskTitle: "Bread", isDone: true},
        {id: v1(), taskTitle: "Salt", isDone: false},
        {id: v1(), taskTitle: "Water", isDone: false}
    ]
}

export const TaskReducer = (state = initialState, action: generalType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(f => f.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), taskTitle: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.id ? {
                    ...t,
                    taskTitle: action.payload.newTitle
                } : t)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(m => m.id === action.payload.id ? {
                    ...m,
                    isDone: action.payload.checked
                } : m)
            }
        }
        case "ADD-TODOLIST": {
            const newState = {...state}
            newState[action.payload.newID] = [{id: action.payload.newID, taskTitle: "Write your todo", isDone: false}]
            return newState
        }
        case "DELETE-TODO": {
            const newState = {...state}
            delete newState[action.payload.todolistID]
            return newState
        }
        default :
            return state
    }
}

type generalType = removeTaskActionType
    | addTaskActionType
    | updateTaskActionType
    | changeTaskStatusActionType
    | addTodolistActionType
    | deleteTodoActionType


type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (tID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID: tID,
            id: id
        }
    } as const
}

type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (tID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID: tID,
            newTitle: newTitle
        }
    } as const
}

type updateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (tID: string, id: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID: tID,
            id: id,
            newTitle: newTitle
        }
    } as const
}

type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (tID: string, id: string, checked: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID: tID,
            id: id,
            checked: checked
        }
    } as const
}