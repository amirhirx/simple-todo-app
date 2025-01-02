const $ = document
const taskInput = $.querySelector(".task-input")
const taskList = $.querySelector(".task-list")
const taskAddButton = $.querySelector(".task-input-btn")

let todo = []

// take task from taskInput
taskInput.addEventListener("keyup", (key) => {
    if (key.code == "Enter") {
        addTodo(taskInput.value)
        taskInput.value = ""
        renderTodoList(todo)
    }
})

taskAddButton.addEventListener("click", () => {
    addTodo(taskInput.value)
    taskInput.value = ""
    renderTodoList(todo)
})
// Add task to todo
function addTodo(text) {
    let newTask = {
        title: text,
        status: false
    }
    todo.push(newTask)
}
// render todo in taskList
function renderTodoList(list) {
    taskList.innerHTML = ""
    list.forEach((item) => {
        taskList.insertAdjacentHTML("beforeend", `<li><div><i class="far fa-square"></i><p>${item.title}</p></div><div><i class="fas fa-pen"></i><i class="fas fa-trash"></i></div></li>`)
    });
}