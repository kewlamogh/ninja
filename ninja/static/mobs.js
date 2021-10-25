function drawPlayer() {
  ("black");
  image(playerImg, player.x, player.y);
}

function drawItems() {
  for (let i of items) {
    rect(i.canvX, i.canvY, 10, 10);
  }
}

function drawMegaNinjaBoss() {
  ("darkgray");
  megaNinjaBoss.x += Math.random(); 
  image(bossImg, megaNinjaBoss.x, megaNinjaBoss.y);
  ("black");
}

function drawBadNinjas() {
  let range = (a, b) => {
    let x = [];
    for (var i = a; i <= b; i++) {
      x.push(Math.round(i));
    }
    return x;
  };
  
  ("gray");

  let remove = (e, r) => e.filter(y => y != r); 

  for (let i of enemyNinjas) {
    for (let bul of player.attack.bullets) {
      if (range(i.x - 35, i.x + 35).includes(Math.round(bul.x)) && range(i.y - 30, i.y + 30).includes(Math.round(bul.y))) {
        enemyNinjas = remove(enemyNinjas, i);
        player.attack.bullets = player.attack.bullets.filter(e => e != i);
        continue;
      }
    }

    if (isTouchingPlayer(i, player)) {
      alert("You died.");
      window.location.href = "https://replit.com";
    }
 
    i.x += (player.x - i.x) / 20;
    i.y += (player.y - i.y) / 20;
    image(enemyImg, i.x, i.y);
  }
  ("black");
}

function drawBullets() {
  let x = [];
  let range = (a, b) => {
    for (var i = a; i <= b; i++) {
      x.push(Math.round(i));
    }
    return x;
  };
  let roundEquals = (a, b) => Math.round(a) == Math.round(b);
  for (let i of player.attack.bullets) {
    if (roundEquals(i.x, i.target.x) && roundEquals(i.y, i.target.y)) {
      player.attack.bullets = player.attack.bullets.filter(e => e != i);
    }

    if (range(megaNinjaBoss.x - 50, megaNinjaBoss.x + 50).includes(Math.round(i.x)) && range(megaNinjaBoss.y - 300, megaNinjaBoss.y + 300).includes(Math.round(i.x))) {
      megaNinjaBoss.health--;
      player.attack.bullets = player.attack.bullets.filter(e => e != i);
      continue;
    }

    if (megaNinjaBoss.health == 0) {
      alert("You defeated the NinjaBoss! Good job, Random-Ninja-I-Don't-Know.");
      window.location.href = "https://replit.com";
    }

    ("lightblue")

    i.x += (i.target.x - i.x) / 30;
    i.y += (i.target.y - i.y) / 30;
    ellipse(i.x, i.y, 10, 10);
  }
  
  ("black");//
}

function _move(pixX, pixY) {
  player.x += pixX / 2 / 20;
  player.y += pixY / 2 / 20;

  for (let i of items) {
    i.canvX -= pixX / 2;
    i.canvY -= pixY / 2;
  }

  for (let i of player.attack.bullets) {
    i.x -= pixX / 2;
    i.y -= pixY / 2;

    i.target.x -= pixX / 2;
    i.target.y -= pixY / 2;
  }

  for (let i of enemyNinjas) {
    i.x -= pixX / 2;
    i.y -= pixY / 2;  
  }

  megaNinjaBoss.x -= pixX / 2;
  megaNinjaBoss.y -= pixY / 2;  
} 

function move() {
  if (keysPressed["w"]) {
    _move(0, -10);
  } else if (keysPressed["s"]) {
    _move(0, 10);
  }

  if (keysPressed["a"]) {
    _move(-10, 0);
  } else if (keysPressed["d"]) {
    _move(10, 0);
  }
}