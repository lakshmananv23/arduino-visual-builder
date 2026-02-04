const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const codePanel = document.getElementById("codePanel");

let components = [];

/* ============ Drag from Palette ============ */

document.querySelectorAll(".component").forEach(comp => {

  comp.addEventListener("dragstart", e => {
    e.dataTransfer.setData("type", comp.dataset.type);
  });

});

/* ============ Drop on Canvas ============ */

canvas.addEventListener("dragover", e => {
  e.preventDefault();
});

canvas.addEventListener("drop", e => {

  const type = e.dataTransfer.getData("type");

  components.push({
    type: type,
    x: e.offsetX,
    y: e.offsetY
  });

  drawAll();
  generateCode();
});

/* ============ Draw Components ============ */

function drawAll() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  components.forEach(c => {

    ctx.fillStyle = "orange";
    ctx.fillRect(c.x, c.y, 60, 40);

    ctx.fillStyle = "black";
    ctx.fillText(c.type.toUpperCase(), c.x + 5, c.y + 25);

  });

}

/* ============ Generate Arduino Code ============ */

function generateCode() {

  let hasLED = components.some(c => c.type === "led");
  let hasButton = components.some(c => c.type === "button");

  let code = "";

  if (hasLED) {
    code += "int ledPin = 13;\n";
  }

  if (hasButton) {
    code += "int buttonPin = 2;\n";
  }

  code += "\nvoid setup() {\n";

  if (hasLED) {
    code += "  pinMode(ledPin, OUTPUT);\n";
  }

  if (hasButton) {
    code += "  pinMode(buttonPin, INPUT);\n";
  }

  code += "}\n\nvoid loop() {\n";

  if (hasLED && hasButton) {
    code += "  if(digitalRead(buttonPin)==HIGH){\n";
    code += "    digitalWrite(ledPin, HIGH);\n";
    code += "  } else {\n";
    code += "    digitalWrite(ledPin, LOW);\n";
    code += "  }\n";
  }

  code += "}\n";

  codePanel.textContent = code;
}

/* ============ Toggle Views ============ */

document.getElementById("codeBtn").onclick = () => {
  codePanel.style.display = "block";
};

document.getElementById("componentBtn").onclick = () => {
  codePanel.style.display = "none";
};

/* ============ Start & Stop ============ */

document.getElementById("startBtn").onclick = () => {
  alert("Simulation Started!");
};

document.getElementById("stopBtn").onclick = () => {
  alert("Simulation Stopped!");
};