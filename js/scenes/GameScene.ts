import {Scenes, Keys, ObjTags, Images, Tags} from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Player from "../engine/Player";
import Phaser, { Game } from "phaser";
import GameObject from "../engine/GameObject";
import {IGameObject, IPlayer} from "../types/types";
import Texture = Phaser.Textures.Texture;
import Pedestrian from "../game/Pedestrian";
import GameInfra from "../utilities/GameInfra";

import GameConf from "../game/config";
import EventManager from "../utilities/EventManager";
import {GameEvents} from "../utilities/events";
import InputManager from "../engine/InputManager";

export default class GameScene extends Phaser.Scene {
  private gameTime: Date = new Date();
  private player: Player;
  private pedestrianGroup: Phaser.GameObjects.Group;
  private inputManager: InputManager;
  
  private pedestrians: Pedestrian[]=[];
  private graves: GameObject[] = [];

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
    let eventManager: EventManager = DI.Get('EventManager');
    eventManager.clearAll();
    eventManager.addHandler(GameEvents.Killed_Pedestrian, this.onPedestrianKilled);

    this.inputManager = new InputManager(this);
    DI.Register('InputManager', this.inputManager);

    this.createFactories();

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

    let layout = (DI.Get("GameInfra") as GameInfra).layout;
    this.physics.world.setBounds(layout.Border, layout.Border, layout.GameWidth, layout.GameHeight);

    // register collider with group
    this.physics.add.overlap(this.player, this.pedestrianGroup, this.onPedestrianKilled, null, this)
    this.physics.add.overlap(this.pedestrianGroup, this.pedestrianGroup, this.onPedestrianSelfHit, null, this)
  }

  update() {
    let curtTime = new Date();
    let deltaTime = curtTime - this.gameTime;
    this.gameTime = curtTime;

    this.inputManager.update(deltaTime);
    this.player.update(deltaTime);

    this.pedestrians.forEach(element => {
        element.update(deltaTime);
      });
  }

  onPedestrianKilled(player: Player, others: GameObject)
  {
    console.log('onPedestrianKilled' + others.getTag());
    if(others.getTag() == ObjTags.Pedestrian)
    {
      let pedestrian = others as Pedestrian;
      pedestrian.onKill();
      this.pedestrianGroup.remove(pedestrian);
      this.graves.push(this.add.gameObject(pedestrian.x, pedestrian.y, Images.Cross, ObjTags.Grave));
    }
  }

  onPedestrianSelfHit(obj1: Pedestrian, obj2: Pedestrian)
  {
    obj1.onMoveReverse();
    obj2.onMoveReverse();
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