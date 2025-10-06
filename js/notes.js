const noteInput = document.querySelector('#notes-input');
const noteButton = document.querySelector('#add-note-btn');
const noteList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const clearCompletedBtn = document.querySelector('#clear-completed-btn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

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

function renderNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = note.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${note.completed ? 'checked' : ''} data-index="${index}" class="toggle-complete"/>
            <span>${note.text}</span>
            <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        noteList.appendChild(li);
    });
}

function updateNoteCount() {
    const remainingNotes = notes.filter(note => !note.completed).length;
    noteCount.textContent = `${remainingNotes} note${remainingNotes !== 1 ? 's' : ''} left`;
}

function clearCompletedNotes() {
    notes = notes.filter(note => !note.completed);
    saveNotes();
    renderNotes();
    updateNoteCount();
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

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

noteButton.addEventListener('click', addNote);
noteInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addNote(event);
    }
});

noteList.addEventListener('click', function(event) {
    if (event.target.classList.contains('toggle-complete')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        toggleComplete(index);
    }
    if (event.target.classList.contains('delete-btn')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        deleteNoteByIndex(index);
    }
});

clearCompletedBtn.addEventListener('click', clearCompletedNotes);

function init() {
    renderNotes();
    updateNoteCount();
}

init();