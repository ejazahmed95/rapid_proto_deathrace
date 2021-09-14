import { Scenes } from "../constants";
import Logger from "../utilities/logger";

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
  create() {}
}
