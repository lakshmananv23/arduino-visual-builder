const board = document.getElementById("board");
const codePanel = document.getElementById("codePanel");

let parts = [];
let ledState = false;

/* Drag Start */
document.querySelectorAll(".part").forEach(p=>{
  p.ondragstart = e=>{
    e.dataTransfer.setData("type",p.dataset.type);
  };
});

/* Allow Drop */
board.ondragover = e=>e.preventDefault();

/* Drop */
board.ondrop = e=>{
  const type = e.dataTransfer.getData("type");

  const img = document.createElement("img");
  img.src = document.querySelector(`[data-type="${type}"]`).src;
  img.className = "component";

  img.style.left = e.offsetX+"px";
  img.style.top = e.offsetY+"px";

  board.appendChild(img);

  parts.push(type);
  generateCode();
};

/* Generate Code */
function generateCode(){
  let code =
`int led = 13;
int button = 2;

void setup(){
 pinMode(led,OUTPUT);
 pinMode(button,INPUT);
}

void loop(){
 if(digitalRead(button)){
   digitalWrite(led,HIGH);
 } else {
   digitalWrite(led,LOW);
 }
}
`;
  codePanel.textContent = code;
}

/* Toggle Code */
document.getElementById("codeViewBtn").onclick=()=>{
  codePanel.style.display =
    codePanel.style.display=="block"?"none":"block";
}

/* Run */
document.getElementById("runBtn").onclick=()=>{
  ledState = !ledState;

  document.querySelectorAll(".component")
  .forEach(c=>{
    if(c.src.includes("Qbf8fIk")){
      c.style.filter =
        ledState ? "drop-shadow(0 0 10px red)" : "none";
    }
  });
}

/* Stop */
document.getElementById("stopBtn").onclick=()=>{
  ledState=false;
  document.querySelectorAll(".component")
  .forEach(c=>c.style.filter="none");
}
