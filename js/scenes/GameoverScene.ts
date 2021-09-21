import { Scenes } from "../const";
import TextStyle = Phaser.GameObjects.TextStyle;

export default class GameoverScene extends Phaser.Scene {
  constructor() {
    super({
      key: Scenes.GAME_OVER,
    });
  }

  init() {}
  preload() {}
  create() {
	  this.add.text(260, 300, "Game Over", {fontFamily: "arcade-basic", fontSize: `32px`} as TextStyle);
  }
}
