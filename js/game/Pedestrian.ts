import GameObject from "../engine/GameObject";
import { Images, Spritesheets, ObjTags } from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";
import EventManager from "../utilities/EventManager";
import { GameEvents } from "../utilities/events";

export default class Pedestrian extends GameObject {
    // after 10 + id's seconds broadcast position update
    // every pedestrian's interval will be different
    private interval: number = 0;
    private INTERVAL_MAX: number = 0;
    private eventManager: EventManager;

    private statusDuration: number;
    private movement: [number, number] = [0, 0];
    private boundX: [number, number] = [0, 0];
    private boundY: [number, number] = [0, 0];

    constructor(scene: Phaser.Scene, config: object) {
        super(scene, config["x"], config["y"], Spritesheets.Pedestrian["name"], ObjTags.Pedestrian);
        this.setCollideWorldBounds(true);

        this.statusDuration = 0;
        let layout = (DI.Get("GameInfra") as GameInfra).layout;
        this.boundX = [-layout.Border, layout.GameWidth + layout.Border];
        this.boundY = [-layout.Border, layout.GameHeight - layout.Border];

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers(Spritesheets.Pedestrian["name"], { start: 0, end: Spritesheets.Pedestrian["framesNum"] - 1 }),
            frameRate: 8,
            repeat: -1,
        });
        this.play('walk');

        this.INTERVAL_MAX = 10 + this.id;

        this.eventManager = DI.Get("EventManager") as EventManager;
        console.log("Constructot pedestrian");
        this.enable = true;
    }

    update(deltaTime: number) {
        if (this.enable == false)
            return;

        /*
    this.statusDuration -= deltaTime;

    if (this.x < this.boundX[0] || this.x > this.boundX[1])
        this.statusDuration = 0;
    if (this.y < this.boundY[0] || this.y > this.boundY[1])
        this.statusDuration = 0;

    if (this.statusDuration <= 0) {
        let radio: number = Phaser.Math.FloatBetween(0, 1);
        if (radio <= 0.3) {
            this.statusDuration = 1000; // ms
            // do nothing
        } else {
            this.statusDuration = 3000;
            // random move
            this.movement[0] = Phaser.Math.Between(-1, 1);
            this.movement[1] = Phaser.Math.Between(-1, 1);
        }
    }

    this.setVelocity(this.movement[0] * deltaTime * this.speed, this.movement[1] * deltaTime * this.speed);
*/
        this.interval += deltaTime;
        if (this.interval >= this.INTERVAL_MAX) {
            this.interval = 0;
            this.eventManager.sendEvent(GameEvents.PedestrianPosUpdate, { x: this.x, y: this.y, id: this.id });
        }
    }

    onMoveReverse() {
        this.statusDuration = 3000;
        this.movement[0] = -this.movement[0];
        this.movement[1] = -this.movement[1];
    }

    onFreeze() {
        this.statusDuration = 3000;
        this.movement = [0, 0];
    }
}
