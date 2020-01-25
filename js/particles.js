let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = [
  "#ffc40030",
  "#ffc40028",
  "#ffc40050",
  "#ffc40028",
  "#ffc40028"
];

// let mouse = {
//     x: undefined,
//     y: undefined
// };

let maxRadius = 25;
let minRadius = 2;

window.addEventListener("resize", event => {
  init();
  canvas.height = innerHeight;
  canvas.width = innerWidth;
});

// addEventListener("mousemove", event => {
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
// });

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > 1) {
      this.radius -= 1;
    }
    this.draw();
  }
}

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 2 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }

  console.log(circleArray);
}

function move() {
  cancelAnimationFrame(animation);
  requestAnimationFrame(move);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
