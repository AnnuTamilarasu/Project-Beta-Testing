const noteInput = document.querySelector('#notes-input');
const noteButton = document.querySelector('#add-note-btn');
const noteList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearCompletedBtn = document.querySelector('#clear-completed-btn');

const back = document.createElement('button');
back.textContent = 'back';
back.className = 'delete-btn';
back.style.marginTop = '10px';
document.querySelector('.notes-app').appendChild(back);

const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

const subjectIndex = localStorage.getItem('currentIndex');
const users = JSON.parse(localStorage.getItem('users')) || {};
const currentUserData = users[currentUser] || {};
const subjects = currentUserData.subjects || [];

if (subjectIndex !== null && subjects[subjectIndex]) {
    document.querySelector('.notes-app h1').textContent = `Notes for ${subjects[subjectIndex].subject}`;
}
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
    updateNoteCount();
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
    updateNoteCount();

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

function updateNoteCount() {
    const remaining = notes.filter(note => !note.completed).length;
    noteCount.textContent = `${remaining} note${remaining !== 1 ? 's' : ''} left`;
}

function toggleComplete(index) {
    notes[index].completed = !notes[index].completed;
    saveNotes();
    renderNotes();
    updateNoteCount();
}

function deleteNoteByIndex(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
    updateNoteCount();
}

function clearCompletedNotes() {
    notes = notes.filter(note => !note.completed);
    saveNotes();
    renderNotes();
    updateNoteCount();
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

clearCompletedBtn.addEventListener('click', clearCompletedNotes);

back.addEventListener('click', () => {
    window.location.href = 'course-add.html';
});

function init() {
    renderNotes();
    updateNoteCount();
}

init();