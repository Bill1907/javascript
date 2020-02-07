const taskForm = document.querySelector(".js-taskForm"),
    taskInput = taskForm.querySelector("input"),
    pendingList = document.querySelector(".js-pendingList"),
    finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

function filterFn(task) {
    return task.id === 1
}

let tasks = [];

function deleteTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    finishedList.removeChild(li);
    const cleantasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = cleantasks;
    savePendingTasks();
}

function checkTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
    finishedList.appendChild(li);
    const cleantasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = cleantasks;
    saveFinishedTasks();
}

function backTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.appendChild(li);
    finishedList.removeChild(li);
    const cleantasks = tasks.filter(function (task) {
        return task.id !== parseInt(li.id);
    });
    tasks = cleantasks;
    savePendingTasks();
}

function savePendingTasks() {
    localStorage.setItem(PENDING_LS, JSON.stringify(tasks));
}

function saveFinishedTasks() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(tasks));
}

function paintTask(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const cheBtn = document.createElement("button");
    const bacBtn = document.createElement("button");
    const newId = tasks.length + 1;
    delBtn.innerText = "X";
    cheBtn.innerText = "V";
    bacBtn.innerText = "<";
    delBtn.addEventListener("click", deleteTask);
    cheBtn.addEventListener("click", checkTask);
    bacBtn.addEventListener("click", backTask);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(cheBtn);
    li.appendChild(bacBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const taskObj = {
        text: text,
        id: newId
    }
    tasks.push(taskObj);
    savePendingTasks();
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = taskInput.value;
    paintTask(currentValue);
    taskInput.value = "";
}

function loadTasks() {
    const loadedTask = localStorage.getItem(PENDING_LS);
    if (loadedTask !== null) {
        const parsedTask = JSON.parse(loadedTask)
        parsedTask.forEach(function (task) {
            paintTask(task.text)
        });
    }
}

function init() {
    loadTasks();
    taskForm.addEventListener("submit", handleSubmit);

}

init();