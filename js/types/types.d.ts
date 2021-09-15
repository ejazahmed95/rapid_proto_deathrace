import GameObjects = Phaser.GameObjects;

export interface GameConfig {
  PedestrianCount: number,
  ZombieCount: number,
}

export interface Layout {
  GameWidth: number,
  GameHeight: number,
  Border: number,
  ControlsWidth: number,
  ControlsHeight: number,
  ControlButtonSize: number,
  TotalHeight: number,
  TotalWidth: number,
}

declare interface IGameObject extends Phaser.GameObjects.Sprite {

}

declare interface IPlayer extends IGameObject {

}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    object(): IGameObject
  }

  interface GameObjectFactory {
    player(): IPlayer
  }
}
