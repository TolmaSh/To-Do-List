import React from 'react';
import {Checkbox, List, ListItem, ListItemButton} from "@mui/material";
import s from "../Todolist.module.css";
import {EditableTask} from "../EditableTask/EditableTask";
import {taskType} from "../../App";


type propsType = {
    todolistID: string
    tasksForTodolist: Array<taskType>
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    updateTask: (todolistID: string, id: string, value: string) => void
    onClickRemoveHandler: (id: string) => void
}
export const TaskList = ({
                             tasksForTodolist,
                             changeTaskStatus,
                             onClickRemoveHandler,
                             todolistID,
                             updateTask
                         }: propsType) => {

    const onClickUpdateTask = (id: string, value: string) => {
        updateTask(todolistID, id, value)
    }

    return (
        <List className={s.list}>
            {tasksForTodolist?.map(item => {
                return (
                    <ListItemButton className={s.list_item} key={item.id}
                    >
                        <ListItem
                            onClick={() => changeTaskStatus(todolistID, item.id, !item.isDone)}
                        >
                            <Checkbox
                                checked={item.isDone}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                            <EditableTask
                                updateTaskCallback={(title) => onClickUpdateTask(item.id, title)}
                                title={item.taskTitle}
                                onClickDeleteCallback={() => onClickRemoveHandler(item.id)}
                            />
                        </ListItem>
                    </ListItemButton>
                )
            })}
        </List>

    );
};
