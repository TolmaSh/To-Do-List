import {rootReducerType} from "../store";
import {TodoListType} from "../reducers/TodolistReducer";

export const selectTodolists = (store: rootReducerType): TodoListType[] => store.todolist