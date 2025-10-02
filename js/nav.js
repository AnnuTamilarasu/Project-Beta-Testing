document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
        <link rel="stylesheet" href="../css/style.css" />
        <nav class="navbar">
            <button id="btn2"><a href="index.html">Home</a></button>
            <button id="btn1"><a href="todo.html">ToDo</a></button>
            <button id="btn3"><a href="notes.html">Notes</a></button>
            <form class="search-box">
                <input type="text" id="search-input" placeholder="Search tasks..." />
                <button id="search-btn">Search</button>
            </form>
            <button id="btn3"><a href="login.html">Login</a></button>
        </nav>

    `;
    document.getElementById('navbar-container').innerHTML = navHTML;
});