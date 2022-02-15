import {rootReducerType} from "../index";
import {TasksStateType} from "../reducers/TaskReducer";

export const selectTasks = (store: rootReducerType): TasksStateType => store.tasks