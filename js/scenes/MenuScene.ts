import {Images, Keys, Scenes, Spritesheets, Tags} from "../const";
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import GameObject from "../engine/GameObject";
import Texture = Phaser.Textures.Texture;
import InputManager from "../engine/InputManager";
import DI from "../utilities/DI";
import Options from "../ui/Options";
import Point from "../utilities/Point";

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
		new Options(this, {
			fontFamily: "arcade-basic",
			fontSize: 32,
			padding: 10,
			position: new Point(50, 50),
			options: {
				"Start": () => {
					this.gameStarted = true;
					this.scene.start(Scenes.GAMEPLAY, GameConf)
				},
				"Dummy Option": () => {Logger.i("Handling the dummy option", Tags.Menu)}
			},
		})

        // setTimeout(() => {
        //     this.scene.start(Scenes.GAMEPLAY, GameConf)
        // }, 2000);
    }

	update(time: number, delta: number) {
		super.update(time, delta);
	}
}
