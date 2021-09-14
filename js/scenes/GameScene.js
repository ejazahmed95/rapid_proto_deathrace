import { Scenes } from "../constants";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.GAMEPLAY,
    });
  }

  init(gameConf) {
    Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, "Game Scene");
  }
  preload() {}
  create() {
    let game = DI.Get("Game");
    console.log(game.testValue);
  }
}
