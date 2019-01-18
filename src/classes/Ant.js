export class Ant {
  constructor(id, startX, startY, name) {
    this.id = id;
    this.scentTreshhold = 10;
    this.size = 1;
    this.moves = 0;
    this.oldX = 0;
    this.oldY = 0;
    this.x = startX;
    this.y = startY;
    this.name = name;
    this.direction = "";
    // this.directions = [
    //   "up",
    //   "down",
    //   "left",
    //   "right",
    //   "upRight",
    //   "downRight",
    //   "downLeft",
    //   "upLeft"
    // ];
    this.directions = ["up", "down", "left", "right"];
    this.haveFood = false;
    this.followScent = false;
    this.outOfBoundsCount = 0;
    this.nextCell;
    this.currentCell;
    this.followScent = false;
    this.mapWidth;
    this.mapHeight;
    this.map;
    this.noScentFound = 0;
    this.nestX = startX;
    this.nestY = startY;
    this.previousDirection;
    this.delivered = 0;
  }

  setNextCell(map) {
    this.nextCell = map[this.x][this.y];
  }

  changeDirection() {
    if (this.haveFood) {
      let randNr = Math.floor(Math.random() * 2);
      if (this.x < this.nestX && this.y < this.nestY) {
        if (randNr == 0) this.direction = "down";
        else if (randNr == 1) this.direction = "right";
      }
      if (this.x > this.nestX && this.y < this.nestY) {
        if (randNr == 0) this.direction = "down";
        else if (randNr == 1) this.direction = "left";
      }
      if (this.x < this.nestX && this.y > this.nestY) {
        if (randNr == 0) this.direction = "up";
        else if (randNr == 1) this.direction = "right";
      }
      if (this.x > this.nestX && this.y > this.nestY) {
        if (randNr == 0) this.direction = "up";
        else if (randNr == 1) this.direction = "left";
      }
    } else {
      let random = Math.floor(Math.random() * this.directions.length);
      this.direction = this.directions[random];
    }
  }

  checkCellsInFront(map, width, height) {
    let scent = 0;
    let nextCell;
    let front, left, right, cell;
    switch (this.direction) {
      case "up":
        front = this.y - this.size;
        left = this.x - this.size;
        right = this.x + this.size;

        if (left < 0) left = this.oldX;
        if (right > width - 1) right = this.oldX;
        if (front < 0) front = this.oldY;

        cell = map[this.x][front]; // Up
        //console.log("First", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[left][front];
        //console.log("Second", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[right][front];
        //console.log("Third", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        let compare = this.scentTreshhold;
        if (this.haveFood) compare = 1;
        if (scent > compare) {
          // console.log("-------<UP>---------");
          // console.log(this.oldX, this.oldY);
          // console.log("Strong scent found: ", nextCell.scent);
          // console.log("Moving to: ", nextCell.x, nextCell.y, this.name);
          this.nextCell = nextCell;
          this.followScent = true;
          if (this.oldX == nextCell.x && this.oldY == nextCell.y) {
            this.outOfBoundsCount++;
            // console.log("Same place", this.outOfBoundsCount);
          }
        } else {
          this.followScent = false;
        }
        //console.log("-------<>---------");
        break;
      case "down":
        front = this.y + this.size;
        left = this.x - this.size;
        right = this.x + this.size;

        if (left < 0) left = this.oldX;
        if (right > width - 1) right = this.oldX;
        if (front > height - 1) front = this.oldY;

        cell = map[this.x][front]; // Up
        //console.log("First", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[left][front];
        //console.log("Second", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[right][front];
        //console.log("Third", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }

        if (scent > this.scentTreshhold) {
          // console.log("-------<UP>---------");
          // console.log(this.oldX, this.oldY);
          // console.log("Strong scent found: ", nextCell.scent);
          // console.log("Moving to: ", nextCell.x, nextCell.y, this.name);
          this.nextCell = nextCell;
          this.followScent = true;
          if (this.oldX == nextCell.x && this.oldY == nextCell.y) {
            this.outOfBoundsCount++;
            // console.log("Same place", this.outOfBoundsCount);
          }
        } else {
          this.followScent = false;
        }
        //console.log("-------<>---------");
        break;
      case "left":
        front = this.x - this.size;
        left = this.y - this.size;
        right = this.y + this.size;

        if (left < 0) left = this.oldY;
        if (right > height - 1) right = this.oldY;
        if (front < 0) front = this.oldX;

        cell = map[front][this.y]; // Up
        //console.log("First", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[left][front];
        //console.log("Second", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[right][front];
        //console.log("Third", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }

        if (scent > this.scentTreshhold) {
          // console.log("-------<UP>---------");
          // console.log(this.oldX, this.oldY);
          // console.log("Strong scent found: ", nextCell.scent);
          // console.log("Moving to: ", nextCell.x, nextCell.y, this.name);
          this.nextCell = nextCell;
          this.followScent = true;
          if (this.oldX == nextCell.x && this.oldY == nextCell.y) {
            this.outOfBoundsCount++;
            // console.log("Same place", this.outOfBoundsCount);
          }
        } else {
          this.followScent = false;
        }
        //console.log("-------<>---------");
        break;
      case "right":
        front = this.x + this.size;
        left = this.y - this.size;
        right = this.y + this.size;

        if (left < 0) left = this.oldY;
        if (right > height - 1) right = this.oldY;
        if (front > width - 1) front = this.oldX;

        cell = map[front][this.y]; // Up
        //console.log("First", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[left][front];
        //console.log("Second", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }
        cell = map[right][front];
        //console.log("Third", cell.x, cell.y, cell.scent);
        if (cell.scent > scent) {
          nextCell = cell;
          scent = cell.scent;
        }

        if (scent > this.scentTreshhold) {
          // console.log("-------<UP>---------");
          // console.log(this.oldX, this.oldY);
          // console.log("Strong scent found: ", nextCell.scent);
          // console.log("Moving to: ", nextCell.x, nextCell.y, this.name);
          this.nextCell = nextCell;
          this.followScent = true;
          if (this.oldX == nextCell.x && this.oldY == nextCell.y) {
            this.outOfBoundsCount++;
            // console.log("Same place", this.outOfBoundsCount);
          }
        } else {
          this.followScent = false;
        }
        //console.log("-------<>---------");
        break;
    }
  }

  walk(map, size, width, height) {
    this.map = map;
    this.size = size;
    this.oldX = this.x;
    this.oldY = this.y;
    this.mapWidth = width;
    this.mapHeight = height;

    if (this.direction == "") this.changeDirection();

    this.previousDirection = this.direction;

    if (this.outOfBoundsCount > 10) {
      this.changeDirection();
      this.outOfBoundsCount = 0;
      this.x = this.oldX;
      this.y = this.oldY;
      this.followScent = false;
    }

    if (this.haveFood) {
      this.changeDirection();
      //console.log(this.previousDirection, this.direction);
    }

    this.checkCellsInFront(map, width, height);

    if (!this.followScent) {
      this.noScentFound++;
      if (this.noScentFound > 100 && !this.haveFood) {
        this.changeDirection();
        this.noScentFound = 0;
      }
      let random = Math.floor(Math.random() * 100);
      if (random < 50) return;

      let newPos = Math.floor(Math.random() * 3);

      if (this.direction == "up") this.moveUp(newPos);
      else if (this.direction == "down") this.moveDown(newPos);
      else if (this.direction == "left") this.moveLeft(newPos);
      else if (this.direction == "right") this.moveRight(newPos);
      else if (this.direction == "upRight") this.moveUpRight(newPos);
      else if (this.direction == "upLeft") this.moveUpLeft(newPos);
      else if (this.direction == "downRight") this.moveDownRight(newPos);
      else if (this.direction == "downLeft") this.moveDownLeft(newPos);

      if (this.x == this.oldX && this.y == this.oldY) this.outOfBoundsCount++;
      else this.moves++;
      this.nextCell = map[this.x][this.y];
      if (this.haveFood) {
        if (
          this.checNumberBetweene(this.nestX - 5, this.nestX + 5, this.x) &&
          this.checNumberBetweene(this.nestY - 5, this.nestY + 5, this.y)
        ) {
          this.haveFood = false;
          this.delivered++;
        }
      }
    } else {
      if (this.haveFood) {
        if (
          this.checNumberBetweene(this.nestX - 5, this.nestX + 5, this.x) &&
          this.checNumberBetweene(this.nestY - 5, this.nestY + 5, this.y)
        ) {
          this.haveFood = false;
          this.delivered++;
        }
      }
      this.x = this.nextCell.x;
      this.y = this.nextCell.y;
      this.moves++;
      let nr = Math.floor(Math.random() * 100);
      if (nr < 30) this.changeDirection();
    }

    this.nextCell.entries++;
    this.nextCell.visited = true;

    if (this.nextCell.food > 0) {
      this.haveFood = true;
      if (this.nextCell.food > 0) this.nextCell.food--;
    }

    if (this.haveFood) this.nextCell.scent = 500;
    else {
      if (this.nextCell.scent < 10000) this.nextCell.scent += 50;
    }

    // console.log("X: " + this.x, "Y: ", this.y);
    // console.log(map[this.x][this.y]);

    //console.log("X: " + this.posX, "Y: " + this.posY);
    //console.log("Entries: " + map[this.posX][this.posY].entries);
  }

  checNumberBetweene(start, stop, number) {
    if (number >= start && number <= stop) return true;
    else return false;
  }

  chechOutOfBounds(x, y, width, height) {
    if (x < 0 || x > width - 1) {
      this.outOfBoundsCount++;
      this.x = this.oldX;
      return true;
    }

    if (y < 0 || y > height - 1) {
      this.outOfBoundsCount++;
      this.y = this.oldY;
      return true;
    }

    return false;
  }

  moveUp(random) {
    if (random == 0) this.up();
    else if (random == 1) {
      this.upRight();
    } else if (random == 2) {
      this.upLeft();
    }
  }

  moveUpRight(random) {
    if (random == 0) this.up();
    else if (random == 1) {
      this.upRight();
    } else if (random == 2) {
      this.right();
    }
  }

  moveDownRight(random) {
    if (random == 0) this.down();
    else if (random == 1) {
      this.downRight();
    } else if (random == 2) {
      this.right();
    }
  }

  moveDownLeft(random) {
    if (random == 0) this.down();
    else if (random == 1) {
      this.downLeft();
    } else if (random == 2) {
      this.left();
    }
  }

  moveUpLeft(random) {
    if (random == 0) this.up();
    else if (random == 1) {
      this.upLeft();
    } else if (random == 2) {
      this.left();
    }
  }

  moveDown(random) {
    if (random == 0) this.down();
    else if (random == 1) {
      this.downRight();
    } else if (random == 2) {
      this.downLeft();
    }
  }

  moveLeft(random) {
    if (random == 0) this.left();
    else if (random == 1) {
      this.upLeft();
    } else if (random == 2) {
      this.downLeft();
    }
  }

  moveRight(random) {
    if (random == 0) this.right();
    else if (random == 1) {
      this.upRight();
    } else if (random == 2) {
      this.downRight();
    }
  }

  back() {
    this.x = this.oldX;
    this.y = this.oldY;
  }
  upRight() {
    this.up();
    this.right();
  }
  upLeft() {
    this.up();
    this.left();
  }
  downLeft() {
    this.down();
    this.left();
  }
  downRight() {
    this.down();
    this.right();
  }
  up() {
    let y = this.y - this.size;
    if (y < 0 || y > this.mapHeight - 1) {
      this.outOfBoundsCount++;
      this.y = this.oldY;
    } else this.y = y;
  }
  down() {
    let y = this.y + this.size;
    if (y < 0 || y > this.mapHeight - 1) {
      this.outOfBoundsCount++;
      this.y = this.oldY;
    } else this.y = y;
  }
  left() {
    let x = this.x - this.size;
    if (x < 0 || x > this.mapWidth - 1) {
      this.outOfBoundsCount++;
      this.x = this.oldX;
    } else this.x = x;
  }
  right() {
    let x = this.x + this.size;
    if (x < 0 || x > this.mapWidth - 1) {
      this.outOfBoundsCount++;
      this.x = this.oldX;
    } else this.x = x;
  }

  draw(ctx, size) {
    //let ctx = canvas.getContext("2d");
    //console.log(map[this.posX][this.posY].entries);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, size, size);
    // if (map[this.posX][this.posY].entries > 1) ctx.fillStyle = "#ffcccc";
    // if (map[this.posX][this.posY].entries > 3) ctx.fillStyle = "#ffb3b3";
    // if (map[this.posX][this.posY].entries > 10) ctx.fillStyle = "#ff0000";
    // else ctx.fillStyle = "#ffe6e6";
  }
}
