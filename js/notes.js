const noteInput = document.querySelector('#notes-input');
const noteButton = document.querySelector('#add-note-btn');
const noteList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const imageBtn = document.getElementById("image-btn");
const back = document.getElementById("back");

// User authentication check
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

// Get subject data
const subjectIndex = localStorage.getItem('currentIndex');
const users = JSON.parse(localStorage.getItem('users')) || {};
const currentUserData = users[currentUser] || {};
const subjects = currentUserData.subjects || [];

// Initialize notes for current subject
let notes = subjects[subjectIndex]?.notes || [];

// Update page title if subject exists
if (subjectIndex !== null && subjects[subjectIndex]) {
    const titleElement = document.querySelector('.notes-app h1');
    if (titleElement) {
        titleElement.textContent = `Notes for ${subjects[subjectIndex].subject}`;
    }
}

// Add mindmap button listener
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
        id: Date.now(),
        type: "note"
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
        text: mindmapName,
        id: Date.now(),
        type: "mindmap"
    };

    notes.push(newMindmap);
    saveNotes();
    renderNotes();
    updateNoteCount();

    localStorage.setItem('currentMindmap', newMindmap.id);
}

function renderNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.innerHTML = `
            <div class="note-text note-btn" data-index="${index}">
                ${note.text}
            </div>
            <button data-index="${index}" class="delete-btn">Delete</button>
        `;
        noteList.appendChild(li);
    });
}

function updateNoteCount() {
    if (noteCount) {
        noteCount.textContent = `${notes.length} note${notes.length !== 1 ? 's' : ''} total`;
    }
}

function deleteNoteByIndex(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
    updateNoteCount();
}

// Event listeners
noteButton.addEventListener('click', addNote);

noteInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addNote(event);
});

noteList.addEventListener('click', (event) => {
    const index = parseInt(event.target.getAttribute('data-index'));
    
    if (event.target.classList.contains('delete-btn')) {
        deleteNoteByIndex(index);
    }
    
    if (event.target.classList.contains('note-btn')) {
        const note = notes[index];
        localStorage.setItem('currentIndex', subjectIndex);
        
        if (note.type === 'mindmap') {
            localStorage.setItem('currentMindmap', note.id);
            localStorage.setItem('currentMindmapName', note.text);
            window.location.href = 'mindmap.html';
        } else {
            localStorage.setItem('currentNotes', note.id);
            localStorage.setItem('currentName', note.text);
            window.location.href = 'innerNotes.html';
        }
    }
});

if (back) {
    back.addEventListener('click', () => {
        window.location.href = 'course-add.html';
    });
}

if (imageBtn) {
    imageBtn.addEventListener('click', () => {
        console.log("Image button clicked");
        window.location.href = "https://test-321-49663579-96f47.firebaseapp.com";
    });
}

function init() {
    renderNotes();
    updateNoteCount();
}

init();