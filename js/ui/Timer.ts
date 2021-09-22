import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.GameObjects.TextStyle;
import {IUpdate} from "../types/types";
import DI from "../utilities/DI";
import Scheduler from "../utilities/Scheduler";
import Logger from "../utilities/logger";

export default class Timer extends Text implements IUpdate {
	public timeRemaining: number = 0;
	public timeUp: boolean = false;
	public cancelled: boolean = false;

	constructor(scene: Phaser.Scene, x: number, y: number, time: number, style: TextStyle) {
		super(scene, x, y, `TIME: ${time}`, style);
		this.timeRemaining = time;
		scene.add.existing(this);
		// (DI.Get("Scheduler") as Scheduler).addUpdateListener(this);
	}

	update(delta: number) {
		if(this.timeUp) return;
		this.timeRemaining -= delta/1000;
		if(this.timeRemaining > 0) {
			this.setText(`Time: ${Math.floor(this.timeRemaining)}`);
		} else {
			this.timeUp = true;
			this.setText(`TIME: 0`);
		}
	}

}
