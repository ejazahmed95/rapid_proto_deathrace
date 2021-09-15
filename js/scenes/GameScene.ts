import { Scenes } from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.GAMEPLAY,
    });
  }

  init(gameConf: any) {
    Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, "Game");
  }

  preload() {}
  create() {
    let game = DI.Get("Game");
    // @ts-ignore
    console.log(game.testValue);
  }
}
