import {Images, Keys, Scenes, Spritesheets, Tags} from "../const";
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import GameObject from "../engine/GameObject";
import Texture = Phaser.Textures.Texture;
import InputManager from "../engine/InputManager";
import DI from "../utilities/DI";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: Scenes.MENU,
        });
    }

	private inputManager!: InputManager;
	private gameStarted: boolean = false;

    init() {
        Logger.i("scene initialized", Tags.Menu);
		this.inputManager = DI.Get("InputManager") as InputManager;
    }

    create() {
        // this.scene.launch(Scenes.CONTROLS, GameConf);

		this.add.text(190, 136, 'Main Menu', {
			fontFamily: 'arcade-basic',
			fontSize: '64'
		}).scale = 2;


        // setTimeout(() => {
        //     this.scene.start(Scenes.GAMEPLAY, GameConf)
        // }, 2000);
    }

	update(time: number, delta: number) {
		super.update(time, delta);

		if(!this.gameStarted && this.inputManager.getInput().has(Keys.Action)) {
			this.gameStarted = true;
			this.scene.start(Scenes.GAMEPLAY, GameConf);
		}
	}
}
