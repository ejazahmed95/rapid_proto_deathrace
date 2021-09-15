import {Scenes} from '../constants';
import {Keys, ObjTags} from '../constants';
import Player from '../engine/Player';
import DI from '../utilities/DI';
import Logger from '../utilities/logger';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.GAMEPLAY,
    });
  }

  init(gameConf) {
    Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, 'Game Scene');
  }

  preload() {
    console.log('GameScene preload.');

    this.load.image('player', '../assets/cross.png');
    this.load.image('zombie', '../assets/car.png');
  }

  create() {
    let game = DI.Get('Game');
    console.log(game.testValue);

    this.pFrameTime = new Date();

    this.player = this.add.player(400, 200);  // Player object

    // create zombies
    this.zombies = [];
    this.zombies.push(this.add.object(400, 300, 'zombie', ObjTags.Zombie));

    var zombieGroup = this.add.group();
    this.zombies.forEach(zombie => {
      zombieGroup.add(zombie);
    });
    zombieGroup.enableBody = true;
    zombieGroup.physicsBodyType = Phaser.Physics.ARCADE;

    // add collider detection for player and zombies
    this.physics.add.overlap(
        this.player, this.zombies[0], this.player.onHitEnter, null, this);

    // keyboard event
    this.keys = this.input.keyboard.addKeys('W,S,A,D');
  }

  update() {
    var cFrameTime = new Date();
    var deltaTime = (cFrameTime - this.pFrameTime) / 10.0;
    this.pFrameTime = cFrameTime;

    let x =
        (this.keys.A.isDown ? -1 : (this.keys.D.isDown ? 1 : 0)) * deltaTime;
    let y =
        (this.keys.W.isDown ? -1 : (this.keys.S.isDown ? 1 : 0)) * deltaTime;

    this.player.move(x, y);
  }
}
