import MovableObject from "../engine/MovableObject";
import { Images, Spritesheets, ObjTags } from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";
import EventManager from "../utilities/EventManager";
import { GameEvents } from "../utilities/events";

export default class Pedestrian extends MovableObject {
    // after 10 + id's seconds broadcast position update
    // every pedestrian's interval will be different
    private interval: number = 0;
    private INTERVAL_MAX: number = 0;
    private eventManager: EventManager;

    private stateDuration: number = 0;
    private walkDirection: [number, number] = [0, 0];

    private boundX: [number, number] = [0, 0];
    private boundY: [number, number] = [0, 0];

    constructor(scene: Phaser.Scene, config: object) {
        super(scene, config["x"], config["y"], Spritesheets.Pedestrian["name"], ObjTags.Pedestrian);
        this.setCollideWorldBounds(true);


        let layout = (DI.Get("GameInfra") as GameInfra).layout;
        this.boundX = [-layout.Border, layout.GameWidth + layout.Border];
        this.boundY = [-layout.Border, layout.GameHeight - layout.Border];

        this.speed = config["speed"];
        this.stateDuration = 3.0;

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(Spritesheets.Pedestrian["name"], { start: 0, end: Spritesheets.Pedestrian["framesNum"] - 1 }),
            frameRate: 8,
            repeat: -1,
        });
        this.play('walk');

        this.INTERVAL_MAX = 3 + this.id;

        this.eventManager = DI.Get("EventManager") as EventManager;
    }

    update(deltaTime: number) {
        if (this.enable == false)
            return;


        this.stateDuration -= deltaTime;

        if (this.x < this.boundX[0] || this.x > this.boundX[1])
            this.stateDuration = 0;
        if (this.y < this.boundY[0] || this.y > this.boundY[1])
            this.stateDuration = 0;

        if (this.stateDuration <= 0) {
            let radio: number = Phaser.Math.FloatBetween(0, 1);
            if (radio <= 0.3) {
                this.stateDuration = 1000; // ms
                // do nothing
            } else {
                this.stateDuration = 3000;
                // random move
                this.walkDirection[0] = Phaser.Math.Between(-1, 1);
                this.walkDirection[1] = Phaser.Math.Between(-1, 1);
            }
        }

        this.setVelocity(this.walkDirection[0] * deltaTime * this.speed, this.walkDirection[1] * deltaTime * this.speed);

        this.interval += deltaTime;
        if (this.interval >= this.INTERVAL_MAX) {
            this.interval = 0;
            this.eventManager.sendEvent(GameEvents.PedestrianPosUpdate, { x: this.x, y: this.y, id: this.id });
        }
    }
}
