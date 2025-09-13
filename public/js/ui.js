

// TASKS
export const renderTasks = (tasks, divContainer) => {
    divContainer.innerHTML = ``

    if(tasks.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No tasks found.</p>`
        return 
    }

    const table = document.createElement('table')
    table.className = 'table tasks'
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `
    const tbody = table.querySelector('tbody')

    tasks.forEach(task => {
        const row = document.createElement('tr')
        row.className = 'task-item'
        row.dataset.id = task.id

        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.description}</td>
            <td>${task.priority}</td>
            <td>${task.progress}</td>
            <td>${task.status}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn edit-btn">Edit</button>
                    <button class="btn done-btn">Done</button>
                    <button class="btn delete-btn">Delete</button>
                </div>
            </td>
        `

        tbody.appendChild(row)
    });
    
    divContainer.appendChild(table)
}



// STATUS
export const renderStatus = (statuses, divContainer) => {
    divContainer.innerHTML = ``

    if(statuses.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No status found.</p>`
        return 
    }

    const table = document.createElement('table')
    table.className = 'table status'
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `
    const tbody = table.querySelector('tbody')

    statuses.forEach(status => {
        const row = document.createElement('tr')
        row.className = 'status-item'
        row.dataset.id = status.id

        row.innerHTML = `
            <td>${status.id}</td>
            <td>${status.name}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn edit-btn">Edit</button>
                    <button class="btn delete-btn">Delete</button>
                </div>
            </td>
        `

        tbody.appendChild(row)
    });
    
    divContainer.appendChild(table)
}

export const renderStatusToSelect = (statuses, divContainer) => {
    divContainer.innerHTML = ``

    if(statuses.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No status found.</p>`
        return 
    }

    const select = document.createElement('select')
    select.className = 'select status'
    select.id = 'task-status'
    
    statuses.forEach(status => {
        const option = document.createElement('option')
        option.className = 'select-status-item'
        option.value = status.name

        option.innerHTML = `
            ${status.name}
        `

        select.appendChild(option)
    });

    divContainer.appendChild(select)
    
}



// PRIORITY
export const renderPriorities = (priorities, divContainer) => {
    divContainer.innerHTML = ``

    if(priorities.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No priorities found.</p>`
        return 
    }

    const table = document.createElement('table')
    table.className = 'table priority'
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `
    const tbody = table.querySelector('tbody')

    priorities.forEach(priority => {
        const row = document.createElement('tr')
        row.className = 'priority-item'
        row.dataset.id = priority.id

        row.innerHTML = `
            <td>${priority.id}</td>
            <td>${priority.name}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn edit-btn">Edit</button>
                    <button class="btn delete-btn">Delete</button>
                </div>
            </td>
        `

        tbody.appendChild(row)
    });
    
    divContainer.appendChild(table)
}