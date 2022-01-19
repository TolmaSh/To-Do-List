import React, {ChangeEvent, useState} from 'react';
import s from "../Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Input} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


type propsType = {
    title: string
    deleteTaskCallBack: () => void
    updateTitleCallback: (title:string) => void
}
export const EditableTitle: React.FC<propsType> = ({title, deleteTaskCallBack, updateTitleCallback}) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onBlurHandler = () => {
        updateTitleCallback(newTitle)
        setEdit(false)

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const onClickHandler = () => {
        setEdit(true)
    }

    return (
        <h3 className={s.title}>
            {
                edit
                    ?  <Input autoFocus
                              defaultValue={newTitle}
                              onBlur={onBlurHandler}
                              onClick={(e) => e.stopPropagation()}
                              onChange={onChangeHandler}

                    />
                        : <>{title}</>
            }
                        <IconButton aria-label="edit" onClick={onClickHandler}>
                            <EditIcon />
                        </IconButton>
                         <IconButton aria-label="delete" onClick={deleteTaskCallBack}>
                            <HighlightOffIcon/>
                        </IconButton>

                    </h3>
                );
            };
