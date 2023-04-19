const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const canvasWidth = ctx.canvas.width ;
const canvasHeight = ctx.canvas.height; 

 
const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const TOTAL_POINTS = 20;
const CONNECT_DISTANCE = 100;

const points = [];
for (let i = 0; i < TOTAL_POINTS; i++) {
  points.push({
    x: getRandomInRange(0, canvasWidth),
    y: getRandomInRange(0, canvasHeight),
    a: getRandomInRange(0, 360),
    s: 1
  });
}

const drawPoint = point => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
  ctx.fill();
};

const movePoint = point => {
  point.x += point.s * Math.cos(point.a);
  point.y += point.s * Math.sin(point.a);
};

const distance = (point, other) => {
  return Math.sqrt((other.x - point.x) ** 2 + (other.y - point.y) ** 2);
};

const drawLine = (point, other) => {
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(other.x, other.y);
  ctx.stroke();
};

const loop = () => {
  window.requestAnimationFrame(loop);

//   ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(point => {
    movePoint(point);
  });

  points.forEach(point => {
    drawPoint(point);
  });

  points.forEach(point => {
    points.forEach(other => {
      if (point === other) {
        return;
      }

      const d = distance(point, other);
      if (d < CONNECT_DISTANCE) {
        drawLine(point, other);
      }
    });
  });
};

loop();