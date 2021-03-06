import {TaskReducer, TasksStateType} from "../TaskReducer";
import {addTask, addTodolist, changeTaskStatus, deleteTodo, removeTask, updateTask} from "../../actions";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", taskTitle: "CSS", isDone: false},
            {id: "2", taskTitle: "JS", isDone: true},
            {id: "3", taskTitle: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", taskTitle: "bread", isDone: false},
            {id: "2", taskTitle: "milk", isDone: true},
            {id: "3", taskTitle: "tea", isDone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTask("todolistId2", "2");

    const endState = TaskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", taskTitle: "CSS", isDone: false},
            {id: "2", taskTitle: "JS", isDone: true},
            {id: "3", taskTitle: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", taskTitle: "bread", isDone: false},
            {id: "3", taskTitle: "tea", isDone: false}
        ]
    });
    expect(endState["todolistId2"].length).toBe(2)

});


test('correct task should be added to correct array', () => {


    const action = addTask("todolistId2", "juce");

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].taskTitle).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatus("todolistId2", "2", false);

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('title of task should be changed', () => {

    const action = updateTask("todolistId2", "2", "beer");

    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].taskTitle).toBe("JS");
    expect(endState["todolistId2"][1].taskTitle).not.toBe("milk");
    expect(endState["todolistId2"][1].taskTitle).toBe("beer");
});

test('new array should be added when new todolist is added', () => {


    const action = addTodolist("new todolist");

    const endState = TaskReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([{id: action.payload.newID, taskTitle: "Write your todo", isDone: false}]);
});


test('property with todolistId should be deleted', () => {

    const action = deleteTodo("todolistId2");

    const endState = TaskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});




