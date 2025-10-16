 const noteInput=document.querySelector('#notes-input');
           document.getElementById("back-btn").addEventListener("click", function() {
    window.location.href = 'notes.html';
  });
  document.getElementById("save-btn").addEventListener("click", saveNote);
  document.querySelector("h1").textContent =localStorage.getItem("currentName") || "Notes";
  function saveNote(event) {
    event.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText === '') return;
    const subjectIndex=localStorage.getItem("currentIndex");
    const currentId=localStorage.getItem("currentNotes");
    let allContents = JSON.parse(localStorage.getItem("allNoteContents")) || {};
    if (!allContents[subjectIndex]) allContents[subjectIndex] = {};

    allContents[subjectIndex][currentId] = {
        content: noteText,
        updated: Date.now()
    };

    localStorage.setItem("allNoteContents", JSON.stringify(allContents));
}
window.addEventListener("DOMContentLoaded",function(){
    const currentId=localStorage.getItem("currentNotes");
    const subjectIndex=localStorage.getItem("currentIndex");
    const allContents = JSON.parse(localStorage.getItem("allNoteContents")) || {};
    if (allContents[subjectIndex] && allContents[subjectIndex][currentId]) {
        noteInput.value = allContents[subjectIndex][currentId].content || '';
    }
});