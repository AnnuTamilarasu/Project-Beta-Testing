// nav.js - Navigation system
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <button onclick="window.location.href='index.html'">Course</button>
                <button onclick="window.location.href='todo.html'">Notes</button>
                <button onclick="window.location.href='notes.html'">Mindmap</button>
            </nav>
        `;
    }
});