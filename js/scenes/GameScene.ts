import {Scenes, Keys, ObjTags, Images, Tags} from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Player from "../engine/Player";
import Phaser from "phaser";
import GameObject from "../engine/GameObject";
import {IGameObject, IPlayer} from "../types/types";
import Texture = Phaser.Textures.Texture;
import Pedestrian from "../game/Pedestrian";
import GameInfra from "../utilities/GameInfra";

import GameConf from "../game/config";

export default class GameScene extends Phaser.Scene {
  private gameTime: Date = new Date();
  private player: Player;
  
  private pedestrians: Pedestrian[]=[];
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
  }


  create() {
    let game = DI.Get("Game");

    this.pFrameTime = new Date();
    this.createFactories();
    // let go = new GameObject(this, 400, 200, Images.Car, ObjTags.Player);
    //@ts-ignore
    this.player = this.add.player(300, 200);

    this.pedestrianGroup = this.add.group();
     for(let index = 0; index < GameConf.PedestrianCount; index++)
     {
      this.pedestrians.push(this.add.pedestrian(200 + 50 * index, 300));
      this.pedestrianGroup.add(this.pedestrians[index]);
     }
     this.pedestrianGroup.enableBody = true;
     this.pedestrianGroup.physicsBodyType = Phaser.Physics.Arcade;

    // keyboard event
    this.keys = this.input.keyboard.addKeys('W,S,A,D,R');

    let layout = (DI.Get("GameInfra") as GameInfra).layout;
    this.physics.world.setBounds(layout.Border, layout.Border, layout.GameWidth, layout.GameHeight);

    // register collider with group
    this.physics.add.overlap(
    this.player, this.pedestrianGroup, this.removeFromCollide, null, this);//this.player.onHitEnter, null, this);
  }

  update() {
    let curtTime = new Date();
    let deltaTime = curtTime - this.gameTime;
    this.gameTime = curtTime;

    let x =
      (this.keys.A.isDown ? -1 : (this.keys.D.isDown ? 1 : 0));
    let y =
      (this.keys.W.isDown ? -1 : (this.keys.S.isDown ? 1 : 0));

    this.player.move(x, y, deltaTime);
    this.player.update();

    // test code
    if(this.keys.R.isDown)
    this.pedestrians.forEach(element => {
      element.onSpawn();
    });
  }

  removeFromCollide(player : Player, other: GameObject)
  {
    console.log('removeFromCollide' + other.getTag());
    if(other.getTag() == ObjTags.Pedestrian)
    {
      this.pedestrianGroup.remove(other);
    }
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
