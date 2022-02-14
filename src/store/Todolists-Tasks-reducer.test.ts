import {TaskReducer, TasksStateType} from "./TaskReducer";
import {addTodolistAC, TodolistReducer, TodoListType} from "./TodolistReducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newID);
    expect(idFromTodolists).toBe(action.payload.newID);
});
