
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import {Scenes, Images, Tags} from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";

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
    let layout = (DI.Get("GameInfra") as GameInfra).layout;
    const controlBg = this.add.sprite(0, layout.GameHeight + layout.Border*2, Images.Square);
    controlBg.setOrigin(0, 0);
    controlBg.displayWidth = layout.TotalWidth;
    controlBg.displayHeight = layout.ControlsHeight;
    controlBg.tint = 0xffee0d;
    controlBg.alpha = 0.5;
  }
}
