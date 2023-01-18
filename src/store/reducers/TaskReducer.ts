import {v1} from "uuid";
import {addTask, changeTaskStatus, removeTask, updateTask} from "../actions";
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
                    isDone: !action.payload.checked
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


type removeTaskActionType = ReturnType<typeof removeTask>
type addTaskActionType = ReturnType<typeof addTask>
type updateTaskActionType = ReturnType<typeof updateTask>
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatus>
