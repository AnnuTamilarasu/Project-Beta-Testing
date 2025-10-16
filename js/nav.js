document.addEventListener('DOMContentLoaded', function() {
  const navbarContainer = document.getElementById('navbar-container');
  const currentUser = localStorage.getItem('currentUser');

  if (navbarContainer) {
    navbarContainer.innerHTML = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
    <nav class="navbar">
        <button onclick="window.location.href='index.html'">Home</button>
        <button onclick="window.location.href='todo.html'">ToDo</button>
        <button onclick="window.location.href='course-add.html'">Notes</button>
        <div class="search-box">
          <input type="text" id="searchInput" placeholder="Search..." />
          <button type="button" id="search-btn">Search</button>
          <div class="search-results-container">
            <ul id="searchResults"></ul>
          </div>
        </div>
        ${
          currentUser
            ? `<button id="logout-btn">Logout</button>`
            : `<button onclick="window.location.href='login.html'">Login</button>`
        }
      </nav>
    `;

    initializeSearch();
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser'); 
        window.location.href = 'login.html';
      });
    }
  }
});

function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchIndex = buildSearchIndex();

  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }
    
    const results = searchIndexedContent(query);
    displaySearchResults(results);
  });

  function buildSearchIndex() {
    const index = {
      'todo.html': {
        title: 'ToDo List',
        items: [],
        keywords: ['tasks', 'homework', 'assignments', 'due dates']
      },
      'course-add.html': {
        title: 'Course Notes',
        items: [],
        keywords: ['subjects', 'notes', 'materials', 'study']
      },
      'index.html': {
        title: 'Dashboard',
        items: [],
        keywords: ['overview', 'progress', 'welcome', 'dashboard']
      }
    };
    
    return index;
  }

  function searchIndexedContent(query) {
    const results = [];
    
    for (const [page, data] of Object.entries(searchIndex)) {
      data.items.forEach(item => {
        if (typeof item === 'string' && item.toLowerCase().includes(query)) {
          results.push({
            text: item,
            page: page,
            type: data.title,
            category: 'Item'
          });
        } else if (typeof item === 'object' && item.text && item.text.toLowerCase().includes(query)) {
          results.push({
            text: item.text,
            page: page,
            type: data.title,
            category: 'Item'
          });
        }
      });
      
      data.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(query)) {
          results.push({
            text: keyword,
            page: page,
            type: data.title,
            category: 'Keyword'
          });
        }
      });
    }
    
    return results;
  }

  function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<li class="no-results">No matches found</li>';
    } else {
      const groupedResults = {};
      results.forEach(result => {
        if (!groupedResults[result.page]) {
          groupedResults[result.page] = [];
        }
        groupedResults[result.page].push(result);
      });
      
      for (const [page, pageResults] of Object.entries(groupedResults)) {
        const header = document.createElement('li');
        header.className = 'result-header';
        header.textContent = searchIndex[page].title;
        searchResults.appendChild(header);
        
        pageResults.slice(0, 3).forEach(result => {
          const li = document.createElement('li');
          li.className = 'search-result-item';
          li.innerHTML = `
            <div class="result-content">
              <div class="result-text">${result.text}</div>
              <small class="result-category">${result.category}</small>
            </div>
          `;
          li.addEventListener('click', function() {
            if (page !== window.location.pathname.split('/').pop()) {
              window.location.href = page;
            }
          });
          searchResults.appendChild(li);
        });
      }
    }
    
    searchResults.style.display = 'block';
  }
}