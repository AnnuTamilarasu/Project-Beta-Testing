const todoInput = document.querySelector('task-input');
const todoButton = document.querySelector('add-task-btn');
const todoList = document.querySelector('task-list');
const taskCount = document.querySelector('task-count');
const deleteTask = document.querySelector('clear-completed-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function addTask(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText==='')return;
    const addedTask = {
        text: taskText,
        completed: false,
        id: Date.now()
    }
    tasks.push({ text: taskText, completed: false });
        todoInput.value = '';
        saveTasks();
        renderTasks();
        updateTaskCount();
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';   
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" class="toggle-complete"/>
            <span>${task.text}</span>
            <button data-index="${index}" class="delete-btn
">Delete</button>
        `;
        todoList.appendChild(li);
    });
}
function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} left`;
}
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateTaskCount();
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
    updateTaskCount();
}
function deleteTaskByIndex(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    updateTaskCount();
}
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateTaskCount();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

deleteTask.addEventListener('click', clearCompletedTasks);
todoButton.addEventListener('click', addTask);
todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {