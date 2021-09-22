import { ObjTags, Spritesheets } from "../const";
import MovableObject from "../engine/MovableObject";

export default class Warrior extends MovableObject {
	private walkDirection: [number, number] = [0, 0];
	private targetPos: [number, number] = [0, 0];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Spritesheets.Pod["name"], ObjTags.Warrior)
    }

    create() {

    }

    setTarget(x: number, y: number) {
		this.targetPos = [x, y];
        let offset = [x - this.x, y - this.y];
        this.walkDirection = [offset[0] > 0 ? 1 : (offset[0] < 0 ? -1 : 0), offset[1] > 0 ? 1 : (offset[1] < 0 ? -1 : 0)];
    }

    update(deltaTime: number) {
        if (this.enable == false)
            return;

		let offset = [this.targetPos[0] - this.x, this.targetPos[1] - this.y];
		if(Math.abs(offset[0]) > Math.abs(offset[1]))
			this.setVelocity(this.speed * deltaTime * this.walkDirection[0], 0);
		else
			this.setVelocity(0, this.speed * deltaTime * this.walkDirection[1]);
    }
}
