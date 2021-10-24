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

let setIntervalTo = setInterval;

setIntervalTo(addEnemyNinja, 3000);

document.onkeydown = (e) => {
  keysPressed[e.key] = true;
}

document.onkeyup = (e) => {
  keysPressed[e.key] = false;
}

function isTouchingPlayer(en, player) {
  let range = (a, b) => {
    let x = [];
    for (var i = a; i <= b; i++) {
      x.push(Math.round(i));
    }
    return x;
  };
  return (range(en.x - 10, en.x + 10).includes(Math.round(player.x)) && range(en.y - 10, en.y + 10).includes(Math.round(player.y)));
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function addEnemyNinja() {
  let [x, y] = [Math.random() * window.innerWidth, Math.random() * window.innerHeight];
  enemyNinjas.push({
    "x": x,
    "y": y 
  });
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