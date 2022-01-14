import React, {ChangeEvent, useState} from 'react';
import {IconButton, Input, ListItemText} from "@mui/material";
import s from "../Todolist.module.css";
import EditIcon from "@mui/icons-material/Edit";


type propsType = {
    title: string
    updateTaskCallback: ( value: string) => void
}

export const EditableTask: React.FC<propsType> = ({title, updateTaskCallback}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const onDoubleClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setEdit(true)
    }
    const onBlurHandler = () => {
        updateTaskCallback(newTitle)
        setEdit(false)

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    return (
        <>
            {edit
                ? <Input autoFocus
                         defaultValue={newTitle}
                         onBlur={onBlurHandler}
                         onClick={(e) => e.stopPropagation()}
                         onChange={onChangeHandler}
                         className={s.edit_input}
                />
                : <ListItemText
                    // onDoubleClick={onDoubleClickHandler}
                    primary={newTitle}
                />}
            <IconButton edge="end" aria-label="edit"
                        onClick={onDoubleClickHandler}
                        >
                <EditIcon />
            </IconButton>
        </>
    );
};
