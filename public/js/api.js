

export async function fetchTasks() {
    const response = await fetch('/api/tasks')
    if(!response.ok) {
        throw new Error('Error fetching tasks')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}

export async function createTask(taskInfo) {
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo)
    })
    if(!response.ok) {
        throw new Error('Error creating tasks')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}

export async function finishTask(currentTaskID) {
    const response = await fetch(`/api/tasks/${currentTaskID}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: 'Finished'
        })
    })
    if(!response.ok) {
        throw new Error('Error finishing task')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}

export async function deleteTask(currentTaskID) {
    const response = await fetch(`api/tasks/${currentTaskID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok) {
        throw new Error('Error deleting task')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data

}

export async function updateTask(currentTaskID, taskInfo) {
    const response = await fetch(`/api/tasks/${currentTaskID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo)
    })

    if(!response.ok) {
        throw new Error('Error updating task')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}