// initial setup
const convas = document.getElementById("canvas2");
const c = convas.getContext("2d");

canvas2.width = innerWidth;
canvas2.height = innerHeight;
canvas2.style.background = "#000";

// variables

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const clrs = ["#fff", "#eee", "#ddd"];

// event listener

addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas2.width = innerWidth;
  canvas2.height = innerHeight;

  init();
});

// utility functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(clrs) {
  return clrs[Math.floor(Math.random() * clrs.length)];
}

// object
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = randomIntFromRange(50, 120);
  this.lastMouse = { x: this.x, y: this.y };

  this.update = () => {
    const lastPoint = { x: this.x, y: this.y };
    this.radians += this.velocity;

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.x =
      this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPoint);
  };

  this.draw = lastPoint => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };
}

// implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    particles.push(
      new Particle(
        canvas2.width / 2,
        canvas2.height / 2,
        radius,
        randomColor(clrs)
      )
    );
  }
  console.log(particles);
}

// animation loop
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = "rgba(0,0,0,0.05)";
  c.fillRect(0, 0, canvas2.width, canvas2.height);

  particles.forEach(particle => {
    particle.update();
  });
}

init();
animation();
