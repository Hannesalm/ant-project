export class Cell {
  constructor(x, y, mapType) {
    this.x = x;
    this.y = y;
    this.entries = 0;
    this.scent = 0;
    this.visited = false;
    this.food = 0;
    this.haveFood = false;
    this.permanent = false;
    this.type = mapType;
  }

  draw(ctx, size) {
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
            ctx.fillStyle = "#e6f7ff";
            break;
          case "2":
            ctx.fillStyle = "#cceeff";
            break;
          case "3":
            ctx.fillStyle = "#b3e6ff";
            break;
          case "4":
            ctx.fillStyle = "#99ddff";
            break;
          case "5":
            ctx.fillStyle = "#80d4ff";
            break;
          case "6":
            ctx.fillStyle = "#66ccff";
            break;
          case "7":
            ctx.fillStyle = "#4dc3ff";
            break;
          case "8":
            ctx.fillStyle = "#33bbff";
            break;
          case "9":
            ctx.fillStyle = "#1ab2ff";
            break;
          case "50":
            ctx.fillStyle = "#006699";
            break;
          default:
            if (this.scent > 200) ctx.fillStyle = "#004466";
            if (this.scent > 500) ctx.fillStyle = "#00111a";
            else ctx.fillStyle = "#0088cc";
            break;
        }
        if (!this.permanent) this.scent--;

        if (this.scent < 0) {
          this.visited = false;
          this.scent = 0;
        }

        //console.log(this.counter, this.x, this.y, size, ctx.fillStyle);
        ctx.fillRect(this.x, this.y, size, size);
      }
    }
  }
}
