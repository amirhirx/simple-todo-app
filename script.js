const $ = document
const container = $.querySelector(".container")
const newTaskPopup = $.getElementById("new-task-popup")
const addTaskButton = $.getElementById("add-task-btn")
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

message("سلام!", "این یک پیام آزمایشی است.")

function message(title, text) {
    if(title){
        messagePopupTitle.innerText = title
        if(text){
            messagePopupText.innerText = text
        }else{
            messagePopupText.innerText = ""
        }
        messagePopup.classList.add("show")
        container.classList.add("blur")
    
    }else{
        console.log("Error!")
    }
}