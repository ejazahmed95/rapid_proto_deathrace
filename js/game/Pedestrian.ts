import MovableObject from "../engine/MovableObject";
import { Images, Spritesheets, ObjTags } from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";
import EventManager from "../utilities/EventManager";
import { GameEvents } from "../utilities/events";

const PedestrianState = {
    Idle: 0,
    Wander: 1,
    Die: 2,
    Dead: 4
}

export default class Pedestrian extends MovableObject {
    private state: number = PedestrianState.Idle;
    private stateDurationMax: Map = new Map();
    private stateDuration: number = 0;

    private walkDirection: [number, number] = [0, 0];

    // after 10 + id's seconds broadcast position update
    // every pedestrian's interval will be different
    private interval: number = 0;
    private INTERVAL_MAX: number = 0;
    private eventManager: EventManager;

    private boundX: [number, number] = [0, 0];
    private boundY: [number, number] = [0, 0];

    constructor(scene: Phaser.Scene, config: object) {
        super(scene, config["x"], config["y"], Spritesheets.PedStand["name"], ObjTags.Pedestrian);

        this.setCollideWorldBounds(true);
        this.setScale(config["scale"]);


        let layout = (DI.Get("GameInfra") as GameInfra).layout;
        this.boundX = [-layout.Border, layout.GameWidth + layout.Border];
        this.boundY = [-layout.Border, layout.GameHeight - layout.Border];

        this.speed = config["speed"];
        this.stateDuration = 3.0;

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(Spritesheets.PedRun["name"], { start: 0, end: Spritesheets.PedRun["framesNum"] - 1 }),
            frameRate: Spritesheets.PedRun["frameRate"],
            repeat: -1,
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers(Spritesheets.PedStand["name"], { start: 0, end: Spritesheets.PedStand["framesNum"] - 1 }),
            frameRate: Spritesheets.PedStand["frameRate"],
            repeat: -1,
        });

        this.anims.create({
            key: "dead",
            frames: this.anims.generateFrameNumbers(Spritesheets.PedDead["name"], { start: 0, end: Spritesheets.PedDead["framesNum"] - 1 }),
            frameRate: Spritesheets.PedDead["frameRate"],
            repeat: 0,
        });

        this.INTERVAL_MAX = 3 + this.id;
        this.eventManager = DI.Get("EventManager") as EventManager;

        this.stateDurationMax.set(PedestrianState.Idle, 800.0);
        this.stateDurationMax.set(PedestrianState.Wander, 800.0);
        this.stateDurationMax.set(PedestrianState.Die, 200.0);
        this.stateDurationMax.set(PedestrianState.Dead, 100.0);
    }

    create() {
        this.onChangeState(PedestrianState.Idle);
    }

    onChangeState(newState: number) {
        switch (newState) {
            case PedestrianState.Idle:
                this.play("idle");
                this.walkDirection = [0, 0];
                break;
            case PedestrianState.Wander:
                this.walkDirection = [Phaser.Math.Between(-1, 1), Phaser.Math.Between(-1, 1)];
                this.play("walk");
                break;
            case PedestrianState.Die:
                this.play("dead");
                break;
            case PedestrianState.Dead:

                break;
        }

        this.state = newState;
        this.stateDuration = 0.0;
    }

    update(deltaTime: number) {
        if (this.enable || this.state == PedestrianState.Die) {
            this.stateDuration += deltaTime;
            if (this.stateDuration >= this.stateDurationMax.get(this.state)) {
                if (this.state == PedestrianState.Die) {
                    this.onChangeState(PedestrianState.Dead);
                    this.enable = false;
                }
                else {
                    let radio: number = Phaser.Math.FloatBetween(0, 1);
                    this.onChangeState(radio <= 0.3 ? PedestrianState.Idle : PedestrianState.Wander);
                }
            }

            this.setVelocity(this.walkDirection[0] * deltaTime * this.speed, this.walkDirection[1] * deltaTime * this.speed);

            this.interval += deltaTime;
            if (this.interval >= this.INTERVAL_MAX) {
                this.interval = 0;
                this.eventManager.sendEvent(GameEvents.PedestrianPosUpdate, { x: this.x, y: this.y, id: this.id });
            }

            this.x = Math.min(Math.max(this.x, this.boundX[0]), this.boundX[1]);
            this.y = Math.min(Math.max(this.y, this.boundY[0]), this.boundY[1]);
        }
    }

    onKilled() {
        this.enable == false;
        this.onChangeState(PedestrianState.Die);
        this.speed = 0.0;
    }

    isEnable() {
        return this.enable == true && this.state != PedestrianState.Die;
    }
}
