import React, {FC, memo} from 'react';
import {List} from "@mui/material";
import s from "../Todolist.module.css";
import {taskType} from "../../../store/reducers/TaskReducer";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../../store/store";
import {TodoListType} from "../../../store/reducers/TodolistReducer";


type propsType = {
    todolistID: string
    todolist: TodoListType
};

export const TaskList: FC<propsType> = memo(({todolist, todolistID,}) => {

    console.log('TaskList')

    let tasks = useSelector<rootReducerType, taskType[]>(state => state.tasks[todolistID])
    if (todolist.filter === 'Active') {
        tasks = tasks.filter(task => !task.isDone);
    } else if (todolist.filter === 'Completed') {
        tasks = tasks.filter(f => f.isDone);
    }

    const mappedTasks = tasks.map((task: taskType) => (
        <Task
            key={task.id}
            todolistID={todolistID}
            task={task}
        />
    ))

    return (
        <List className={s.list}>
            {mappedTasks}
        </List>
    );
});
