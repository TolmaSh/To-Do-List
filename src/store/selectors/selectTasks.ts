import {rootReducerType} from "../store";
import {TasksStateType} from "../reducers/TaskReducer";

export const selectTasks = (store: rootReducerType): TasksStateType => store.tasks