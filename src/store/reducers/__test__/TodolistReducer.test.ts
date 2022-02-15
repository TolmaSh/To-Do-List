import {v1} from "uuid";
import {
    filterType,
    TodolistReducer,
    TodoListType,
} from "../TodolistReducer";
import {addTodolist, deleteTodo, filteredTasks, updateTodolistTitle} from "../../actions";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

})

test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, deleteTodo(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = "New Todolist";

    const endState = TodolistReducer(startState, addTodolist(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const newTodolistTitle = "New Todolist";

    const endState = TodolistReducer(startState, updateTodolistTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const newFilter: filterType = "Completed";


    const endState = TodolistReducer(startState, filteredTasks(todolistId2, newFilter));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
