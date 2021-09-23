import { ObjTags, Spritesheets } from "../const";
import MovableObject from "../engine/MovableObject";

export default class Warrior extends MovableObject {
	private walkDirection: [number, number] = [0, 0];
	private targetPos: [number, number] = [0, 0];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Spritesheets.Warrior_Move["name"], ObjTags.Warrior);
		this.setScale(0.8, 0.8);

		this.anims.create({
			key: "chase",
			frames: this.anims.generateFrameNumbers(Spritesheets.Warrior_Move["name"], { start: 0, end: Spritesheets.Warrior_Move["framesNum"] - 1 }),
			frameRate: Spritesheets.Warrior_Move["frameRate"],
			repeat: -1,
		});

		this.play("chase");
		this.speed = 8;
    }

    create() {

    }

    setTarget(x: number, y: number) {
		console.log("Warrior start chase ", x, y);
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

	setEnable(value: boolean) {
		super.setEnable(value);
		if(value)
			this.play("chase");
		else
			this.anims.stop();
	}
}
