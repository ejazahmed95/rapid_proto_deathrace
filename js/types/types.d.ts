import GameObjects = Phaser.GameObjects;

export interface GameConfig {
    PedestrianCount: number,
    ZombieCount: number,
}

export interface ImmovableObj {
	id?: number,
	x: number,
	y: number
}

export interface MovableObj {
	id?: number,
	x: number,
	y: number,
	speed: number,
	angleSpeed?: number,
}
export interface LevelConfig {
	Player: MovableObj,
	Zombies: MovableObj[],
	Graves: ImmovableObj[],
	Pedestrians: MovableObj[]
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

export declare namespace Phaser.GameObjects {
    interface GameObjectFactory {
        gameObject(): IGameObject
    }

    interface GameObjectFactory {
        player(): IPlayer
    }
}
