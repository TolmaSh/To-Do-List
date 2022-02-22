import React from 'react';
import {Button, Stack} from "@mui/material";
import s from "../Todolist.module.css";
import {filterType} from "../../../store/reducers/TodolistReducer";


type propsType = {
    filterVal: filterType
    filterHandler: (value: filterType) => void
}
export const FilterBtns = React.memo(({filterVal, filterHandler}: propsType) => {
    return (
        <Stack className={s.buttons} spacing={2} direction="row">
            <Button variant={filterVal === 'All' ? "contained" : "outlined"} size='small'
                    onClick={() => filterHandler("All")}>All</Button>
            <Button color="success" variant={filterVal === 'Active' ? "contained" : "outlined"} size='small'
                    onClick={() => filterHandler("Active")}>Active</Button>
            <Button color="secondary" variant={filterVal === 'Completed' ? "contained" : "outlined"}
                    size='small'
                    onClick={() => filterHandler("Completed")}>Completed</Button>
        </Stack>
    );
});
