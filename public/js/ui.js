
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

        // Custom Styling
        let taskPriorityClass = 'indicator '
        if(task.priority === 'High') {
            taskPriorityClass += 'high'
        } else if(task.priority === 'Low') {
            taskPriorityClass += 'low'
        } else if(task.priority === 'Medium') {
            taskPriorityClass += 'medium'
        } else if(task.priority === 'Very High') {
            taskPriorityClass += 'very-high'
        }

        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.description}</td>
            <td>
                <div class="${taskPriorityClass}">
                    ${task.priority}
                </div>
            </td>
            
            <td>
                <p style="text-align: center; margin-bottom: 5px;">${task.progress}%</p>
                <div class="progress-bar-container" style="width: 100%;">
                    <div class="progress-bar-value" style="width: ${task.progress}%;"></div>
                </div>
            </td>

            <td>${task.status}</td>
            <td>
                <div class="action-buttons">
                    <img src="../assets/edit.png" class="image-btn edit-btn">
                    <img src="../assets/check-mark.png" class="image-btn done-btn">
                    <img src="../assets/trash.png" class="image-btn delete-btn">
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
export const renderStatusToSelect = (statuses, divContainer, elementId, selectedStatus) => {
    divContainer.innerHTML = ``

    if(statuses.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No status found.</p>`
        return 
    }

    const select = document.createElement('select')
    select.className = 'select status'
    select.id = elementId
    
    statuses.forEach(status => {
        const option = document.createElement('option')
        option.className = 'select-status-item'
        option.value = status.name
        if(selectedStatus === status.name) {
            option.setAttribute('selected', '')
        }

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
export const renderPriorityToSelect = (priorities, divContainer, elementId, selectedPriority) => {
    divContainer.innerHTML = ``

    if(priorities.length === 0) {
        divContainer.innerHTML = `<p style="text-align:center;">No priority found.</p>`
        return 
    }

    const select = document.createElement('select')
    select.className = 'select priority'
    select.id = elementId
    
    priorities.forEach(priority => {
        const option = document.createElement('option')
        option.className = 'select-priority-item'
        option.value = priority.name
        if(selectedPriority === priority.name) {
            option.setAttribute('selected', '')
        }

        option.innerHTML = `
            ${priority.name}
        `

        select.appendChild(option)
    });

    divContainer.appendChild(select)
    
}



// DASHBOARD
export const renderAnalytics = (divContainer) => {
    divContainer.innerHTML = ``

    new Chart(divContainer, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}