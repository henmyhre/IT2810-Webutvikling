var canvas = document.querySelector('canvas');
var svg = document.querySelector('svg');
canvas.width = 500;
canvas.height = 500;
var c = canvas.getContext('2d');

const drawCircle = (x, y, r, color) => {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.lineWidth = 3;
  c.fillStyle = color;
  c.fill();
  c.stroke();
};

const drawRectangle = (x, y, width, height, color) => {
  c.beginPath();
  c.fillStyle = color;
  c.fillRect(x, y, width, height);
  c.stroke();
}

const drawMouth = () => {
  c.beginPath();
  c.arc(250, 300, 75, 0, Math.PI, false);
  c.lineTo(325, 300);
  c.fillStyle = 'black';
  c.fill();
  c.stroke();
}

const drawTeeth = () => {
  drawRectangle(230, 300, 17, 25, 'white');
  drawRectangle(250, 300, 20, 35, 'white')
}

const drawCanvas = () => {
  // head
  drawCircle(250, 250, 200, 'yellow');
  // eyes
  drawCircle(190, 200, 19, 'black');
  drawCircle(310, 200, 19, 'black');
  drawMouth();
  // eyebrows
  drawRectangle(170, 170, 38, 5, 'black');
  drawRectangle(290, 170, 38, 5, 'black');
  drawTeeth();
};

$(document).ready(() => {
  $("#canvas").click(() => {
  });

  $("#canvas").mouseenter(() => {
  });

  $("#svg").click(() => {
  });
});

drawCanvas();
