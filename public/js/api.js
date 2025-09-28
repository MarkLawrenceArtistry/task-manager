

// TASKS
export async function fetchTasks() {
    const token = localStorage.getItem('token')

    const response = await fetch('/api/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(response.status === 401) {
        alert('Your session has expired. Please log in again.')
        localStorage.removeItem('token')
        window.location.href = 'index.html'
        throw new Error('Unauthorized')
    }

    if(!response.ok) {
        throw new Error('Error fetching tasks')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function fetchSingleTask(id) {
    const token = localStorage.getItem('token')
    const response = await fetch(`api/tasks/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if(!response.ok) {
        throw new Error('Error fetching single task')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function createTask(taskInfo) {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(taskInfo)
    })

    if (response.status === 401) {
        alert('Your session has expired. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
        throw new Error('Unauthorized');
    }

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
    const token = localStorage.getItem('token')

    const response = await fetch(`/api/tasks/${currentTaskID}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
    const token = localStorage.getItem('token')

    const response = await fetch(`api/tasks/${currentTaskID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
    const token = localStorage.getItem('token')

    const response = await fetch(`/api/tasks/${currentTaskID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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
export async function searchTask(searchStr) {
    const token = localStorage.getItem('token')

    const response = await fetch(`/api/tasks/search?description=${encodeURIComponent(searchStr)}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if(!response.ok) {
        throw new Error('Failed to search task.')
    }
    
    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}



// STATUS
export async function fetchStatus() {
    const response = await fetch('/api/status')
    if(!response.ok) {
        throw new Error('Error fetching status')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function fetchSingleStatus(id) {
    const response = await fetch(`api/status/${id}`)

    if(!response.ok) {
        throw new Error('Error fetching single status')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function createStatus(statusInfo) {
    const response = await fetch('/api/status', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(statusInfo)
    })
    if(!response.ok) {
        throw new Error('Error creating status')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function deleteStatus(statusID) {
    const response = await fetch(`api/status/${statusID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok) {
        throw new Error('Error deleting status')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data

}
export async function updateStatus(currentStatusID, statusInfo) {
    const response = await fetch(`/api/status/${currentStatusID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(statusInfo)
    })

    if(!response.ok) {
        throw new Error('Error updating status')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}



// PRIORITY
export async function fetchPriorities() {
    const response = await fetch('/api/priority')
    if(!response.ok) {
        throw new Error('Error fetching priorities')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function fetchSinglePriority(id) {
    const response = await fetch(`api/priority/${id}`)

    if(!response.ok) {
        throw new Error('Error fetching single priority')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function createPriority(priorityInfo) {
    const response = await fetch('/api/priority', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(priorityInfo)
    })
    if(!response.ok) {
        throw new Error('Error creating priority')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}
export async function deletePriority(priorityID) {
    const response = await fetch(`api/priority/${priorityID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok) {
        throw new Error('Error deleting priority')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data

}
export async function updatePriority(currentPriorityID, priorityInfo) {
    const response = await fetch(`/api/priority/${currentPriorityID}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(priorityInfo)
    })

    if(!response.ok) {
        throw new Error('Error updating priority')
    }

    const result = await response.json()
    if(!result.success) {
        throw new Error(result.data)
    }

    return result.data
}



// AUTH
export async function loginUser(credentials) {
    const response = await fetch('api/auth/login', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(credentials)
    })

    if(!response.ok) {
        throw new Error('Invalid username or password.')
    }

    const result = await response.json()
    return result
}

export async function registerUser(credentials) {
    const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(credentials)
    })

    if(!response.ok) {
        throw new Error('Internal Server Error (500)')
    }

    const result = await response.json()
    return result
}