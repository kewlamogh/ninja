function drawPlayer() {
  fill("black");
  ellipse(player.x,player.y, 20,20);
}

function drawItems() {
  for (let i of items) {
    rect(i.canvX, i.canvY, 10, 10);
  }
}

function drawBadNinjas() {
  let range = (a, b) => {
    let x = [];
    for (var i = a; i <= b; i++) {
      x.push(Math.round(i));
    }
    return x;
  };
  
  fill("gray");

  let remove = (e, r) => e.filter(y => y != r); 

  for (let i of enemyNinjas) {
    nested:
    for (let bul of player.attack.bullets) {
      if (range(i.x - 10, i.x + 10).includes(Math.round(bul.x)) && range(i.y - 10, i.y + 10).includes(Math.round(bul.y))) {
        enemyNinjas = remove(enemyNinjas, i);
        player.attack.bullets = remove(player.attack.bullets, bul);

        continue nested;
      }
    }

    if (isTouchingPlayer(i, player)) {
      alert("You died.");
      
      /*
      let x = document.createElement("a");
      x.href = self.location.href;
      x.click();
      */
    }
 
    i.x += (player.x - i.x) / 20;
    i.y += (player.y - i.y) / 20;
    ellipse(i.x, i.y, 20, 20);
  }
  fill("black");
}

function drawBullets() {
  let roundEquals = (a, b) => Math.round(a) == Math.round(b);
  for (let i of player.attack.bullets) {
    if (roundEquals(i.x, i.target.x) && roundEquals(i.y, i.target.y)) {
      continue;
    }

    fill("lightblue")

    i.x += (i.target.x - i.x) / 30;
    i.y += (i.target.y - i.y) / 30;
    ellipse(i.x, i.y, 10, 10);
  }
  
  fill("black");
}

function _move(pixX, pixY) {
  for (let i of items) {
    i.canvX -= pixX / 2;
    i.canvY -= pixY / 2;

    player.x += pixX / 2 / 20;
    player.y += pixY / 2 / 20;
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