const $ = document
const container = $.querySelector(".container")
const newTaskPopup = $.getElementById("new-task-popup")
const newTaskTitle = $.getElementById("new-task-title")
const newTaskDescription = $.getElementById("new-task-description")
const addTaskButton = $.getElementById("add-task-btn")
const newTaskPopupAdd = $.getElementById("new-task-popup-add")
const newTaskPopupCancel = $.getElementById("new-task-popup-cancel")
const messagePopup = $.getElementById("message-popup")
const messagePopupTitle = $.getElementById("message-popup-title")
const messagePopupText = $.getElementById("message-popup-text")
const messagePopupBtn = $.getElementById("message-popup-btn")
const editTaskPopup = $.getElementById("edit-task-popup")
const editTaskTitle = $.getElementById("edit-task-title")
const editTaskDescription = $.getElementById("edit-task-description")
const editTaskPopupCancel = $.getElementById("edit-task-popup-cancel")
const editTaskPopupApply = $.getElementById("edit-task-popup-apply")
const taskList = $.getElementById("task-list")

$.addEventListener("DOMContentLoaded", renderTasks())

addTaskButton.addEventListener("click", () => {
    newTaskPopup.classList.add("show")
    container.classList.add("blur")
    newTaskTitle.focus()
})
newTaskPopupCancel.addEventListener("click", () => {
    newTaskPopup.classList.remove("show")
    container.classList.remove("blur")
})

messagePopupBtn.addEventListener("click", () => {
    messagePopup.classList.remove("show")
    container.classList.remove("blur")
})

newTaskPopupAdd.addEventListener("click", addTask)

newTaskPopup.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        addTask()
    }
})

editTaskPopupCancel.addEventListener("click", () => {
    editTaskTitle.value = ""
    editTaskDescription.value = ""
    editTaskPopup.classList.remove("show")
    container.classList.remove("blur")
})

editTaskPopupApply.addEventListener("click", () => {
    editTask()
    editTaskTitle.value = ""
    editTaskDescription.value = ""
    editTaskPopup.classList.remove("show")
    container.classList.remove("blur")
})

editTaskPopup.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        editTask()
        editTaskTitle.value = ""
        editTaskDescription.value = ""
        editTaskPopup.classList.remove("show")
        container.classList.remove("blur")
    }
})

let targetTitleForEdit
// Add click event for task options elements
taskList.addEventListener("click", (e) => {
    let target = e.target.parentNode.parentNode
    let targetTitle = target.querySelector(".task-title").innerText

    if (e.target.classList.contains("remove-btn")) {
        removeTask(targetTitle)
    } else if (e.target.classList.contains("edit-task")) {
        editTaskPopup.classList.add("show")
        container.classList.add("blur")
        targetTitleForEdit = targetTitle

        let tasks = loadTasks()
        tasks.map((task) => {
            if (task.title == targetTitle) {
                editTaskTitle.value = task.title
                editTaskDescription.value = task.description
            }
        })
    }
})

function message(title, text) {
    if (title) {
        messagePopupTitle.innerText = title
        if (text) {
            messagePopupText.innerText = text
        } else {
            messagePopupText.innerText = ""
        }
        messagePopup.classList.add("show")
        container.classList.add("blur")
    } else {
        console.log("Error!")
    }
}

function addTask() {
    let tasks = loadTasks()
    let newTask = {
        title: newTaskTitle.value,
        description: newTaskDescription.value,
    }

    newTaskTitle.value = ""
    newTaskDescription.value = ""
    if (newTask.title) {
        tasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        newTaskPopup.classList.remove("show")
        container.classList.remove("blur")
        renderTasks()
    } else {
        newTaskPopup.classList.remove("show")
        container.classList.remove("blur")
        message("عنوان را وارد نکردید", "عنوان را باید وارد کنید")
    }
}

function loadTasks() {
    let tasks = localStorage.getItem("tasks")
    tasks = tasks ? JSON.parse(tasks) : []
    return tasks
}

function renderTasks() {
    let tasks = loadTasks()
    taskList.innerHTML = ""

    tasks.map((task) => {
        let taskElem = $.createElement("li")
        taskElem.classList.add("task")

        let taskOptionsElem = $.createElement("div")
        taskOptionsElem.classList.add("task-options")

        let taskEditBtn = $.createElement("li")
        taskEditBtn.classList = "fa fa-pen edit-task"
        taskOptionsElem.append(taskEditBtn)

        let taskRemoveBtn = $.createElement("li")
        taskRemoveBtn.classList = "fa fa-trash remove-btn"
        taskOptionsElem.append(taskRemoveBtn)

        taskElem.append(taskOptionsElem)

        let taskTitleElem = $.createElement("h2")
        taskTitleElem.innerText = task.title
        taskTitleElem.classList.add("task-title")
        taskElem.append(taskTitleElem)

        if (task.description) {
            let taskDescriptionElem = $.createElement("p")
            taskDescriptionElem.innerText = task.description
            taskDescriptionElem.classList.add("task-description")
            taskElem.append(taskDescriptionElem)
        }
        taskList.append(taskElem)
    })
}

function removeTask(targetTitle) {
    let tasks = loadTasks()

    tasks.map((task) => {
        if (task.title == targetTitle) {
            tasks.splice(tasks.indexOf(task), 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
        }
    })

    renderTasks()
}

function editTask() {
    let tasks = loadTasks()

    tasks.map((task) => {
        if (task.title == targetTitleForEdit) {
            if (editTaskTitle.value) {
                task.title = editTaskTitle.value
                task.description = editTaskDescription.value
                localStorage.setItem("tasks", JSON.stringify(tasks))
                renderTasks()
            } else {
                editTaskPopup.classList.remove("show")
                container.classList.remove("blur")
                message("خطا در هنگام ویرایش", "عنوان کار را وارد کنید")
            }
        }
    })
}
