import React from 'react';
import {Checkbox, List, ListItem, ListItemButton} from "@mui/material";
import s from "../Todolist.module.css";
import {EditableTask} from "../EditableTask/EditableTask";
import {useDispatch} from "react-redux";
import {taskType} from "../../../store/reducers/TaskReducer";
import {changeTaskStatus, updateTask} from "../../../store/actions";


type propsType = {
    todolistID: string
    tasksForTodolist: Array<taskType>
    onClickRemoveHandler: (id: string) => void
}
export const TaskList = ({
                             tasksForTodolist,
                             onClickRemoveHandler,
                             todolistID,
                         }: propsType) => {

    const dispatch = useDispatch()
    const onClickUpdateTask = (id: string, value: string) => {
        dispatch(updateTask(todolistID, id, value))
    }
    const onClickChangeTaskStatus = (id: string, isDone: boolean) => {
        dispatch(changeTaskStatus(todolistID, id, isDone))
    }

    return (
        <List className={s.list}>
            {tasksForTodolist?.map(item => {
                return (
                    <ListItemButton className={s.list_item} key={item.id}
                    >
                        <ListItem
                            onClick={() => onClickChangeTaskStatus(item.id, !item.isDone)}
                        >
                            <Checkbox
                                checked={item.isDone}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                            <EditableTask
                                updateTaskCallback={(title) => onClickUpdateTask(item.id, title)}
                                title={item.taskTitle}
                                onClickDeleteCallback={() => onClickRemoveHandler(item.id)}
                            />
                        </ListItem>
                    </ListItemButton>
                )
            })}
        </List>

    );
};
