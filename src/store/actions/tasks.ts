export const removeTask = (tID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID: tID,
            id: id
        }
    } as const
}

export const addTask = (tID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID: tID,
            newTitle: newTitle
        }
    } as const
}

export const updateTask = (tID: string, id: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID: tID,
            id: id,
            newTitle: newTitle
        }
    } as const
}

export const changeTaskStatus = (tID: string, id: string, checked: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID: tID,
            id: id,
            checked: checked
        }
    } as const
}