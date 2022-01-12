import React, {ChangeEvent, FormEvent, KeyboardEvent, useState} from 'react';
import {Alert, Box, Fab} from "@mui/material";
import s from "../Todolist.module.css";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

type propsType = {
    callBack: (title: string) => void
}

export const AddItemForm = ({callBack}: propsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => { /// error меняется  при change
        setTitle(event.currentTarget.value);
        setError(false)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        if (title === "") {
            setError(true)
        } else {
            callBack(title)
            setTitle('')
        }
    }

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={s.inputWrapper}
                onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}

            >
                <TextField
                    error={error}
                    className={s.inputName} size="small" id="outlined-basic" label="Add your new todo"
                    variant="outlined"
                    value={title}
                    onChange={onChangeHandler} onKeyPress={onKeyPressHandler}

                />
                <Fab color="primary" aria-label="add" size="small" onClick={onClickHandler}>
                    <AddIcon/>
                </Fab>
            </Box>
            {error && <Alert className={s.alert} severity="error">Write a correct name todo</Alert>}
        </>
    );
};