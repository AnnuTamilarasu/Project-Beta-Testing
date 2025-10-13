const todoInput = document.querySelector('#task-input');
const todoButton = document.querySelector('#add-task-btn');
const todoList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const deleteTask = document.querySelector('#clear-completed-btn');

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
    tasks.push(addedTask);
        todoInput.value = '';
        saveTasks();
        renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';
    
    if (tasks.length === 0) {
        todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one to get started! 🎯</div>';
        updateTaskCount();
        return;
    }
            
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';   
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" class="toggle-complete"/>
            <span>${task.text}</span>
            <button data-index="${index}" class="delete-btn">Delete</button> `;
        todoList.appendChild(li);
    });
    updateTaskCount();
}
function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} left`;
}
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}
function deleteTaskByIndex(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask(event);
    }
});

todoList.addEventListener('click', function(event) {
    if (event.target.classList.contains('toggle-complete')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        toggleComplete(index);
    }
    if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        deleteTaskByIndex(index);
    }
});

deleteTask.addEventListener('click', clearCompletedTasks);

function init() {
    renderTasks();
}
init();