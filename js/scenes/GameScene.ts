
import { AudioTrack, Scenes } from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Phaser, { Game } from "phaser";
import Texture = Phaser.Textures.Texture;
import GameInfra from "../utilities/GameInfra";
import InputManager from "../engine/InputManager";
import SpawnManager from "../game/SpawnManager";

import { LevelConfig } from "../const";
import EventManager from "../utilities/EventManager";
import { GameEvents, GameObjectsInfo, LevelFinishInfo } from "../utilities/events";
import GAME_OVER = Phaser.Input.Events.GAME_OVER;
import LevelManager from "../levels/LevelManager";

export default class GameScene extends Phaser.Scene {
    private gameTime: Date = new Date();

    private inputManager!: InputManager;
    private spawnManager!: SpawnManager;
    private eventManager!: EventManager;
	private levelManager!: LevelManager;

    constructor() {
        super({
            key: Scenes.GAMEPLAY,
        });
    }

    init(gameConf: any) {
        Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, "Game");
        this.inputManager = DI.Get("InputManager") as InputManager;
		this.eventManager = DI.Get("EventManager") as EventManager;
		this.levelManager = DI.Get("LevelManager") as LevelManager;

		this.eventManager.addHandler(GameEvents.LevelFinished, this.onLevelFinish.bind(this));

        this.sound.play(AudioTrack.Background);

		this.events.on('shutdown', () => this.onSceneShutdown());
    }

    preload() {

    }

    create() {
        this.spawnManager = DI.Get("SpawnManager") as SpawnManager;
        this.spawnManager.init(this, this.levelManager.loadNextLevel());

        let layout = (DI.Get("GameInfra") as GameInfra).layout;
        this.physics.world.setBounds(layout.Border, layout.Border, layout.GameWidth, layout.GameHeight);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.spawnManager.update(delta);
    }

    private onLevelFinish(info: GameObjectsInfo) {
        let levelFinishInfo: LevelFinishInfo = {
            Objects: info,
            Score: 130
        }

        if (info.PedestrianCount == 0) {
            this.scene.start(Scenes.GAME_OVER, levelFinishInfo);
        } else {
            // Logger.e("NOT IMPLEMENTED");
            this.scene.start(Scenes.LEVEL_FINISH, levelFinishInfo);
        }

        this.sound.stopAll();
    }

	private onSceneShutdown() {


	}
}
