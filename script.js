const $ = document
const taskInput = $.querySelector(".task-input")
const taskList = $.querySelector(".task-list")

let todo = []

// take task from taskInput
taskInput.addEventListener("keyup", (key) => {
    if (key.code == "Enter") {
        addTodo(taskInput.value)
        taskInput.value = ""
        renderTodoList(todo)
    }
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
        taskList.insertAdjacentHTML("beforeend", `<li><p>${item.title}</p><div><button class="status-btn"><i class="fas fa-check"></i></button><button class="remove-btn"><i class="fas fa-times"></i></button></div></li>`
        )
    });
}