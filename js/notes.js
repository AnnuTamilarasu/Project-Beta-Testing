const noteInput = document.querySelector('#notes-input');
const noteButton = document.querySelector('#add-note-btn');
const noteList = document.querySelector('#notes-list');
const imageBtn = document.getElementById("image-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const back = document.getElementById("back");

const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

const subjectIndex = localStorage.getItem('currentIndex');
const users = JSON.parse(localStorage.getItem('users')) || {};
const currentUserData = users[currentUser] || {};
const subjects = currentUserData.subjects || [];

let notes = subjects[subjectIndex]?.notes || [];

document.getElementById("mindmap-btn").addEventListener("click", addMindmap);

function saveNotes() {
    if (!users[currentUser]) users[currentUser] = {};
    if (!users[currentUser].subjects) users[currentUser].subjects = [];
    if (!users[currentUser].subjects[subjectIndex]) users[currentUser].subjects[subjectIndex] = {};
    users[currentUser].subjects[subjectIndex].notes = notes;
    localStorage.setItem('users', JSON.stringify(users));
}

function addNote(event) {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText === '') return;
    
    const addedNote = {
        text: noteText,
        completed: false,
        id: Date.now()
    };
    
    notes.push(addedNote);
    noteInput.value = '';
    saveNotes();
    renderNotes();
}

function addMindmap(event) {
    event.preventDefault();

    const mindmapName = prompt("Enter a name", "New Mindmap");
    if (!mindmapName) return;

    const newMindmap = {
        name: mindmapName,
        id: Date.now()
    };

    notes.push({
        text: mindmapName,
        completed: false,
        id: newMindmap.id,
        type: "mindmap"
    });

    saveNotes();
    renderNotes();

    localStorage.setItem('currentMindmap', newMindmap.id);
}

function renderNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = note.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${note.completed ? 'checked' : ''} data-index="${index}" class="toggle-complete"/>
            <span>${note.text}</span>
            ${note.type === 'mindmap'
                ? `<button data-index="${index}" class="open-mindmap-btn">Open</button>`
                : ''
            }
            <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        noteList.appendChild(li);
    });
}

function toggleComplete(index) {
    notes[index].completed = !notes[index].completed;
    saveNotes();
    renderNotes();
}

function deleteNoteByIndex(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function clearCompletedNotes() {
    notes = notes.filter(note => !note.completed);
    saveNotes();
    renderNotes();
}

noteButton.addEventListener('click', addNote);

noteInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addNote(event);
});

noteList.addEventListener('click', (event) => {
    const index = parseInt(event.target.getAttribute('data-index'));
    if (event.target.classList.contains('toggle-complete')) toggleComplete(index);
    if (event.target.classList.contains('delete-btn')) deleteNoteByIndex(index);
    if (event.target.classList.contains('open-mindmap-btn')) {
        localStorage.setItem('currentMindmap', notes[index].id);
        localStorage.setItem('currentIndex', subjectIndex);
        window.location.href = 'mindmap.html';
    }
});

if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', clearCompletedNotes);
}

if (back) {
    back.addEventListener('click', () => {
        window.location.href = 'course-add.html';
    });
}

if (imageBtn) {
    imageBtn.addEventListener('click', function () {
        console.log("Image button clicked");
        window.location.href = "https://test-321-49663579-96f47.firebaseapp.com";
    });
}

function init() {
    renderNotes();
}

init();