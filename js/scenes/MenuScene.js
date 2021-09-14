import { Scenes, Tags } from "../constants";
import GameConf from "../game/config";
import Logger from "../utilities/logger";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.MENU,
    });
  }

  init() {
    Logger.i("scene initialized", Tags.Menu);
  }
  preload() {}
  create() {
    setTimeout(() => {
      this.scene.start(Scenes.GAMEPLAY, GameConf)
    }, 2);
  }
}
