let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Display tasks
function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;

    });

    filteredTasks.forEach((task) => {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeBtn = document.createElement("button");

        completeBtn.textContent = task.completed ? "Undo" : "Done";
        completeBtn.className = "complete-btn";

        completeBtn.onclick = function () {
            task.completed = !task.completed;
            saveTasks();
        };

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function () {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
        };

        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttons);

        taskList.appendChild(li);

    });

    document.getElementById("taskCount").textContent =
        `${tasks.filter(t => !t.completed).length} pending | 
         ${tasks.filter(t => t.completed).length} completed`;

}

// Add new task
function addTask() {

    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    input.value = "";

    saveTasks();

}

// Filter tasks
function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();

}

// Save tasks in Local Storage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}

// Add task by pressing Enter
document.getElementById("taskInput").addEventListener("keypress", function(e) {

    if (e.key === "Enter") {
        addTask();
    }

});

// Initial display
displayTasks();