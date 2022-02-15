import {rootReducerType} from "../index";
import {TodoListType} from "../reducers/TodolistReducer";

export const selectTodolists = (store: rootReducerType): TodoListType[] => store.todolist