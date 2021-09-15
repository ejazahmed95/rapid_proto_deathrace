import {Scenes, Keys, ObjTags, Images, Tags} from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Player from "../engine/Player";
import Phaser from "phaser";
import GameObject from "../engine/GameObject";
import {IGameObject, IPlayer} from "../types/types";
import Texture = Phaser.Textures.Texture;
import Pedestrian from "../game/Pedestrian";

export default class GameScene extends Phaser.Scene {
  private pFrameTime: Date = new Date();
  private player: Player;
  // private zombies: GameObject[];
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

    this.pFrameTime = new Date();
    this.createFactories();
    // let go = new GameObject(this, 400, 200, Images.Car, ObjTags.Player);
    this.player = this.add.player(300, 200);
    let pedestrian = this.add.pedestrian(200, 200);
    // this.player = this.add.player(400, 200);  // Player object

    // create zombies
    // this.zombies = [];
    // console.log();
    // this.zombies.push(this.add.object(400, 300, 'zombie', ObjTags.Zombie));
    //
    // let zombieGroup = this.add.group();
    // this.zombies.forEach(zombie => {
    //   zombieGroup.add(zombie);
    // });
    // zombieGroup.enableBody = true;
    // zombieGroup.physicsBodyType = Phaser.Physics.Arcade;
    //
    // // add collider detection for player and zombies
    // this.physics.add.overlap(
    //   this.player, this.zombies[0], this.player.onHitEnter, null, this);

    // keyboard event
    // this.keys = this.input.keyboard.addKeys('W,S,A,D');
  }

  update() {
    var cFrameTime = new Date();
    // @ts-ignore
    var deltaTime = (cFrameTime - this.pFrameTime) / 10.0;
    this.pFrameTime = cFrameTime;

    let x =
      (this.keys.A.isDown ? -1 : (this.keys.D.isDown ? 1 : 0)) * deltaTime;
    let y =
      (this.keys.W.isDown ? -1 : (this.keys.S.isDown ? 1 : 0)) * deltaTime;

    this.player?.move(x, y);
  }

  createFactories() {
    Phaser.GameObjects.GameObjectFactory.register(
      'gameObject', function(x: number, y: number, sprite: Texture, tag: number, movable = true) {
        const object = new GameObject(this.scene, x, y, sprite, tag);
        return object;
      }
    )

    Phaser.GameObjects.GameObjectFactory.register('player',
      function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
        const player = new Player(this.scene, x, y);
        return player;
      });

    Phaser.GameObjects.GameObjectFactory.register('pedestrian',
      function(x: number, y: number) {
        const player = new Pedestrian(this.scene, x, y);
        return player;
      });

    // Phaser.GameObjects.GameObjectFactory.register('zombie',
    //   function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    //     const player = new Player(this.scene, x, y);
    //     return player;
    //   });

  }
}
