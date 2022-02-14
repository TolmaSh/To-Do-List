import React from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./Todolist/AddItemForm/AddItemForm";
import {addTodolistAC, TodoListType} from "./store/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";


function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<rootReducerType, TodoListType[]>(state => state.todolist)


    const addTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }

    return (
        <div className="App">
            <div className="todolist_add">
                <AddItemForm callBack={addTodolist} label={'Add your new todoList'}/>
            </div>
            <div className="todolist_wrapper">
                {todolists.map(t => {
                    return (
                        <Todolist
                            key={t.id}
                            todolistID={t.id}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default App;
