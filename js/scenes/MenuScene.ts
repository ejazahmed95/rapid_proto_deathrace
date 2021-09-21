import {Constants, Images, Keys, Scenes, Spritesheets, Tags} from "../const";
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import GameObject from "../engine/GameObject";
import Texture = Phaser.Textures.Texture;
import InputManager from "../engine/InputManager";
import DI from "../utilities/DI";
import Options from "../ui/Options";
import Point from "../utilities/Point";
import GameInfra from "../utilities/GameInfra";

export default class MenuScene extends Phaser.Scene {
	private title: Phaser.GameObjects.Text;
	private inputManager!: InputManager;
	private gameStarted: boolean = false;

	constructor() {
		super({
			key: Scenes.MENU,
		});
	}

    init() {
        Logger.i("scene initialized", Tags.Menu);
		this.inputManager = DI.Get("InputManager") as InputManager;
		this.events.on('shutdown', () => { Logger.e("Menu scene is shutdown !", "EVENTS")});
    }

    create() {
        // this.scene.launch(Scenes.CONTROLS, GameConf);
		let layout = (DI.Get("GameInfra") as GameInfra).layout;
		this.title = this.add.text(layout.TotalWidth/4, layout.GameHeight/3, Constants.GAME_NAME, {fontFamily: "arcade-basic", fontSize: "64px", color: "red"});
		new Options(this, {
			fontFamily: "arcade-basic",
			fontSize: 32,
			padding: 10,
			position: new Point(layout.TotalWidth/3, layout.GameHeight/2),
			options: {
				"Start": () => {
					this.gameStarted = true;
					this.scene.launch(Scenes.HUD, {});
					this.scene.start(Scenes.GAMEPLAY, GameConf)
				},
				"Help": () => {Logger.i("Handling the dummy option", Tags.Menu)},
				"About": () => {Logger.i("Handling the dummy option", Tags.Menu)}
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
