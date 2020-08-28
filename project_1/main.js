var svg = document.querySelector('svg');

var canvas = document.querySelector('canvas');
canvasBox = document.getElementById("canvasBox");
canvas.width = 500;
canvas.height = 500;
var c = canvas.getContext('2d');

var svgPipeActive = false;
var canvasGlassesActive = false;
const canvasGlassesStartY = -300;


//Canvas
const drawCanvasCircle = (x, y, r, color) => {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.lineWidth = 3;
  c.fillStyle = color;
  c.fill();
  c.stroke();
};

const drawCanvasRectangle = (x, y, width, height, color) => {
  c.beginPath();
  c.fillStyle = color;
  c.fillRect(x, y, width, height);
  c.stroke();
}

const drawCanvasHalfCircle = (xArc, yArc, r, xLineTo, yLineTo) => {
  c.beginPath();
  c.arc(xArc, yArc, r, 0, Math.PI, false);
  c.lineTo(xLineTo, yLineTo);
  c.fillStyle = 'black';
  c.fill();
  c.stroke();
}

const drawCanvasHead = () => {
  drawCanvasCircle(250, 250, 200, 'yellow');
}

const drawCanvasEyes = () => {
  drawCanvasCircle(190, 200, 19, 'black');
  drawCanvasCircle(310, 200, 19, 'black');
}

const drawCanvasEyebrows = () => {
  drawCanvasRectangle(170, 170, 38, 5, 'black');
  drawCanvasRectangle(290, 170, 38, 5, 'black');
}

const drawCanvasMouth = () => {
  drawCanvasHalfCircle(250, 300, 75, 325, 300);
}

const drawCanvasTeeth = () => {
  drawCanvasRectangle(230, 300, 17, 25, 'white');
  drawCanvasRectangle(250, 300, 20, 35, 'white')
}

const drawCanvas = () => {
  drawCanvasHead();
  drawCanvasEyes();
  drawCanvasEyebrows();
  drawCanvasMouth();
  drawCanvasTeeth();
};

const drawCanvasSunglasses = (y) => {
  drawCanvasHalfCircle(190, y, 50, 310, y)
  drawCanvasHalfCircle(310, y, 50, 362, y)
}

const drawCanvasSmoke = (y) => {
  c.beginPath();
  c.moveTo(290, y);
  c.lineTo(450, y - 30);
  c.lineTo(450, y - 15);
  c.closePath();
  c.fillStyle = "#D3D3D3";
  c.fill();
  c.stroke();
  c.beginPath();
  c.moveTo(440, y - 28);
  c.lineTo(450, y - 30);
  c.lineTo(450, y - 15);
  c.lineTo(440, y - 14);
  c.closePath();
  c.fillStyle = "red";
  c.fill();
  c.stroke();
}

const drawCanvasWithAnimation = (y) => {
  canvasGlassesActive = true;
  c.clearRect(0, 0, canvas.width, canvas.height)
  drawCanvas()
  drawCanvasSunglasses(y);
  drawCanvasSmoke(y + 145);
  y += 1
  if (y === 180) {
    setTimeout(() => { drawCanvasWithAnimation(y) }, 3000)
  } else if (y < 600) {
    setTimeout(() => { drawCanvasWithAnimation(y) }, 10)
  } else { canvasGlassesActive = false }
}

//SVG
const changeSvgEyeSize = (eye) => {
  if ($(eye).attr("r") == "20") {
    $(eye).attr("r", "15")
  } else { $(eye).attr("r", "20") }
}

const rotateSvgRightEyebrow = (eyebrow) => {
  if ($(eyebrow).attr("transform") == "translate(110, -60) rotate(25 10 -35)") {
    $(eyebrow).removeAttr("transform")
  } else { $(eyebrow).attr("transform", "translate(110, -60) rotate(25 10 -35)") }
}

const addSvgPipe = () => {
  svgPipeActive = true;
  var pipe = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
  pipe.setAttribute("points", "230,-155 350,-135 350,-155 370,-155 370,-120 350,-120");
  pipe.setAttribute("id", "svgPipe");
  pipe.style.fill = "#c46404";
  pipe.style.stroke = 'black';
  pipe.style.strokeWidth = "5px";
  var motionElem = document.createElementNS("http://www.w3.org/2000/svg", 'animateMotion');
  motionElem.setAttribute("dur", "5s");
  motionElem.setAttribute("begin", "0s");
  motionElem.setAttribute("path", "M 50 100 V 490");
  motionElem.setAttribute("fill", "freeze");
  pipe.appendChild(motionElem)
  svg.appendChild(pipe);
}

//events
$(document).ready(() => {
  $("#canvas").click(() => {
    if (!canvasGlassesActive) {
      drawCanvasWithAnimation(canvasGlassesStartY)
    }
  });

  $(".svgTooth").click(function () {
    $(this).fadeOut().delay(3000).fadeIn()
  });

  $(".svgEye").click(function () {
    changeSvgEyeSize(this)
  });

  $("#svgRightEyebrow").click(function () {
    rotateSvgRightEyebrow(this)
  });

  $("#canvasBox").mouseenter(function () {
    $(this).attr("style", "background-color: rgb(40, 40, 40);")
  });

  $("#canvasBox").mouseleave(function () {
    $(this).removeAttr("style")
  });

  $("#svg").mouseenter(function () {
    $(this).attr("style", "background-color: rgb(40, 40, 40);")
  });

  $("#svg").mouseleave(function () {
    $(this).removeAttr("style")
  });

  $("#svgFace").click(() => {
    if (!svgPipeActive) {
      addSvgPipe()
    }
  });
});

drawCanvas();
