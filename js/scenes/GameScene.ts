import { Scenes, Keys, ObjTags } from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Player from "../engine/Player";
import Phaser from "phaser";
import GameObject from "../engine/GameObject";
import {IGameObject, IPlayer} from "../types/types";

export default class GameScene extends Phaser.Scene {
  private pFrameTime: Date = new Date();
  private player: Player;
  private zombies: GameObject[];
  private keys: object;
  constructor() {
    super({
      key: Scenes.GAMEPLAY,
    });
  }

  init(gameConf: any) {
    Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, "Game");
  }

  preload() {
    console.log('GameScene preload.');

    this.load.image('player', '../assets/cross.png');
    this.load.image('zombie', '../assets/car.png');

  }


  create() {
    let game = DI.Get("Game");
    // @ts-ignore
    console.log(game.testValue);

    this.pFrameTime = new Date();

    // this.player = this.add.player(400, 200);  // Player object

    // create zombies
    this.zombies = [];
    console.log();
    this.zombies.push(this.add.object(400, 300, 'zombie', ObjTags.Zombie));

    let zombieGroup = this.add.group();
    this.zombies.forEach(zombie => {
      zombieGroup.add(zombie);
    });
    zombieGroup.enableBody = true;
    zombieGroup.physicsBodyType = Phaser.Physics.Arcade;

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
