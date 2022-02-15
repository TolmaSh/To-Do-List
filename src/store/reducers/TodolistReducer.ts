import {v1} from "uuid";
import {addTodolist, deleteTodo, filteredTasks, updateTodolistTitle} from "../actions";


export type filterType = "All" | "Active" | "Completed"
export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

export const todolistID_1 = v1()
export const todolistID_2 = v1()
const initialState: TodoListType[] = [
    {id: todolistID_1, title: 'What to learn', filter: "All"},
    {id: todolistID_2, title: 'What to buy', filter: "Active"}
]

export const TodolistReducer = (state = initialState, action: generalType): Array<TodoListType> => {
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


export type deleteTodoActionType = ReturnType<typeof deleteTodo>
type updateTodolistTitleActionType = ReturnType<typeof updateTodolistTitle>
export type addTodolistActionType = ReturnType<typeof addTodolist>
type filteredTasksActionType = ReturnType<typeof filteredTasks>
