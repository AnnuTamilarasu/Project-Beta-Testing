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
  index=Number(index);
  const updatedSubjects=JSON.parse(localStorage.getItem("subjects"))||[];
  updatedSubjects.splice(index,1);
  localStorage.setItem("subjects",JSON.stringify(updatedSubjects));
  
  const allNotes=JSON.parse(localStorage.getItem("allNotes"))||{};
  const allMindmaps=JSON.parse(localStorage.getItem('allMindmaps'))||{};
  const newAllNotes={};
  const newAllMindmaps={};
  Object.keys(allNotes).forEach(key=>{
    const oldIndex=Number(key);
    if(oldIndex===index){
      return;
    }
    const newIndex=oldIndex>index?oldIndex-1:oldIndex;
    newAllNotes[newIndex]=allNotes[key];
  });
  Object.keys(allMindmaps).forEach(key=>{
    const oldIndex=Number(key);
    if(oldIndex===index){
      return;
    }
    const newIndex=oldIndex>index?oldIndex-1:oldIndex;
    newAllMindmaps[newIndex]=allMindmaps[key];
  });
  localStorage.setItem("allNotes",JSON.stringify(newAllNotes));
  localStorage.setItem("allMindmaps",JSON.stringify(newAllMindmaps));
  window.location.reload();
}
  });
  function openNotes(index){
    localStorage.setItem('currentIndex',index);
    window.location.href='notes.html';
  }