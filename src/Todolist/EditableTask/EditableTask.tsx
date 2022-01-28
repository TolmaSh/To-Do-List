import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from 'react';
import {IconButton, Input, ListItemText} from "@mui/material";
import s from "../Todolist.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


type propsType = {
    title: string
    updateTaskCallback: (value: string) => void
    onClickDeleteCallback: () => void
}

export const EditableTask: React.FC<propsType> = ({title, updateTaskCallback, onClickDeleteCallback}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const activateEditMode = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setEdit(true)
    }
    const onBlurHandler = () => {
        updateTaskCallback(newTitle)
        setEdit(false)

    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onBlurHandler()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onClickDeleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        onClickDeleteCallback()
    }
    return (
        <>
            {edit
                ? <Input autoFocus
                         defaultValue={newTitle}
                         onBlur={onBlurHandler}
                         onClick={(e) => e.stopPropagation()}
                         onChange={onChangeHandler}
                         onKeyPress={onKeyPressHandler}
                         className={s.edit_input}
                />
                : <ListItemText
                    primary={newTitle}
                />}
            <IconButton edge="end" aria-label="edit"
                        onClick={activateEditMode}
            >
                <EditIcon/>
            </IconButton>
            <IconButton edge="end" aria-label="delete"
                        onClick={onClickDeleteHandler}>
                <DeleteIcon/>
            </IconButton>
        </>
    );
};
