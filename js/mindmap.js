document.getElementById("ideaAdd").addEventListener("click", function() {
    const node1=createNode(200,100,"Main Idea");
  });
  document.getElementById("back").addEventListener("click", function() {
    window.location.href = 'notes.html';
  });
  document.getElementById("save").addEventListener("click", function() {
    saveData();
  });
  document.querySelector("h1").textContent = 
  localStorage.getItem("currentMindmapName") || "MindMap";
const connections=[];

  function saveData(){
	const nodes=Array.from(document.querySelectorAll(".container")).map(node=>({
	id:node.dataset.id,
	x:parseFloat(node.style.left),
	y:parseFloat(node.style.top),
	text:node.textContent.replace(/\+/g,'').replace(/-/g,'')
	}));
	const connectionsData=connections.map(c=>({
	parentId:c.nodeA.dataset.id,
	childId:c.nodeB.dataset.id
	}));
	const mindData={nodes,connections:connectionsData};
    const currentId=localStorage.getItem("currentMindmap");
    const subjectIndex=localStorage.getItem("currentIndex");

    let allMindmaps=JSON.parse(localStorage.getItem("allMindmaps"))||{};
    if (!allMindmaps[subjectIndex]){
        allMindmaps[subjectIndex]={};
    }
    allMindmaps[subjectIndex][currentId]=mindData;
	localStorage.setItem("allMindmaps",JSON.stringify(allMindmaps));
	}
	
	function loadMindmap(){
        const currentId=localStorage.getItem("currentMindmap");
        const subjectIndex=localStorage.getItem("currentIndex");
        const allMindmaps=JSON.parse(localStorage.getItem("allMindmaps"))||{};

        const mindData=
        allMindmaps[subjectIndex]&& allMindmaps[subjectIndex][currentId]
        ?allMindmaps[subjectIndex][currentId]
        :null;

        if(!mindData)return false;
        
        const{nodes,connections:connectionsData}=mindData;
        const nodeMap={};

        nodes.forEach(n=>{
            const node=createNode(n.x,n.y,n.text);
            node.dataset.id=n.id;
            nodeMap[n.id]=node;
        });
        connectionsData.forEach(c=>{
            connectNodes(nodeMap[c.parentId],nodeMap[c.childId]);
        });
        return true;
	}
  function connectNodes(nodeA,nodeB){
  const line=document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke","#333");
  line.setAttribute("stroke-width","2");
  document.querySelector("svg").appendChild(line);
  connections.push({nodeA,nodeB,line});
  updateAllLines();
  }
  function updateAllLines(){
  connections.forEach(({nodeA,nodeB,line})=>{
  const r1=nodeA.getBoundingClientRect();
  const r2=nodeB.getBoundingClientRect();
  line.setAttribute("x1",r1.left+r1.width/2);
  line.setAttribute("y1", r1.top + r1.height/2);
  line.setAttribute("x2", r2.left + r2.width/2);
  line.setAttribute("y2", r2.top + r2.height/2);
  });
  }
  function removeAll(node){
  const child=connections.filter(c=>c.nodeA===node).map(c=>c.nodeB);
  connections.filter(c=>c.nodeA===node||c.nodeB===node).forEach(c=>{
  c.line.remove();
  const index=connections.indexOf(c);
  if(index>-1){
  connections.splice(index,1);
  }
  });
  node.remove();
  child.forEach(child=>removeAll(child));
  }
  function createNode(a,b,text="New Node"){
  const node=document.createElement("div");
  node.className="container";
  node.style.left=a+"px";
  node.style.top=b+"px";
  node.contentEditable="true";
  node.innerHTML=text;
  node.dataset.id="node_"+Math.random().toString(36).substr(2,9);
  
  const addBon=document.createElement("button");
  addBon.className="Button";
  addBon.textContent="+";
  node.appendChild(addBon);
  
  const minusBon=document.createElement("button");
  minusBon.className="Mutton";
  minusBon.textContent="-";
  node.appendChild(minusBon);
  
  document.body.appendChild(node);
  
  makeDraggable(node,updateAllLines);
  
  addBon.addEventListener("click",(e)=>{
  e.stopPropagation();
  const rect=node.getBoundingClientRect();
  const newNode=createNode(rect.left+150,rect.top,"New Node");
  connectNodes(node,newNode);
  saveData();
  });
  minusBon.addEventListener("click",(e)=>{
  e.stopPropagation();
  removeAll(node);
  saveData();
  });
  return node;
  }
    function makeDraggable(el, onMove) {
      el.onmousedown = e => {
        let shiftX = e.clientX - el.getBoundingClientRect().left;
        let shiftY = e.clientY - el.getBoundingClientRect().top;

        function moveAt(x, y) {
          el.style.left = x - shiftX + "px";
          el.style.top = y - shiftY + "px";
          if (onMove) onMove();
		  saveData();
        }

        function onMouseMove(e) { moveAt(e.pageX, e.pageY); }
        document.addEventListener('mousemove', onMouseMove);
        el.onmouseup = () => {
          document.removeEventListener('mousemove', onMouseMove);
          el.onmouseup = null;
        };
      };
      el.ondragstart = () => false;
    }
	if(!loadMindmap()){
	const node1=createNode(200,100,"Main Idea");
	const node2=createNode(400,300,"Sub Idea");
	connectNodes(node1,node2);
	saveData();
	}
    