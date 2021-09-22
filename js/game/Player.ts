import { Images, Keys, ObjTags, Spritesheets } from '../const';
import MovableObject from '../engine/MovableObject';
import GameObject from '../engine/GameObject';
import DI from "../utilities/DI";
import EventManager from '../utilities/EventManager';
import { GameEvents, InputChangeInfo, PedestrianKillInfo, ZombieKillInfo } from '../utilities/events';
import { MovableObj } from "../types/types"

const PlayerState = {
    Idle: 0,
    Move: 1
}

export default class Player extends MovableObject {
    private eventManager: EventManager | undefined;
    private state: number = PlayerState.Idle;

    constructor(scene: Phaser.Scene, config: MovableObj) {
        super(scene, config.x, config.y, Spritesheets.PlayerIdle["name"], ObjTags.Player);
		this.body.offset.x = 16;
		this.body.offset.y = 16;
		this.setCollideWorldBounds(true);

        this.speed = config.speed;
        this.angleSpeed = config.angleSpeed ? config.angleSpeed : 0;

        this.onColliderEnter = this.onColliderEnter.bind(this);

        this.eventManager = DI.Get("EventManager") as EventManager;

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers(Spritesheets.PlayerIdle["name"], { start: 0, end: Spritesheets.PlayerIdle["framesNum"] - 1 }),
            frameRate: Spritesheets.PlayerIdle["frameRate"],
            repeat: -1,
        });

        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers(Spritesheets.PlayerMove["name"], { start: 0, end: Spritesheets.PlayerMove["framesNum"] - 1 }),
            frameRate: Spritesheets.PlayerMove["frameRate"],
            repeat: -1,
        });

        this.play("idle");

        this.eventManager.addHandler(GameEvents.InputChange, this.onKeyStateChange = this.onKeyStateChange.bind(this));
    }

    onChangeState(newState: number) {
        if (newState == this.state)
            return;
        if (newState == PlayerState.Idle)
            this.play("idle");
        else
            this.play("move");
        this.state = newState;
    }

    update(deltaTime: number) {
        let inputs = this.inputManager.getInput();
        let horizontal: number = inputs.contains(Keys.Left) ? -1 : (inputs.contains(Keys.Right) ? 1 : 0);
        let vertical: number = inputs.contains(Keys.Up) ? -1 : (inputs.contains(Keys.Down) ? 1 : 0);

        this.setAngularVelocity(this.angleSpeed * horizontal * deltaTime);
        let radians = this.angle / 180.0 * Math.PI;
        this.setVelocity(-1 * vertical * this.speed * Math.sin(radians) * deltaTime, vertical * this.speed * Math.cos(radians) * deltaTime);

        this.onChangeState(inputs.size == 0 ? PlayerState.Idle : PlayerState.Move);

    }

    // we need to matain the collision status
    onColliderEnter(player: Player, other: GameObject) {
        if (other.isEnable() == false)
            return;

        switch (other.getTag()) {
            case ObjTags.Grave:
                break;
            case ObjTags.Pedestrian:
                this.eventManager?.sendEvent(GameEvents.KilledPedestrian, { PedestrianId: other.getId(), PositionX: other.x, PositionY: other.y } as PedestrianKillInfo);
                break;
            case ObjTags.Zombie:
                // score up
                this.eventManager?.sendEvent(GameEvents.KilledZombie, { ZombieId: other.getId(), PositionX: other.x, PositionY: other.y } as ZombieKillInfo);
                break;
        }
    }

    onColliderExit(object: GameObject) {

    }

    onKeyStateChange(info: InputChangeInfo) {
        if (info.Key == Keys.Action && info.IsDown == true) {
            this.eventManager?.sendEvent(GameEvents.SummonWarrior);
        }
    }
}
