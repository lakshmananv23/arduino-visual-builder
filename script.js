const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const codeBox = document.getElementById("code");

let items = [];

/* Drag Start */
document.querySelectorAll(".component").forEach(c=>{
  c.addEventListener("dragstart",e=>{
    e.dataTransfer.setData("type",c.dataset.type);
  });
});

/* Allow Drop */
canvas.addEventListener("dragover",e=>{
  e.preventDefault();
});

/* Drop */
canvas.addEventListener("drop",e=>{
  const type = e.dataTransfer.getData("type");

  items.push({
    type:type,
    x:e.offsetX,
    y:e.offsetY
  });

  draw();
  generateCode();
});

/* Draw */
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  items.forEach(i=>{
    ctx.fillStyle="orange";
    ctx.fillRect(i.x,i.y,60,40);
    ctx.fillStyle="black";
    ctx.fillText(i.type,i.x+5,i.y+25);
  });
}

/* Code */
function generateCode(){
  let code="";

  if(items.some(i=>i.type==="led"))
    code+="int led=13;\n";

  if(items.some(i=>i.type==="button"))
    code+="int btn=2;\n";

  code+="\nvoid setup(){\n";
  if(items.some(i=>i.type==="led"))
    code+=" pinMode(led,OUTPUT);\n";
  if(items.some(i=>i.type==="button"))
    code+=" pinMode(btn,INPUT);\n";
  code+="}\n\nvoid loop(){\n";

  if(items.some(i=>i.type==="led") &&
     items.some(i=>i.type==="button")){
    code+=" if(digitalRead(btn)){\n";
    code+="  digitalWrite(led,HIGH);\n";
    code+=" } else {\n";
    code+="  digitalWrite(led,LOW);\n";
    code+=" }\n";
  }

  code+="}\n";

  codeBox.textContent=code;
}

/* Toggle */
document.getElementById("showCode").onclick=()=>{
  codeBox.style.display="block";
};
document.getElementById("showCanvas").onclick=()=>{
  codeBox.style.display="none";
};

/* Buttons */
document.getElementById("start").onclick=()=>{
  alert("Simulation Started");
};

document.getElementById("stop").onclick=()=>{
  alert("Simulation Stopped");
};
