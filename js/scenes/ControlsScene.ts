
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import {Scenes, Images, Tags, Keys} from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";
import InputManager from "../engine/InputManager";

export default class ControlsScene extends Phaser.Scene {
	private inputManager: InputManager;

	// Buttons
	private frame: Phaser.GameObjects.Sprite;
	private controlBg: Phaser.GameObjects.Sprite;
	private leftButton: Phaser.GameObjects.Sprite;
	private rightButton: Phaser.GameObjects.Sprite;
	private upButton: Phaser.GameObjects.Sprite;
	private downButton: Phaser.GameObjects.Sprite;
	private fireButton: Phaser.GameObjects.Sprite;

	constructor() {
		super({
			key: Scenes.CONTROLS,
		});
	}

	init() {
		Logger.i("scene initialized", Tags.Controls);
		this.inputManager = new InputManager(this);
		DI.Register('InputManager', this.inputManager);
	}

	preload() {
	}

	loadImages() {
		// this.load.setPath
	}

	create() {
		let layout = (DI.Get("GameInfra") as GameInfra).layout;
		// Complete Frame
		this.frame = this.add.sprite(0, 0, Images.Frame);
		this.frame.setOrigin(0, 0);
		this.frame.displayWidth = layout.TotalWidth;
		this.frame.displayHeight = layout.TotalHeight;
		this.frame.tint = 0x555555;
		this.frame.alpha = 0.5;

		// Controls Background
		this.controlBg = this.add.sprite(0, layout.GameHeight + layout.Border * 2, Images.Square);
		this.controlBg.setOrigin(0, 0);
		this.controlBg.displayWidth = layout.TotalWidth;
		this.controlBg.displayHeight = layout.ControlsHeight;
		this.controlBg.tint = 0xffee0d;
		this.controlBg.alpha = 0.5;

		let buttonX = layout.TotalWidth*0.2;
		let buttonY = layout.TotalHeight - layout.ControlsHeight + layout.ControlsHeight*0.2;
		let buttonSize = layout.ControlButtonSize + 10;
		this.leftButton = this.add.sprite(buttonX, buttonY + buttonSize, Images.Button);
		this.upButton = this.add.sprite(buttonX + buttonSize, buttonY, Images.Button);
		this.rightButton = this.add.sprite(buttonX + buttonSize*2, buttonY + buttonSize, Images.Button);
		this.downButton = this.add.sprite(buttonX + buttonSize, buttonY + buttonSize* 2, Images.Button);
		this.fireButton = this.add.sprite(layout.TotalWidth - buttonX, buttonY + buttonSize, Images.Button);
	}

	update(time: number, delta: number) {
		super.update(time, delta);

		this.resetButtons();
		let input = this.inputManager.getInput();
		if(input.has(Keys.Left)) this.highlightButton(this.leftButton);
		if(input.has(Keys.Up)) this.highlightButton(this.upButton);
		if(input.has(Keys.Right)) this.highlightButton(this.rightButton);
		if(input.has(Keys.Down)) this.highlightButton(this.downButton);
		if(input.has(Keys.Action)) this.highlightButton(this.fireButton);
	}

	private resetButtons() {
		this.leftButton.tint = 0xffffff;
		this.upButton.tint = 0xffffff;
		this.rightButton.tint = 0xffffff;
		this.downButton.tint = 0xffffff;
		this.fireButton.tint = 0xffffff;
	}

	private highlightButton(button: Phaser.GameObjects.Sprite) {
		button.tint = 0xee2222;
	}
}
