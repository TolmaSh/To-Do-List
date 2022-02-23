import React, {FC, memo} from 'react';
import {taskType} from "../../../store/reducers/TaskReducer";
import {Checkbox, ListItem, ListItemButton} from "@mui/material";
import s from "../Todolist.module.css";
import {EditableTask} from "../EditableTask/EditableTask";
import {useDispatch} from "react-redux";
import {changeTaskStatus, removeTask, updateTask} from "../../../store/actions";

type propsType = {
    task: taskType
    todolistID: string
}

export const Task: FC<propsType> = memo(({task, todolistID}) => {
    console.log('Task')
    const dispatch = useDispatch()

    const onClickUpdateTask = () => {
        dispatch(updateTask(todolistID, task.id, task.taskTitle))
    }

    const onClickChangeTaskStatus = () => {
        dispatch(changeTaskStatus(todolistID, task.id, !task.isDone))
    } // Логика редюсера( смена isDone здесь или в редюсере? )

    const onClickRemoveTask = () => {
        dispatch(removeTask(todolistID, task.id))
    }

    return (
        <ListItemButton className={s.list_item} key={task.id}
        >
            <ListItem
                onClick={onClickChangeTaskStatus}
            >
                <Checkbox
                    checked={task.isDone}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <EditableTask
                    updateTaskCallback={onClickUpdateTask}
                    title={task.taskTitle}
                    onClickDeleteCallback={onClickRemoveTask}
                />
            </ListItem>
        </ListItemButton>
    );
});
