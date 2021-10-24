var player = {
  x: Math.round(window.innerWidth) / 2,
  y: Math.round(window.innerHeight) / 2,
  health: 10,
  attack: {
    bullets: [],
    grenade: false
  }
};

var keysPressed = {
  "w": false,
  "a": false,
  "s": false,
  "d": false
};

var enemyNinjas = [{
  x: 0,
  y: 0
}];

var items = [{
  canvX: 30,
  canvY: 30
}];

document.onkeydown = (e) => {
  keysPressed[e.key] = true;
}

document.onkeyup = (e) => {
  keysPressed[e.key] = false;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background("green");
  move();
  drawItems();
  drawPlayer();
  drawBullets();
  drawBadNinjas();

  /*
  overwrite layers (top to bottom):
  bad ninjas
  bullets
  player
  items
  (register moves)
  */
}

document.onclick = (e) => {
  player.attack.bullets.push({
    x: player.x,
    y: player.y,
    target: {
      x: e.clientX,
      y: e.clientY 
    }
  });
}