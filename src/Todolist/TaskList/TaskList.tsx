import React, {MouseEvent} from 'react';
import {Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import s from "../Todolist.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {arrType} from "../Todolist";


type propsType = {
    tasksForTodolist: Array<arrType>
    changeTaskStatus: (id: string, value: boolean) => void
    onClickRemoveHandler: (id: string, value: MouseEvent<HTMLButtonElement>) => void
}

export const TaskList = ({tasksForTodolist, changeTaskStatus, onClickRemoveHandler}: propsType) => {
    return (
        <List className={s.list}>
            {tasksForTodolist.map(item => {
                return <ListItemButton className={s.list_item} key={item.id}
                >
                    <ListItem
                        onClick={() => changeTaskStatus(item.id, !item.isDone)}
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
                        <ListItemText
                            primary={item.title}
                        />
                    </ListItem>
                </ListItemButton>
            })}
        </List>
    );
};
