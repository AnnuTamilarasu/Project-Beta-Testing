document.getElementById("courseAdd").addEventListener("click", function() {
    window.location.href = "course.html";
  });
  window.addEventListener("DOMContentLoaded",function(){
    const sub = JSON.parse(localStorage.getItem("subjects"))||[];
    const container=document.getElementById("subject-box-container");
    if(sub.length>0){
      sub.forEach((s,index)=>{
          const single=document.createElement("div");
          single.classList.add("subject-single");
          single.innerHTML = `
          <div>
        <strong>${s.subject}</strong><br>
        <small>${s.description}</small>
        </div>
        <button data-index="${index}" class="delete-btn">Delete</button>
        <button data-index"${index}" class="notes-btn" onclick="openNotes(${index})">AddNotes</button>
      `;
          container.appendChild(single);
    });
    }
container.addEventListener("click",function(e){
  if(e.target.classList.contains("delete-btn")){
    const index=parseInt(e.target.getAttribute("data-index"));
    deleteSubject(index);
  }
});
function deleteSubject(index){
  const updatedSubjects=JSON.parse(localStorage.getItem("subjects"))||[];
  updatedSubjects.splice(index,1);
  localStorage.setItem("subjects",JSON.stringify(updatedSubjects));
  
  const allNotes=JSON.parse(localStorage.getItem("allNotes"))||{};
  delete allNotes[index];

  const newAllNotes={};
  updatedSubjects.forEach((sub,newIndex)=>{
    if(allNotes.hasOwnProperty(newIndex>=index?newIndex+1:newIndex)){
      newAllNotes[newIndex]=allNotes[newIndex>=index?newIndex+1:newIndex];
    }
  });
  localStorage.setItem("allNotes",JSON.stringify(newAllNotes));
  window.location.reload();
}
  });
  function openNotes(index){
    localStorage.setItem('currentIndex',index);
    window.location.href='notes.html';
  }