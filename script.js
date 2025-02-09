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

addTaskButton.addEventListener("click", () => {
    newTaskPopup.classList.add("show")
    container.classList.add("blur")
})
newTaskPopupCancel.addEventListener("click", () => {
    newTaskPopup.classList.remove("show")
    container.classList.remove("blur")
})

messagePopupBtn.addEventListener("click", () => {
    messagePopup.classList.remove("show")
    container.classList.remove("blur")
})

newTaskPopupAdd.addEventListener("click", () => {
    let tasks = loadTasks()
    let newTask = {
        title: newTaskTitle.value,
        description: newTaskDescription.value
    }
    newTaskTitle.value = ""
    newTaskDescription.value = ""
    tasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    newTaskPopup.classList.remove("show")
    container.classList.remove("blur")
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


function loadTasks() {
    let tasks = localStorage.getItem("tasks")
    tasks = tasks ? JSON.parse(tasks) : []
    return tasks
}