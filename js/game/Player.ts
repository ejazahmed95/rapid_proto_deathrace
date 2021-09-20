import { Images, Keys, LevelConfig, ObjTags } from '../const';
import MovableObject from '../engine/MovableObject';
import GameObject from '../engine/GameObject';
import DI from "../utilities/DI";
import EventManager from '../utilities/EventManager';
import { GameEvents } from '../utilities/events';
import Pedestrian from './Pedestrian';

export default class Player extends MovableObject {
    private eventManager: EventManager | undefined;

    constructor(scene: Phaser.Scene, x: number, y: number, speed: number, angleSpeed: number) {
        super(scene, x, y, Images.Player, ObjTags.Player);
        this.setCollideWorldBounds(true);

        this.speed = speed;
        this.angleSpeed = angleSpeed;

        this.onColliderEnter = this.onColliderEnter.bind(this);

        this.eventManager = DI.Get("EventManager") as EventManager;
    }

    update(deltaTime: number) {
        let inputs = this.inputManager.getInput();
        let horizontal: number = inputs.contains(Keys.Left) ? -1 : (inputs.contains(Keys.Right) ? 1 : 0);
        let vertical: number = inputs.contains(Keys.Up) ? -1 : (inputs.contains(Keys.Down) ? 1 : 0);

        this.setAngularVelocity(this.angleSpeed * horizontal * deltaTime);
        let radians = this.angle / 180.0 * Math.PI;
        this.setVelocity(-1 * vertical * this.speed * Math.sin(radians) * deltaTime, vertical * this.speed * Math.cos(radians) * deltaTime);
    }

    // we need to matain the collision status
    onColliderEnter(player: Player, other: GameObject) {
        switch (other.getTag()) {
            case ObjTags.Grave:
                break;
            case ObjTags.Pedestrian:
                let pedestrian = other as Pedestrian;
                this.eventManager?.sendEvent(GameEvents.KilledPedestrian, { Pedestrian: pedestrian });
                break;
            case ObjTags.Zombie:
                // score up
                this.eventManager?.sendEvent(GameEvents.KilledZombie, { ObjectID: other.getId() });
                break;
        }
    }

    onColliderExit(object: GameObject) {

    }
}
