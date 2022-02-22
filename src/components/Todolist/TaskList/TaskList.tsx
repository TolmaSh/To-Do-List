import React from 'react';
import {List} from "@mui/material";
import s from "../Todolist.module.css";
import {taskType} from "../../../store/reducers/TaskReducer";
import {Task} from "./Task";


type propsType = {
    todolistID: string
    tasksForTodolist: Array<taskType>
    onClickRemoveHandler: (id: string) => void
};

export const TaskList = React.memo(({tasksForTodolist, todolistID,}: propsType) => {

    console.log('TaskList')
    const mappedTasks = tasksForTodolist.map((task: taskType) => (
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
