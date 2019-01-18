<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title>Ant simulator</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu
          offset-y
          :close-on-content-click="false"
        >
          <v-card-title>Ants to be spawned {{nrOfAnts}}</v-card-title>
          <v-btn
            slot="activator"
            dark
          >
            Ants: {{ants.length}}</v-btn>
          <v-card>
            <v-container>
              <v-btn
                @click="nrOfAnts++"
                fab
                dark
                small
                color="primary"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-btn
                @click="nrOfAnts--"
                fab
                dark
                small
                color="red"
              >
                <v-icon dark>remove</v-icon>
              </v-btn>
            </v-container>

          </v-card>
        </v-menu>
        <v-btn>Highest Scent: {{highestScent}}</v-btn>
        <v-btn>Ant Size: {{size}}</v-btn>
        <v-btn>Found scent: {{follows}}</v-btn>
        <v-btn>Ants have food: {{foods}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-btn
        color="info"
        @click="run = !run"
      >{{runText}}</v-btn>
      <v-container
        grid-list-md
        text-xs-center
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs8>
            <canvas
              id="map"
              style="border: 1px solid black"
            ></canvas>
          </v-flex>
          <v-flex xs4>
            <v-card v-if="ants.length > 0">
              <v-list two-line>
                <template v-for="(ant, index) in ants">
                  <v-list-tile
                    :key="ant.id"
                    avatar
                    ripple
                    v-if="ant.haveFood"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ ant.name }}</v-list-tile-title>
                      <v-list-tile-sub-title class="text--primary">oldX: {{ ant.oldX }} oldY: {{ant.oldY}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title class="text--primary">X: {{ ant.x }} Y: {{ant.y}}</v-list-tile-sub-title>
                      <v-list-tile-sub-title>Food: {{ant.delivered}} C: {{ant.outOfBoundsCount}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action-text>{{ ant.moves }}</v-list-tile-action-text>
                    <v-list-tile-action>
                      <div>
                        <v-icon
                          color="green"
                          v-if="ant.haveFood"
                        >add_circle</v-icon>
                      </div>
                      <div>
                        <v-icon v-if="ant.direction == 'up'">
                          arrow_upward
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'down'">
                          arrow_downward
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'left'">
                          arrow_back
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'right'">
                          arrow_forward
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'upRight'">
                          call_made
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'downLeft'">
                          call_received
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'upLeft'">
                          call_missed
                        </v-icon>
                        <v-icon v-else-if="ant.direction == 'downRight'">
                          subdirectory_arrow_right
                        </v-icon>
                      </div>

                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < ants.length && ant.followsScent"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Ant } from "./classes/Ant";
import { Cell } from "./classes/Cell";

export default {
  computed: {
    runText() {
      if (this.run) return "Stop simulation";
      else return "Start simulation";
    },

    follows() {
      let arr = this.ants.filter(ant => ant.followScent);
      return arr.length;
    },
    foods() {
      let arr = this.ants.filter(ant => ant.haveFood);
      return arr.length;
    }
  },

  data() {
    return {
      nestPos: {
        x: 100,
        y: 100
      },
      nrOfAnts: 100,
      highestScent: 0,
      ants: [],
      map: [],
      names: [
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
      ],
      run: false,
      lastFrameTimeMs: 0, // The last time the loop was run
      maxFPS: 100, // The maximum FPS we want to allow
      size: 1,
      width: 500,
      height: 500,
      canvas: "",
      ctx: "",
      time: 0,
      mapTypes: ["grass", "water", "dirt", "nothing", "nothing", "nothing"]
    };
  },
  methods: {
    getRandomNuber(start, stop) {
      return Math.floor(Math.random() * stop) + start;
    },

    loop(timestamp) {
      // Throttle the frame rate.
      if (timestamp < this.lastFrameTimeMs + 1000 / this.maxFPS) {
        requestAnimationFrame(this.loop);
        return;
      }
      this.lastFrameTimeMs = timestamp;
      if (this.run) {
        this.time++;
        if (this.time > 2) {
          this.generateAnt(this.time);
          this.time = 0;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawCells();
        this.ants.forEach(ant => {
          ant.walk(this.map, this.size, this.width, this.height);
          ant.draw(this.ctx, this.size);
        });
      }

      requestAnimationFrame(this.loop);
    },

    generateAnt() {
      if (this.ants.length < this.nrOfAnts) {
        let random = Math.floor(Math.random() * this.names.length);
        let ant = new Ant(
          this.ants.length,
          this.nestPos.x,
          this.nestPos.y,
          this.names[random]
        );
        this.ants.push(ant);
      }
    },

    initMap() {
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          if (!this.map[i]) this.map[i] = [];
          let random = Math.floor(Math.random() * this.mapTypes.length);
          this.map[i][j] = new Cell(i, j, this.mapTypes[random]);
        }
      }
    },

    drawCells() {
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          this.map[i][j].draw(this.ctx, this.size);
          if (this.map[i][j].scent > this.highestScent)
            this.highestScent = this.map[i][j].scent;
        }
      }
    },

    generateFood() {
      let random = Math.floor(Math.random() * this.width);
      random = 50;
      for (var i = random; i < random + 10; i++) {
        for (var j = random; j < random + 10; j++) {
          let random = Math.floor(Math.random() * 100);
          let cel = this.map[i][j];
          cel.haveFood = true;
          cel.food = random;
        }
      }
    }
  },

  mounted() {
    //this.ant = new Ant();
    this.canvas = document.getElementById("map");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.initMap();
    this.generateFood();
    this.loop(this.lastFrameTimeMs);
  }
};
</script>
