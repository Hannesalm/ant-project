let names = [
  "Harry",
  "Ross",
  "Bruce",
  "Cook",
  "Carolyn",
  "Morgan",
  "Albert",
  "Walker",
  "Randy",
  "Reed",
  "Larry",
  "Barnes",
  "Lois",
  "Wilson",
  "Jesse",
  "Campbell",
  "Ernest",
  "Rogers",
  "Theresa",
  "Patterson",
  "Henry",
  "Simmons",
  "Michelle",
  "Perry",
  "Frank",
  "Butler",
  "Shirley"
];
var animate = false;

var animate = document
  .getElementById("animate")
  .addEventListener("click", function() {
    animate = !animate;
  });

var lastFrameTimeMs = 0; // The last time the loop was run
var maxFPS = 20; // The maximum FPS we want to allow

var size = 1;

let width = 500;
let height = 300;
var canvas = document.getElementById("map");
var wrapper = document.getElementById("wrapper");
var info = document.getElementById("info");
var moves = document.createElement("p");
var namesList = document.getElementById("names");
var nrOfAnts = document.createElement("p");
info.appendChild(moves);
info.appendChild(nrOfAnts);
canvas.width = width;
canvas.height = height;

//document.getElementsByTagName("body")[0].appendChild(canvas);

let ctx = canvas.getContext("2d");

var map = [];
var ants = [];

function initMap() {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (!map[i]) map[i] = [];
      map[i][j] = new Cell(i, j);
    }
  }
}

function drawCells() {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      map[i][j].draw();
    }
  }
}

function generateFood() {
  let random = Math.floor(Math.random() * width);
  random = 50;
  for (var i = random; i < random + 10; i++) {
    for (var j = random; j < random + 10; j++) {
      let random = Math.floor(Math.random() * 100);
      let cel = map[i][j];
      cel.haveFood = true;
      cel.food = random;
    }
  }
}

function Walker(startX, startY, name) {
  this.moves = Math.floor(Math.random() * 100);
  this.oldX = 0;
  this.oldY = 0;
  this.posX = startX;
  this.posY = startY;
  this.name = name;
  this.direction = "";
  this.haveFood = false;
  this.followScent = false;
  this.walk = function() {
    let direction;
    this.oldX = this.posX;
    this.oldY = this.posY;
    let currentCell = map[this.posY][this.posX];

    if (currentCell.food > 0) {
      //console.log(currentCell);
      this.haveFood = true;
    }
    if (currentCell.permanent) {
      direction = followScent();
    }

    //moves.innerHTML = "Old X: " + this.posX + "   " + "Old Y: " + this.posY;
    if (this.haveFood) {
      direction = Math.floor(Math.random() * 2);
    } else {
      if (this.moves < 2) {
        direction = this.direction;
      } else {
        this.moves = 0;
        direction = Math.floor(Math.random() * 8);
      }
    }

    if (direction == 0 || direction == 4) {
      // Left
      this.posX = this.posX - size;
      this.direction = direction;
    } else if (direction == 1 || direction == 5) {
      // Up
      this.posY = this.posY - size;
      this.direction = direction;
    } else if (direction == 2 || direction == 6) {
      // Down
      this.posY = this.posY + size;
      this.direction = direction;
    } else if (direction == 3 || direction == 7) {
      // Right
      this.posX = this.posX + size;
      this.direction = direction;
    }

    if (this.posX < 0 || this.posX > width - 1) {
      this.posX = this.oldX;
    }

    if (this.posY < 0 || this.posY > height - 1) {
      this.posY = this.oldY;
    }
    //console.log("X: " + this.posX, "Y: ", this.posY);
    //console.log(map[this.posY][this.posX]);
    let cell = map[this.posY][this.posX];
    cell.entries++;
    cell.visited = true;

    if (this.haveFood) cell.permanent = true;
    else cell.scent = 100;

    //console.log("X: " + this.posX, "Y: " + this.posY);
    //console.log("Entries: " + map[this.posX][this.posY].entries);
    this.moves++;
  };

  this.draw = function() {
    let ctx = canvas.getContext("2d");
    //console.log(map[this.posX][this.posY].entries);
    ctx.fillStyle = "black";
    ctx.fillRect(this.posX, this.posY, size, size);
    // if (map[this.posX][this.posY].entries > 1) ctx.fillStyle = "#ffcccc";
    // if (map[this.posX][this.posY].entries > 3) ctx.fillStyle = "#ffb3b3";
    // if (map[this.posX][this.posY].entries > 10) ctx.fillStyle = "#ff0000";
    // else ctx.fillStyle = "#ffe6e6";
  };
}

function Cell(y, x) {
  this.x = x;
  this.y = y;
  this.entries = 0;
  this.scent = 9;
  this.visited = false;
  this.food = 0;
  this.haveFood = false;
  this.permanent = false;

  this.draw = function() {
    if (this.haveFood) {
      if (this.food < 10) ctx.fillStyle = "#d9ffcc";
      else if (this.food > 10 && this.foo < 50) ctx.fillStyle = "#8cff66";
      else ctx.fillStyle = "#33cc00";

      ctx.fillRect(this.x, this.y, size, size);
    } else {
      if (this.visited) {
        let number = "" + this.scent;
        switch (number) {
          case "0":
            ctx.fillStyle = "#ffffff";
            break;
          case "1":
            ctx.fillStyle = "#ffe6e6";
            break;
          case "2":
            ctx.fillStyle = "#ffcccc";
            break;
          case "3":
            ctx.fillStyle = "#ffb3b3";
            break;
          case "4":
            ctx.fillStyle = "#ff9999";
            break;
          case "5":
            ctx.fillStyle = "#ff8080";
            break;
          case "6":
            ctx.fillStyle = "#ff6666";
            break;
          case "7":
            ctx.fillStyle = "#ff4d4d";
            break;
          case "8":
            ctx.fillStyle = "#ff3333";
            break;
          case "9":
            ctx.fillStyle = "#ff0000";
            break;
          default:
            ctx.fillStyle = "#b3d1ff";
            break;
        }
        if (!this.permanent) this.scent--;

        if (this.scent < 0) {
          this.visited = false;
          this.scent = 9;
        }

        //console.log(this.counter, this.x, this.y, size, ctx.fillStyle);

        ctx.fillRect(this.x, this.y, size, size);
      }
    }
  };
}

function generateAnts() {
  let random = Math.floor(Math.random() * 500) + 100;
  for (var i = 0; i < random; i++) {
    let random = Math.floor(Math.random() * names.length);
    ants[i] = new Walker(100, 100, names[random]);
    // let a = document.createElement("li");
    // a.innerHTML = names[random];
    // namesList.appendChild(a);
  }
  nrOfAnts.innerHTML = "Number of ants: " + ants.length;
}

function followScent() {}

initMap();
generateAnts();
generateFood();

function mainLoop(timestamp) {
  // Throttle the frame rate.
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(mainLoop);
    return;
  }
  lastFrameTimeMs = timestamp;
  if (animate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCells();
    ants.forEach(ant => {
      ant.walk();
      ant.draw();
    });
  }

  requestAnimationFrame(mainLoop);
}

// Start things off
requestAnimationFrame(mainLoop);
