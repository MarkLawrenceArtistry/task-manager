import * as api from './js/api.js'
import * as ui from './js/ui.js'

document.addEventListener('DOMContentLoaded', () => {

    // CONSTANTS
    const taskListContainer = document.querySelector('#task-list-container')
    const statusListContainer = document.querySelector('#status-list-container')
    const priorityListContainer = document.querySelector('#status-list-container')

    const addTaskBtn = document.querySelector('#add-task-btn')
    const addTaskModal = document.querySelector('#add-task-modal')
    const addTaskForm = document.querySelector('#add-task-form')
    const closeAddTaskModal = document.querySelector('#close-add-task-modal')

    const updateTaskModal = document.querySelector('#update-task-modal')
    const updateTaskForm = document.querySelector('#update-task-form')
    const closeUpdateTaskModal = document.querySelector('#close-update-task-modal')
    
    let currentTaskID = null;



    // CLOSE MODAL BUTTONS
    if(addTaskBtn) {
        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault()

            addTaskModal.style.display = 'flex'
        })

        closeAddTaskModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(addTaskModal)
        })
    }
    if(closeUpdateTaskModal) {
        closeUpdateTaskModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(updateTaskModal)
        })
    }
    const closeModal = (modal) => {
        modal.style.display = 'none'
    }



    // INITIALIZERS
    async function loadTasks() {
        try {
            const tasks = await api.fetchTasks()
            ui.renderTasks(tasks, taskListContainer)
        } catch(err) {
            console.error(err)
        }
    }
    async function loadStatus() {
        try {
            const statuses = await api.fetchStatus()
            ui.renderStatus(statuses, statusListContainer)
        } catch(err) {
            console.error(err)
        }
    }



    // TASK
    if(addTaskForm) {
        addTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const taskInfo = {
                description: document.querySelector('#task-description').value,
                priority: document.querySelector('#task-priority').value,
                progress: document.querySelector('#task-progress').value,
                status: document.querySelector('#task-status').value
            }

            try {
                await api.createTask(taskInfo)
                alert('Added task successfully')
                closeModal(addTaskModal)
            } catch(err) {
                console.error(err)
            }

            loadTasks()
        })
    }
    if(updateTaskForm) {
        updateTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            console.log(document.querySelector('#update-task-description'))

            const taskInfo = {
                description: document.querySelector('#updated-task-description').value || null,
                priority: document.querySelector('#updated-task-priority').value || null,
                progress: Number(document.querySelector('#updated-task-progress').value) || null,
                status: document.querySelector('#updated-task-status').value || null
            }

            console.log(taskInfo)

            try {
                await api.updateTask(currentTaskID, taskInfo)
                alert('Updated task successfully')
                closeModal(updateTaskModal)
            } catch(err) {
                console.error(err)
            }

            loadTasks()
        })
    }
    if(taskListContainer) {
        taskListContainer.addEventListener('click', async (e) => {
            e.preventDefault()

            const target = e.target
            const taskItem = target.closest('.task-item');
            if (!taskItem) return;

            const taskID = taskItem.dataset.id

            // for delete
            if(target.classList.contains('delete-btn')) {
                if(confirm('Are you sure you want to delete this task?')) {
                    try {
                        await api.deleteTask(taskID)
                        loadTasks()
                    } catch(err) {
                        console.error(err)
                    }
                }
            }

            // for done
            if(target.classList.contains('done-btn')) {
                if(confirm('Are you sure you want to finish this task?')) {
                    try {
                        await api.finishTask(taskID)
                        loadTasks()
                    } catch(err) {
                        console.error(err)
                    }
                }
            }

            // for edit
            if(target.classList.contains('edit-btn')) {
                try {
                    currentTaskID = taskID
                    updateTaskModal.style.display = 'flex'
                } catch(err) {
                    console.error(err)
                }
            }
        })
    }



    if(window.location.pathname.endsWith("index.html")) {
        loadTasks()
    }
    if(window.location.pathname.endsWith("config.html")) {
        loadStatus()
    }

})