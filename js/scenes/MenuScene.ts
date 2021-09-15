import {Images, Scenes, Tags} from "../const";
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
  preload() {
    this.loadImages();
  }

  create() {
    this.scene.launch(Scenes.CONTROLS, GameConf);

    // for(let type in this.cache) {
    //   console.log(type)
    //
    //   if (type != 'game') {
    //     for (let entry in this.cache[type]) {
    //       this.cache[type].remove(entry);
    //     }
    //   }
    //
    // }

    setTimeout(() => {
      this.scene.start(Scenes.GAMEPLAY, GameConf)
    }, 2);
  }

  private loadImages() {
    this.load.setPath("../assets/images");
    for(let image in Images) {
      // @ts-ignore
      this.load.image(Images[image], Images[image]);
    }
  }
}
