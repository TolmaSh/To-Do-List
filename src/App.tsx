import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {selectTodolists} from './store/selectors';
import {addTodolist} from "./store/actions";


function App() {
    const dispatch = useDispatch()
    const todolists = useSelector(selectTodolists)
    const addTodolistCallBack = useCallback((newTitle: string) => {
        dispatch(addTodolist(newTitle))
    }, [dispatch])
    const mappedTodolists = todolists.map(t => <Todolist key={t.id} todolistID={t.id} />)

    return (
        <div className="App">
            <div className="todolist_add">
                <AddItemForm callBack={addTodolistCallBack} label={'Add your new todoList'}/>
            </div>
            <div className="todolist_wrapper">
                {mappedTodolists}
            </div>
        </div>
    );
}

export default App;
