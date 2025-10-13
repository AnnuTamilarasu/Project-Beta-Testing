// Redirect to login if not logged in
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  window.location.href = 'login.html';
}

const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesListContainer = document.getElementById('notes-list');

// Load users and current user's notes
let users = JSON.parse(localStorage.getItem('users')) || {};
let notesList = users[currentUser]?.notes || [];

// Add a new note
function addNote(event) {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (!noteText) return;

    const newNote = {
        text: noteText,
        id: Date.now()
    };

    notesList.push(newNote);
    noteInput.value = '';
    saveNotes();
    renderNotes();
}

// Render notes
function renderNotes() {
    notesListContainer.innerHTML = '';
    notesList.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note.text}</span>
            <button data-index="${index}" class="delete-note-btn">Delete</button>
        `;
        notesListContainer.appendChild(li);
    });
}

// Delete a note
function deleteNoteByIndex(index) {
    notesList.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Save notes to localStorage
function saveNotes() {
    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[currentUser]) return;

    users[currentUser].notes = notesList;
    localStorage.setItem('users', JSON.stringify(users));
}

// Event listeners
addNoteBtn.addEventListener('click', addNote);
noteInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addNote(event);
});

notesListContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-note-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        deleteNoteByIndex(index);
    }
});

// Initialize
function init() {
    renderNotes();
}
init();
