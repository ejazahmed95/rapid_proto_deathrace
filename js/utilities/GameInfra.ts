import {Layout} from "../types/types";

export default class GameInfra {
  public width: number = 640;
  public height: number = 640;

  public layout: Layout;
  constructor(width: number, height: number) {
    let borderSize = 24;
    let controlButtonSize = 32;
    let gameSize = width - borderSize*2;
    this.layout = {
      Border: 24,
      ControlButtonSize: 32,
      ControlsHeight: height - width,
      ControlsWidth: width,
      GameHeight: gameSize,
      GameWidth: gameSize,
      TotalHeight: height,
      TotalWidth: width
    }
  }
}
