import * as api from './js/api.js'
import * as ui from './js/ui.js'

document.addEventListener('DOMContentLoaded', () => {

    // CONSTANTS
    const taskListContainer = document.querySelector('#task-list-container')
    const statusListContainer = document.querySelector('#status-list-container')
    const priorityListContainer = document.querySelector('#priority-list-container')


    // TASK
    const addTaskBtn = document.querySelector('#add-task-btn')
    const addTaskModal = document.querySelector('#add-task-modal')
    const addTaskForm = document.querySelector('#add-task-form')
    const closeAddTaskModal = document.querySelector('#close-add-task-modal')
    const updateTaskModal = document.querySelector('#update-task-modal')
    const updateTaskForm = document.querySelector('#update-task-form')
    const closeUpdateTaskModal = document.querySelector('#close-update-task-modal')
    const searchTaskInput = document.querySelector('#search-task-input')


    // STATUS
    const addStatusBtn = document.querySelector('#add-status-btn')
    const addStatusModal = document.querySelector('#add-status-modal')
    const addStatusForm = document.querySelector('#add-status-form')
    const closeAddStatusModal = document.querySelector('#close-add-status-modal')
    const editStatusModal = document.querySelector('#edit-status-modal')
    const editStatusForm = document.querySelector('#edit-status-form')
    const closeEditStatusModal = document.querySelector('#close-edit-status-modal')
    const statusContainer = document.querySelector('#status-container')


    // PRIORITY
    const addPriorityBtn = document.querySelector('#add-priority-btn')
    const addPriorityModal = document.querySelector('#add-priority-modal')
    const addPriorityForm = document.querySelector('#add-priority-form')
    const closeAddPriorityModal = document.querySelector('#close-add-priority-modal')
    const editPriorityModal = document.querySelector('#edit-priority-modal')
    const editPriorityForm = document.querySelector('#edit-priority-form')
    const closeEditPriorityModal = document.querySelector('#close-edit-priority-modal')
    const priorityContainer = document.querySelector('#priority-container')


    // BODY
    const body = document.body;
    const hamburgerBtn = document.querySelector("#hamburger-btn");
    const sidebar = document.querySelector(".sidebar");

    
    // AUTH
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-user-form');
    const logoutBtn = document.querySelector('#logout-btn');


    // VARIABLES
    let currentTaskID = null;
    let currentStatusID = null;
    let currentPriorityID = null;



    // UTILITY
    const closeModal = (modal) => {
        modal.style.display = 'none'
    }

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            sidebar.classList.toggle('show');
            body.classList.toggle('sidebar-open');
        });
    }

    body.addEventListener('click', (event) => {
        if (body.classList.contains('sidebar-open')) {
            if (!sidebar.contains(event.target)) {
                sidebar.classList.remove('show');
                body.classList.remove('sidebar-open');
            }
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && body.classList.contains('sidebar-open')) {
            sidebar.classList.remove('show');
            body.classList.remove('sidebar-open');
        }
    });



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
    async function loadPriorities() {
        try {
            const priorities = await api.fetchPriorities()
            ui.renderPriorities(priorities, priorityListContainer)
        } catch(err) {
            console.error(err)
        }
    }
    async function loadStatusInSelect() {
        try {
            const status = await api.fetchStatus()
            ui.renderStatusToSelect(status, statusContainer, 'task-status')
        } catch(err) {
            console.error(err)
        }
    }
    async function loadPriorityInSelect() {
        try {
            const priorities = await api.fetchPriorities()
            ui.renderPriorityToSelect(priorities, priorityContainer, 'task-priority')
        } catch(err) {
            console.error(err)
        }
    }



    // TASK
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
    if(addTaskForm) {
        const taskProgressValue = document.querySelector('#task-progress')
        const taskProgressRange = document.querySelector('#progress-range')
        taskProgressValue.value = taskProgressRange.value
        
        taskProgressRange.addEventListener("input", (event) => {
            taskProgressValue.value = event.target.value;
        });

        taskProgressRange.addEventListener("oninput", (event) => {
            taskProgressValue.value = event.target.value;
        });

        addTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const taskDescription = document.querySelector('#task-description').value
            if(taskDescription.trim().length === 0) {
                alert('Description cannot be empty.')
                return
            }

            const taskInfo = {
                description: taskDescription,
                priority: document.querySelector('#task-priority').value,
                progress: taskProgressValue.value,
                status: document.querySelector('#task-status').value
            }

            try {
                await api.createTask(taskInfo)
                alert('Added task successfully')
                closeModal(addTaskModal)
                addTaskForm.reset()
            } catch(err) {
                console.error(err)
            }

            loadTasks()
        })
    }
    if(updateTaskForm) {
        const updateTaskProgressValue = document.querySelector('#updated-task-progress')
        const updateTaskProgressRange = document.querySelector('#updated-progress-range')
        
        updateTaskProgressRange.addEventListener("input", (event) => {
            updateTaskProgressValue.value = event.target.value;
        });

        updateTaskProgressRange.addEventListener("oninput", (event) => {
            updateTaskProgressValue.value = event.target.value;
        });


        // FETCHING PRIORITY FROM DROPDOWN

        updateTaskForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const taskInfo = {
                description: document.querySelector('#updated-task-description').value || null,
                priority: document.querySelector('#updated-task-priority').value || null,
                progress: updateTaskProgressValue.value,
                status: document.querySelector('#updated-task-status').value || null
            }

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

                    const task = await api.fetchSingleTask(taskID)
                    document.querySelector('#updated-task-description').value = task.description
                    document.querySelector('#updated-progress-range').value = task.progress
                    document.querySelector('#updated-task-progress').value = task.progress

                    const selectedStatus = task.status
                    const status = await api.fetchStatus()
                    ui.renderStatusToSelect(status, document.querySelector('#updated-status-container'), 'updated-task-status', selectedStatus)

                    const selectedPriority = task.priority
                    const priorities = await api.fetchPriorities()
                    ui.renderPriorityToSelect(priorities, document.querySelector('#updated-priority-container'), 'updated-task-priority', selectedPriority)
                    
                } catch(err) {
                    console.error(err)
                }
            }
        })
    }
    if(priorityContainer) {
        loadPriorityInSelect()
    }
    if(searchTaskInput) {
        searchTaskInput.addEventListener('input', async (e) => {
            if(searchTaskInput.value === '') {
                loadTasks()
            }
            e.preventDefault()

            try {
                const tasks = await api.searchTask(searchTaskInput.value)

                ui.renderTasks(tasks, taskListContainer)
            } catch(err) {
                console.error(err)
            }
        })
    }



    // STATUS
    if(addStatusBtn) {
        addStatusBtn.addEventListener('click', (e) => {
            e.preventDefault()

            addStatusModal.style.display = 'flex'
        })

        closeAddStatusModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(addStatusModal)
        })
    }
    if(addStatusForm) {
        addStatusForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const statusName = document.querySelector('#status-name').value
            if(statusName.trim().length === 0) {
                alert('Status name cannot be empty.')
                return
            }

            const statusInfo = {
                name: statusName
            }

            try {
                await api.createStatus(statusInfo)
                alert('Added status successfully')
                closeModal(addStatusModal)
            } catch(err) {
                console.error(err)
            }

            loadStatus()
        })
    }
    if(statusListContainer) {
        statusListContainer.addEventListener('click', async (e) => {
            e.preventDefault()

            const target = e.target
            const statuskItem = target.closest('.status-item');
            if (!statuskItem) return;

            const statusID = statuskItem.dataset.id

            // for delete
            if(target.classList.contains('delete-btn')) {
                if(confirm('Are you sure you want to delete this status?')) {
                    try {
                        await api.deleteStatus(statusID)
                        loadStatus()
                    } catch(err) {
                        console.error(err)
                    }
                }
            }

            if(target.classList.contains('edit-btn')) {
                try {
                    currentStatusID = statusID
                    editStatusModal.style.display = 'flex'

                    const status = await api.fetchSingleStatus(statusID)
                    document.querySelector('#edit-status-name').value = status.name
                } catch(err) {
                    console.error(err)
                }
            }
        })
    }
    if(closeEditStatusModal) {
        closeEditStatusModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(editStatusModal)
        })
    }
    if(editStatusForm) {
        editStatusForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const statusInfo = {
                name: document.querySelector('#edit-status-name').value
            }

            try {
                await api.updateStatus(currentStatusID, statusInfo)
                alert('Updated status successfully')
                closeModal(editStatusModal)
            } catch(err) {
                console.error(err)
            }

            loadStatus()
        })
    }
    if(statusContainer) {
        loadStatusInSelect()
    }




    // PRIORITY
    if(addPriorityBtn) {
        addPriorityBtn.addEventListener('click', (e) => {
            e.preventDefault()

            addPriorityModal.style.display = 'flex'
        })

        closeAddPriorityModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(addPriorityModal)
        })
    }
    if(addPriorityForm) {
        addPriorityForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const priorityName = document.querySelector('#priority-name').value
            if(priorityName.trim().length === 0) {
                alert('Priority name cannot be empty.')
                return
            }

            const priorityInfo = {
                name: priorityName
            }

            try {
                await api.createPriority(priorityInfo)
                alert('Added priority successfully')
                closeModal(addPriorityModal)
            } catch(err) {
                console.error(err)
            }

            loadPriorities()
        })
    }
    if(priorityListContainer) {
        priorityListContainer.addEventListener('click', async (e) => {
            e.preventDefault()

            const target = e.target
            const priorityItem = target.closest('.priority-item');
            if (!priorityItem) return;
            
            const priorityID = priorityItem.dataset.id

            // for delete
            if(target.classList.contains('delete-btn')) {
                if(confirm('Are you sure you want to delete this priority?')) {
                    try {
                        await api.deletePriority(priorityID)
                        loadPriorities()
                    } catch(err) {
                        console.error(err)
                    }
                }
            }

            if(target.classList.contains('edit-btn')) {
                try {
                    currentPriorityID = priorityID
                    editPriorityModal.style.display = 'flex'

                    const priority = await api.fetchSinglePriority(priorityID)
                    document.querySelector('#edit-priority-name').value = priority.name
                } catch(err) {
                    console.error(err)
                }
            }
        })
    }
    if(editPriorityForm) {
        editPriorityForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const priorityInfo = {
                name: document.querySelector('#edit-priority-name').value
            }

            try {
                await api.updatePriority(currentPriorityID, priorityInfo)
                alert('Updated priority successfully')
                closeModal(editPriorityModal)
            } catch(err) {
                console.error(err)
            }

            loadPriorities()
        })
    }
    if(closeEditPriorityModal) {
        closeEditPriorityModal.addEventListener('click', (e) => {
            e.preventDefault()

            closeModal(editPriorityModal)
        })
    }




    // AUTH
    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const credentials = {
                username: document.querySelector('#username-login').value,
                password: document.querySelector('#password-login').value
            }

            try {
                const result = await api.loginUser(credentials)

                if(result.success && result.token) {
                    localStorage.setItem('toke', result.token)
                    alert('Welcome back!')
                    window.location.href = 'dashboard.html'
                } else {
                    alert(result.data || 'Wrong credentials')
                    loginForm.reset()
                }
            } catch (err) {
                alert('Wrong credentials')
                loginForm.reset()
                console.errror(err)
            }
        })
    }
    if(registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault()

            const credentials = {
                username: document.querySelector('#username-register').value,
                password: document.querySelector('#password-register').value
            }

            try {
                await api.registerUser(credentials)
                alert('Account created successfully!')
                registerForm.reset()
            } catch (err) {
                alert('Error! check console')
                registerForm.reset()
                console.errror(err)
            }
        })
    }
    if(logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault()

            if(confirm('Are you sure you want to logout tho?')) {
                sessionStorage.clear()
                window.location.href = 'index.html'
            }
        })
    }



    // CALLERS
    if(window.location.pathname.endsWith("config.html")) {
        loadStatus()
        loadPriorities()
    }
    
    if(window.location.pathname.endsWith("dashboard.html")) {
        loadTasks()
    }

    if(!window.location.pathname.endsWith('index.html') && !sessionStorage.getItem('isLoggedIn')) {
        alert('Session does not exist. Redirecting..')
        window.location.href = 'index.html'
    }
})