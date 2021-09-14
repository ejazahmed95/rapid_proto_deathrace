import Phaser from "phaser";
import Logger from "./utilities/logger";
import { Tags } from "./constants";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameoverScene from "./scenes/GameoverScene";
import DI from "./utilities/DI";

export default class ZombieApocalypse {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 640,
      height: 1080,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 200}
        }
      },
      scene: [
        MenuScene, GameScene
      ]
    };
    DI.objects = {};
    this.game = new Phaser.Game(this.config);
    this.game.testValue = "Some test value";
    DI.Register("Game", this.game);
    //bind methods

  }

  init () {
    Logger.i("zombie apocalypse file is initialized");
  }

  preload() {

  }

  create() {

  }

  update() {

  }

}

function startGame() {

  var game = new Phaser.Game(config);

  function preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  function create() {
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
      speed: 100,
      scale: {start: 1, end: 0},
      blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}
