import React, {useState, KeyboardEvent, ChangeEvent} from "react";
// import {filterType} from "./App";
import s from "./Todolist.module.css"
import TextField from '@mui/material/TextField';
import {
    Alert,
    Button, Checkbox,
    Fab, IconButton, List, ListItem, ListItemButton, ListItemText,
    Stack
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


type propsType = {
    title: string
    task: Array<arrType>
    removeItem: (id: string) => void
    addTask: (newTitle: string) => void
    changeTaskStatus: (id: string, value: boolean) => void
    errorName:boolean
}

type arrType = {
    id: string,
    title: string,
    isDone: boolean
}

type filterType = "All" | "Active" | "Completed"

export const Todolist = ({title, task, removeItem, addTask, changeTaskStatus,errorName, ...props}: propsType) => {

    const [filterVal, setFilterVal] = useState<filterType>("All")
    let isDone = task
    if (filterVal === "Active") {
        isDone = task.filter(f => !f.isDone)
    }
    if (filterVal === "Completed") {
        isDone = task.filter(f => f.isDone)
    }

    const filteredItems = (val: filterType) => {
        setFilterVal(val)
    }

    const [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    const filterHandler = (value: filterType) => {
        filteredItems(value)
    }
    const onClickRemoveHandler = (id: string, value: any) => {
        value.stopPropagation()
        removeItem(id)
    }
    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>{title}</h3>
            <Stack className={s.inputWrapper} spacing={2} direction="row">
                {!errorName ?
                    <TextField
                           className={s.inputName} size="small" id="outlined-basic" label="Add your new todo"
                           variant="outlined"
                           value={taskTitle}
                           onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                : <TextField
                        error
                        className={s.inputName} size="small" id="outlined-basic" label="Add your new todo"
                        variant="outlined"
                        value={taskTitle}
                        onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                }
                <Fab color="primary" aria-label="add" size="small" onClick={onClickHandler}>
                    <AddIcon/>
                </Fab>
            </Stack>
            {errorName && <Alert className={s.alert} severity="error">Write a correct name todo</Alert>}
            <List className={s.list}>
                {isDone.map(item => {
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
            <div>
                <Stack className={s.buttons} spacing={2} direction="row">
                    <Button variant={filterVal === 'All' ? "contained" : "outlined"} size='small'
                            onClick={() => filterHandler("All")}>All</Button>
                    <Button color="success" variant={filterVal === 'Active' ? "contained" : "outlined"} size='small'
                            onClick={() => filterHandler("Active")}>Active</Button>
                    <Button color="secondary" variant={filterVal === 'Completed' ? "contained" : "outlined"}
                            size='small'
                            onClick={() => filterHandler("Completed")}>Completed</Button>
                </Stack>
            </div>
        </div>
    );
}