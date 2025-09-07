import * as tasksApi from './js/tasks-api.js'
import { renderTasks } from './js/tasks-ui.js'

document.addEventListener('DOMContentLoaded', () => {

    const taskListContainer = document.querySelector('#task-list-container')

    async function loadTasks() {
        try {
            const tasks = await tasksApi.fetchTasks()
            renderTasks(tasks, taskListContainer)
        } catch(err) {
            console.error(err)
        }
    }

    loadTasks()
})