import { ObjTags, Spritesheets } from "../const";
import MovableObject from "../engine/MovableObject";
import { MovableObj } from "../types/types";

export default class Warrior extends MovableObject {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Spritesheets.Pod["name"], ObjTags.Warrior)
    }

    create() {

    }

    setTarget(x: number, y: number) {
        let offset = [x - this.x, y - this.y];
        let walkDirection = [offset[0] > 0 ? 1 : (offset[0] < 0 ? -1 : 0), offset[1] > 0 ? 1 : (offset[1] < 0 ? -1 : 0)];
    }

    update() {
        if (this.enable == false)
            return;
    }


}