

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
