document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    const currentUser = localStorage.getItem('currentUser');
    
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
                ${currentUser 
                    ? <button id="logout-btn">Logout</button> 
                    : <button onclick="window.location.href='login.html'">Login</button>
                }
            </nav>
        `;
        
        // Logout functionality
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            });
        }
    }
});