import React, {MouseEvent} from 'react';
import {Checkbox, IconButton, Input, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import s from "../Todolist.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import {arrType} from "../Todolist";


type propsType = {
    todolistID: string
    tasksForTodolist: Array<arrType>
    changeTaskStatus: (todolistID: string, id: string, value: boolean) => void
    onClickRemoveHandler: (id: string, value: MouseEvent<HTMLButtonElement>) => void
}
export const TaskList = ({tasksForTodolist, changeTaskStatus, onClickRemoveHandler, todolistID}: propsType) => {
    return (
        <List className={s.list}>
            {tasksForTodolist.map(item => {
                return <ListItemButton className={s.list_item} key={item.id}
                >
                    <ListItem
                        onClick={() => changeTaskStatus(todolistID, item.id, !item.isDone)}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit"
                                            onClick={() => alert()}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete"
                                            onClick={(event) => onClickRemoveHandler(item.id, event)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </>
                        }

                    >
                        <Checkbox
                            checked={item.isDone}
                            inputProps={{'aria-label': 'controlled'}}
                        />
                        <ListItemText
                            primary={item.title}
                        />
                        {/*<Input autoFocus defaultValue={item.title}*/}
                        {/*       inputProps={ariaLabel}*/}
                        {/*       onClick={(e) => e.stopPropagation()}*/}
                        {/*       className={s.edit_input}*/}
                        {/*/>*/}
                    </ListItem>
                </ListItemButton>
            })}
        </List>
    );
};
