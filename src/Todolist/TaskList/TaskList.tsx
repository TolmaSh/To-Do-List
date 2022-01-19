import React, {MouseEvent} from 'react';
import {Checkbox, IconButton, List, ListItem, ListItemButton} from "@mui/material";
import s from "../Todolist.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {taskType} from "../Todolist";
import {EditableTask} from "../EditableTask/EditableTask";


type propsType = {
    todolistID: string
    tasksForTodolist: Array<taskType>
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    updateTask: (todolistID: string, id: string, value: string) => void
    onClickRemoveHandler: (id: string, value: MouseEvent<HTMLButtonElement>) => void
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
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete"
                                            onClick={(event) => onClickRemoveHandler(item.id, event)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        >
                            <Checkbox
                                checked={item.isDone}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                            <EditableTask
                                updateTaskCallback={(title) => onClickUpdateTask(item.id, title)}
                                title={item.taskTitle}
                            />
                        </ListItem>
                    </ListItemButton>
                )
            })}
        </List>

    );
};
