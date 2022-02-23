import React, {FC, memo, useCallback} from "react";
import s from "./Todolist.module.css";
import {FilterBtns} from "./FilterBtns/FilterBtns";
import {TaskList} from "./TaskList/TaskList";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableTitle} from "./EditableTitle/EditableTitle";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {filterType, TodoListType} from "../../store/reducers/TodolistReducer";
import {addTask, deleteTodo, filteredTasks, updateTodolistTitle} from "../../store/actions";


type propsType = {
    todolistID: string
}

export const Todolist: FC<propsType> = memo(({todolistID}) => {
    console.log('Todolist')

    const dispatch = useDispatch()

    const todolist = useSelector<rootReducerType, TodoListType>(state => state.todolist
        .filter(todo => todo.id === todolistID)[0])
    const addTaskCallBack = useCallback((title: string) => {
        dispatch(addTask(todolistID, title))
    }, [dispatch, todolistID]);

    const onClickFilteredTask = useCallback((value: filterType) => {
        dispatch(filteredTasks(todolistID, value))
    }, [dispatch, todolistID])

    const updateTodolistTitleCallback = useCallback((title: string) => {
        dispatch(updateTodolistTitle(todolistID, title))
    }, [dispatch, todolistID])

    const onClickDeleteTodoHandler = useCallback(() => {
        dispatch(deleteTodo(todolistID))
    }, [dispatch, todolistID])


    return (
        <div className={s.wrapper}>
            <EditableTitle deleteTaskCallBack={onClickDeleteTodoHandler} title={todolist.title}
                           updateTitleCallback={updateTodolistTitleCallback}/>
            <AddItemForm
                callBack={addTaskCallBack}
            />
            <TaskList
                todolistID={todolistID}
                todolist={todolist}
            />
            <FilterBtns filterVal={todolist.filter}
                        filterHandler={onClickFilteredTask}
            />
        </div>
    );
});