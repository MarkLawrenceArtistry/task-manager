import * as api from './js/api.js'
import * as ui from './js/ui.js'

document.addEventListener('DOMContentLoaded', () => {

    const taskListContainer = document.querySelector('#task-list-container')
    const addTaskBtn = document.querySelector('#add-task-btn')
    const addTaskModal = document.querySelector('#add-task-modal')
    const addTaskForm = document.querySelector('#add-task-form')
    const closeAddTaskModal = document.querySelector('#close-add-task-modal')
    
    const currentTaskID = null;

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

    const closeModal = (modal) => {
        modal.style.display = 'none'
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
            // for edit
        })
    }

    async function loadTasks() {
        try {
            const tasks = await api.fetchTasks()
            ui.renderTasks(tasks, taskListContainer)
        } catch(err) {
            console.error(err)
        }
    }

    loadTasks()
})