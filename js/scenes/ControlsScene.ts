
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import {Scenes, Images, Tags} from "../const";

export default class ControlsScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.CONTROLS,
    });
  }

  init() {
    Logger.i("scene initialized", Tags.Controls);
  }

  preload() {
  }
  loadImages() {
    // this.load.setPath
  }
  create() {
    this.add.image(0, 0, Images.Square);
  }
}
