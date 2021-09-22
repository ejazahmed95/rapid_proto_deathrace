import GameObject from "../engine/GameObject";
import { Keys, ObjTags, Spritesheets } from '../const';
import { MovableObj } from "../types/types"

export default class Pod extends GameObject {
    constructor(scene: Phaser.Scene, config: MovableObj) {
        super(scene, config.x, config.y, Spritesheets.Pod["name"], ObjTags.Pod);

        this.body.immovable = true;

        this.anims.create({
            key: "spawn",
            frames: this.anims.generateFrameNumbers(Spritesheets.Pod["name"], { start: 0, end: Spritesheets.Pod["framesNum"] - 1 }),
            frameRate: Spritesheets.Pod["frameRate"],
            repeat: 1,
        });

        //this.setEnable(false);
    }

    create() {
        this.play("spawn");
    }

    update() {
        if (!this.isEnable())
            return;
    }

    // active the pod, spawn warrior and destroy
    onActive() {

    }


}
