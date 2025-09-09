

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