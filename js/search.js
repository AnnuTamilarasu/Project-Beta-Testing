// Sample data - replace with your actual data source
const searchData = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
  "English Literature",
  "Art",
  "Music",
  "Physical Education",
  "Algebra",
  "Calculus",
  "Geometry",
  "Trigonometry",
  "Statistics"
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function filterResults(searchTerm) {
  if (!searchTerm) {
    return [];
  }
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return searchData.filter(item => 
    item.toLowerCase().includes(lowerCaseSearchTerm)
  );
}
function displayResults(results) {
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.style.display = 'none';
    return;
  }
  
  results.forEach(result => {
    const li = document.createElement('li');
    li.textContent = result;
    li.addEventListener('click', () => {
      searchInput.value = result;
      searchResults.style.display = 'none';
      console.log('Selected:', result);
    });
    searchResults.appendChild(li);
  });
  
  searchResults.style.display = 'block';
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();
  const results = filterResults(searchTerm);
  displayResults(results);
});

document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

searchInput.addEventListener('keydown', (e) => {
  const results = searchResults.querySelectorAll('li');
  const currentFocus = document.activeElement;
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (results.length > 0) {
      results[0].focus();
    }
  }
});

searchResults.addEventListener('keydown', (e) => {
  const results = Array.from(searchResults.querySelectorAll('li'));
  const currentFocus = document.activeElement;
  const currentIndex = results.indexOf(currentFocus);
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      if (currentIndex < results.length - 1) {
        results[currentIndex + 1].focus();
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (currentIndex > 0) {
        results[currentIndex - 1].focus();
      } else {
        searchInput.focus();
      }
      break;
    case 'Enter':
      e.preventDefault();
      if (currentFocus.tagName === 'LI') {
        currentFocus.click();
      }
      break;
    case 'Escape':
      searchResults.style.display = 'none';
      searchInput.focus();
      break;
  }
});