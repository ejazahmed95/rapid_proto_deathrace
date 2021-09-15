import Phaser from "phaser";
import Logger from "./utilities/logger";
import { Tags } from "./constants";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import GameoverScene from "./scenes/GameoverScene";
import DI from "./utilities/DI";
import GameInfra from "./utilities/GameInfra";
import ControlsScene from "./scenes/ControlsScene";
import EventManager from "./utilities/EventManager";

export default class ZombieApocalypse {
  private readonly config: Phaser.Types.Core.GameConfig;
  private readonly game: Phaser.Game;

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
         MenuScene, ControlsScene, GameScene, GameoverScene
      ],
      pixelArt: true,
    };
    this.game = new Phaser.Game(this.config);
    this.initializeDeps();

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

  initializeDeps() {
    // @ts-ignore
    this.game.testValue = "Some test value";

    DI.Register("Game", this.game);
    // @ts-ignore
    DI.Register("GameInfra", new GameInfra(this.game.config.width, this.game.config.height));
    DI.Register("EventManager", new EventManager());
  }
}
