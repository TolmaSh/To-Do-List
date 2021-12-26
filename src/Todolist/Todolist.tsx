import React, {useState, KeyboardEvent, ChangeEvent} from "react";
// import {filterType} from "./App";
import s from "./Todolist.module.css"
import TextField from '@mui/material/TextField';
import {
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
}

type arrType = {
    id: string,
    title: string,
    isDone: boolean
}

type filterType = "All" | "Active" | "Completed"

export const Todolist = (props: propsType) => {

    const [filterVal, setFilterVal] = useState<filterType>("All")
    let isDone = props.task
    if (filterVal === "Active") {
        isDone = props.task.filter(f => !f.isDone)
    }
    if (filterVal === "Completed") {
        isDone = props.task.filter(f => f.isDone)
    }

    const filteredItems = (val: filterType) => {
        setFilterVal(val)
    }

    const [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }
    const onClickHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    // const filteredAllHandler = () => {
    //     filteredItems("All")
    // }
    // const filteredActiveHandler = () => {
    //     filteredItems("Active")
    // }
    // const filteredCompletedHandler = () => {
    //     filteredItems(value)
    // }
    const filterHandler = (value: filterType) => {
        filteredItems(value)
    }
    const onClickRemoveHandler = (id: string) => {
        props.removeItem(id)
    }

    return (
        <div className={s.wrapper}>
            <h3 className={s.title}>{props.title}</h3>
            <Stack spacing={2} direction="row">
                <TextField size="small" id="outlined-basic" label="Add your new todo" variant="outlined"
                           value={taskTitle}
                           onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <Fab color="primary" aria-label="add" size="small" onClick={onClickHandler}>
                    <AddIcon/>
                </Fab>
            </Stack>

            <List className={s.list}>
                {isDone.map(item => {
                    return <ListItemButton className={s.list_item} key={item.id}>
                        <ListItem
                                  secondaryAction={
                                      <IconButton edge="end" aria-label="delete"
                                                  onClick={() => onClickRemoveHandler(item.id)}>
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
                <Stack spacing={2} direction="row">
                    <Button variant="outlined" size='small' onClick={() => filterHandler("All")}>All</Button>
                    <Button color="success" variant="outlined" size='small'
                            onClick={() => filterHandler("Active")}>Active</Button>
                    <Button color="secondary" variant="outlined" size='small'
                            onClick={() => filterHandler("Completed")}>Completed</Button>
                </Stack>
            </div>
        </div>
    );
}