var player = {
  x: Math.round(window.innerWidth) / 2,
  y: Math.round(window.innerHeight) / 2,
  health: 3,
  attack: {
    bullets: []
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

var megaNinjaBoss = {
  health: 100,
  attack: () => {
    let index = enemyNinjas.length;
    addEnemyNinja();
    enemyNinjas[index].x = megaNinjaBoss.x;
    enemyNinjas[index].y = megaNinjaBoss.y;
  },
  x: 1000,
  y: 1000 
}

let setIntervalTo = setInterval;

setIntervalTo(() => {
  if (!playerNearBossNinja()) addEnemyNinja();
}, 3000);

setIntervalTo(() => {
  if (playerNearBossNinja()) megaNinjaBoss.attack();
}, 500);

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

function playerNearBossNinja() {
  let range = (a, b) => {
    let x = [];
    for (var i = a; i <= b; i++) {
      x.push(Math.round(i));
    }
    return x;
  };
  return range(player.x - 300, player.x + 300).includes(Math.round(megaNinjaBoss.x)) && range(player.y - 300, player.y + 300).includes(Math.round(megaNinjaBoss.y));
}

function addEnemyNinja() {
  let [x, y] = [Math.random() * window.innerWidth, Math.random() * window.innerHeight];
  enemyNinjas.push({
    "x": x,
    "y": y 
  });
}

function drawHealth() {
  textSize(30);
  text(`Boss Health: ${megaNinjaBoss.health}`, 300, 600);
}

function draw() {
  background("green");
  move();
  drawItems();
  drawPlayer();
  drawBullets();
  drawBadNinjas();
  drawMegaNinjaBoss();
  if (playerNearBossNinja()) drawHealth();
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