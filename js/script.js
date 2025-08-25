// retrieve tasks from localStorage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Clase Task
class Task {
    constructor(description) {
        this.description = description;
        this.completed = false;
    }

    // change state
    toggleCompleted() {
        this.completed = !this.completed;
    }

    savedTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // return a <li> from this task
    createElement(index) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (this.completed) {
            li.classList.add('completed');
        }

        // checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this.completed;
        checkbox.addEventListener('change', () => {
            this.toggleCompleted();
            this.savedTasks()
            renderTasks();
        });

        // task description
        const span = document.createElement('span');
        span.textContent = this.description;

        // edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => {
            const newDescription = prompt('Edita la tarea:', this.description);
            if (newDescription !== null && newDescription.trim() !== '') {
                this.description = newDescription.trim();
                this.savedTasks()
                renderTasks();
            }
        });

        // dellete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'danger';
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            this.savedTasks()
            renderTasks();
        });

        // make the <li>
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        return li;
    }
}

// DOM
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');


// tasks array
let tasks = [];

tasks = savedTasks.map(t => {
    const task = new Task(t.description);
    task.completed = t.completed;
    return task;
});

// render tasks
function renderTasks() {
    taskList.innerHTML = ''; // empty the list
    tasks.forEach((task, index) => {
        taskList.appendChild(task.createElement(index));
    });
}

// add task
function addTask() {
    const description = taskInput.value.trim();
    if (description) {
        const newTask = new Task(description);
        tasks.push(newTask);
        renderTasks();
        taskInput.value = '';
    }
}

addTaskButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);
