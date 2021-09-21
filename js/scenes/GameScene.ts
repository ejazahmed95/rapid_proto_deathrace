
import { Scenes } from "../const";
import Logger from "../utilities/logger";
import DI from "../utilities/DI";
import Phaser, { Game } from "phaser";
import Texture = Phaser.Textures.Texture;
import GameInfra from "../utilities/GameInfra";
import InputManager from "../engine/InputManager";
import SpawnManager from "../game/SpawnManager";

import { LevelConfig } from "../const";

export default class GameScene extends Phaser.Scene {
    private gameTime: Date = new Date();

    private inputManager: InputManager;
    private spawnManager: SpawnManager;

    constructor() {
        super({
            key: Scenes.GAMEPLAY,
        });
    }

    init(gameConf: any) {
        Logger.i(`Game Config = ${JSON.stringify(gameConf)}`, "Game");
        this.inputManager = DI.Get("InputManager") as InputManager;
    }

    preload() {

    }

    create() {
        this.spawnManager = DI.Get("SpawnManager") as SpawnManager;
        this.spawnManager.init(this);

        let layout = (DI.Get("GameInfra") as GameInfra).layout;
        this.physics.world.setBounds(layout.Border, layout.Border, layout.GameWidth, layout.GameHeight);
    }

    update() {
        let curtTime = new Date();
        let deltaTime = curtTime - this.gameTime;
        this.gameTime = curtTime;

        this.spawnManager.update(deltaTime);
    }
}
