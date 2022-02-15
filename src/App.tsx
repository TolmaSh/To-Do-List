import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {selectTodolists} from './store/selectors';
import {addTodolist} from "./store/actions";


function App() {

    const dispatch = useDispatch()
    const todolists = useSelector(selectTodolists)


    const addTodolistCallBack = (newTitle: string) => {
        dispatch(addTodolist(newTitle))
    }

    return (
        <div className="App">
            <div className="todolist_add">
                <AddItemForm callBack={addTodolistCallBack} label={'Add your new todoList'}/>
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
