export const removeTask = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            id,
        }
    } as const
}

export const addTask = (todolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            newTitle,
        }
    } as const
}

export const updateTask = (todolistID: string, id: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            id,
            newTitle,
        }
    } as const
}

export const changeTaskStatus = (todolistID: string, id: string, checked: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            id,
            checked,
        }
    } as const
}