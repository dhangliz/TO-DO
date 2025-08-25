//create a class to represent a task
class Task{
    constructor(description) {
        this.description = description;
        this.completed = false;
    }
    //  method to toggle the completed status
    toggleCompleted() {
        this.completed = !this.completed;
    }
}

// DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Array to hold tasks
let tasks = [];
// Event listeners
addTaskButton.addEventListener('click', addTask);
// Functions to handle tasks
function addTask() {
    const description = taskInput.value.trim();
    if (description) {
        const newTask = new Task(description);
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
    }
}
// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.toggleCompleted();
            renderTasks();
        });

        const span = document.createElement('span');
        span.textContent = task.description;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}
document.addEventListener('DOMContentLoaded', renderTasks);