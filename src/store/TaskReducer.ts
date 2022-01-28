import {v1} from "uuid";
import {taskType} from "../App";

type TasksStateType = {
    [key: string]: taskType[]
}

export const TaskReducer = (state: TasksStateType, action: generalType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter((f: any) => f.id !== action.payload.id)
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
        case 'ADD-TASKS-FOR-NEW-TODOLIST': {
            return {...state, [action.payload.newId]: [{id: v1(), taskTitle: "Write your todo", isDone: false}]}
        }
        default :
            return state
    }
}


type generalType = removeTaskActionType
    | addTaskActionType
    | updateTaskActionType
    | changeTaskStatusActionType
    | addTasksForNewTodolistAC


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

type addTasksForNewTodolistAC = ReturnType<typeof addTasksForNewTodolistAC>
export const addTasksForNewTodolistAC = (newID: string) => {
    return {
        type: 'ADD-TASKS-FOR-NEW-TODOLIST',
        payload: {
            newId: newID
        }
    } as const
}