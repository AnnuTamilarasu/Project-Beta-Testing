document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    
    if (navbarContainer) {
        navbarContainer.innerHTML = `
            <nav class="navbar">
                <button onclick="window.location.href='index.html'">Home</button>
                <button onclick="window.location.href='todo.html'">ToDo</button>
                <button onclick="window.location.href='course-add.html'">Notes</button>
                <div class="search-box">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">Search</button>
                </div>
                <button onclick="window.location.href='login.html'">Login</button>
            </nav>
        `;
    }
});