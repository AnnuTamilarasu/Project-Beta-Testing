const subjectInput = document.querySelector('#subject-input');
      const describeInput=document.querySelector('#description-input');
const subjectButton = document.querySelector('#subjectAdd');

let subjects = JSON.parse(localStorage.getItem('subjects')) || [];
function addSubject(event) {
    event.preventDefault();
    const SubjectText = subjectInput.value.trim();
    const DescribeText=describeInput.value.trim();
    if (SubjectText === ''||DescribeText=='') return;
    const addedSubject = {
        subject: SubjectText,
        description:DescribeText,
        completed: false,
        id: Date.now()
    };
    
    subjects.push(addedSubject);
    saveSubjects();
    subjectInput.value = '';
    describeInput.value='';
}

function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

subjectButton.addEventListener('click', addSubject);
subjectInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubject(event);
    }
});
describeInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addSubject(event);
    }
});