import React, {ChangeEvent, FormEvent, KeyboardEvent} from 'react';
import {Alert, Box, Fab} from "@mui/material";
import s from "../Todolist.module.css";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

type propsType = {
    errorName: boolean
    taskTitle: string
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (event: KeyboardEvent<HTMLInputElement>) => void
    onClickHandler: () => void
}

export const AddTask = ({errorName, taskTitle, onChangeHandler, onKeyPressHandler, onClickHandler}: propsType) => {
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
                    error={errorName}
                    className={s.inputName} size="small" id="outlined-basic" label="Add your new todo"
                    variant="outlined"
                    value={taskTitle}
                    onChange={onChangeHandler} onKeyPress={onKeyPressHandler}

                />
                <Fab color="primary" aria-label="add" size="small" onClick={onClickHandler}>
                    <AddIcon/>
                </Fab>
            </Box>
            {errorName && <Alert className={s.alert} severity="error">Write a correct name todo</Alert>}
        </>
    );
};