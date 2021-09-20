import Text = Phaser.GameObjects.Text;
import TextStyle = Phaser.GameObjects.TextStyle;
import {IUpdate} from "../types/types";
import DI from "../utilities/DI";
import Scheduler from "../utilities/Scheduler";

export default class Timer extends Text implements IUpdate {
	public score: number = 0;

	constructor(scene: Phaser.Scene, x: number, y: number, text: string|string[], style: TextStyle) {
		super(scene, x, y, text, style);
		scene.add.existing(this);
		// (DI.Get("Scheduler") as Scheduler).addUpdateListener(this);
	}

	update(delta: number) {

	}

}
