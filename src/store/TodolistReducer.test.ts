import {v1} from "uuid";
import {filterType, TodoListType} from "../App";
import {addTodolistAC, deleteTodoAC, filteredTasksAC, TodolistReducer, updateTodolistTitleAC} from "./TodolistReducer";

test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState =  TodolistReducer(startState, deleteTodoAC(todolistId1) )

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = TodolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
    const endState = TodolistReducer(startState, updateTodolistTitleAC(todolistId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: filterType = "Completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]


    const endState = TodolistReducer(startState, filteredTasksAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});