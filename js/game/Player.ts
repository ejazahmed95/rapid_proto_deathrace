import { Images, Keys, ObjTags } from '../const';
import MovableObject from '../engine/MovableObject';
import GameObject from '../engine/GameObject';
import DI from "../utilities/DI";
import EventManager from '../utilities/EventManager';
import { GameEvents, PedestrianKillInfo, ZombieKillInfo } from '../utilities/events';
import Zombie from './Zombie';

export default class Player extends MovableObject {
    private eventManager: EventManager | undefined;

    constructor(scene: Phaser.Scene, config: object) {
        super(scene, config["x"], config["y"], Images.Player, ObjTags.Player);
        this.setCollideWorldBounds(true);

        this.speed = config["speed"];
        this.angleSpeed = config["angleSpeed"];

        this.onColliderEnter = this.onColliderEnter.bind(this);

        this.eventManager = DI.Get("EventManager") as EventManager;
    }

    update(deltaTime: number) {
        let inputs = this.inputManager.getInput();
        let horizontal: number = inputs.has(Keys.Left) ? -1 : (inputs.has(Keys.Right) ? 1 : 0);
        let vertical: number = inputs.has(Keys.Up) ? -1 : (inputs.has(Keys.Down) ? 1 : 0);

        this.setAngularVelocity(this.angleSpeed * horizontal * deltaTime);
        let radians = this.angle / 180.0 * Math.PI;
        this.setVelocity(-1 * vertical * this.speed * Math.sin(radians) * deltaTime, vertical * this.speed * Math.cos(radians) * deltaTime);
    }

    // we need to matain the collision status
    onColliderEnter(player: Player, other: GameObject) {
        if (other.isEnable() == false)
            return;

        switch (other.getTag()) {
            case ObjTags.Grave:
                break;
            case ObjTags.Pedestrian:
                this.eventManager?.sendEvent(GameEvents.KilledPedestrian, { PedestrianId: other.getId(), PositionX: other.x, PositionY: other.y });
                break;
            case ObjTags.Zombie:
                // score up
                this.eventManager?.sendEvent(GameEvents.KilledZombie, { ZombieId: other.getId() });
                break;
        }
    }

    onColliderExit(object: GameObject) {

    }
}
