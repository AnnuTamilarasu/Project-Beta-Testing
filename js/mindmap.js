const connections = [];
const nodes = [];

function connectNodes(nodeA, nodeB) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke", "#333");
  line.setAttribute("stroke-width", "2");
  document.querySelector("svg").appendChild(line);
  connections.push({ nodeA, nodeB, line });
  updateAllLines();
}

function updateAllLines() {
  connections.forEach(({ nodeA, nodeB, line }) => {
    const r1 = nodeA.getBoundingClientRect();
    const r2 = nodeB.getBoundingClientRect();
    line.setAttribute("x1", r1.left + r1.width / 2);
    line.setAttribute("y1", r1.top + r1.height / 2);
    line.setAttribute("x2", r2.left + r2.width / 2);
    line.setAttribute("y2", r2.top + r2.height / 2);
  });
}

function removeAll(node) {
  const child = connections.filter((c) => c.nodeA === node).map((c) => c.nodeB);
  connections
    .filter((c) => c.nodeA === node || c.nodeB === node)
    .forEach((c) => {
      c.line.remove();
      const index = connections.indexOf(c);
      if (index > -1) {
        connections.splice(index, 1);
      }
    });
  node.remove();
  child.forEach((child) => removeAll(child));
}

function createNode(a, b, text = "New Node") {
  const node = document.createElement("div");
  node.className = "container";
  node.style.left = a + "px";
  node.style.top = b + "px";
  node.contentEditable = "true";
  node.innerHTML = text;
  nodes.push({ node, a, b, text });

  const addBon = document.createElement("button");
  addBon.className = "Button";
  addBon.textContent = "+";
  node.appendChild(addBon);

  const minusBon = document.createElement("button");
  minusBon.className = "Mutton";
  minusBon.textContent = "-";
  node.appendChild(minusBon);

  document.body.appendChild(node);

  makeDraggable(node, updateAllLines);
  addBon.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = node.getBoundingClientRect();
    const newNode = createNode(rect.left + 150, rect.top, "New Node");
    connectNodes(node, newNode);
  });
  minusBon.addEventListener("click", (e) => {
    e.stopPropagation();
    removeAll(node);
  });
  return node;
}

function makeDraggable(el, onMove) {
  el.onmousedown = (e) => {
    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(x, y) {
      el.style.left = x - shiftX + "px";
      el.style.top = y - shiftY + "px";
      if (onMove) onMove();
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }
    document.addEventListener("mousemove", onMouseMove);
    el.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      el.onmouseup = null;
    };
  };
  el.ondragstart = () => false;
}

function saveData() {}

const node1 = createNode(200, 100, "Main Idea");
const node2 = createNode(400, 300, "Sub Idea");
connectNodes(node1, node2);
