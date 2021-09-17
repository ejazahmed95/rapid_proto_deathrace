import { Images, Scenes, Spritesheets, Tags } from "../const";
import GameConf from "../game/config";
import Logger from "../utilities/logger";
import GameObject from "../engine/GameObject";
import Texture = Phaser.Textures.Texture;

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: Scenes.MENU,
        });
    }

    init() {
        Logger.i("scene initialized", Tags.Menu);
    }
    preload() {
        this.loadImages();
    }

    temp(param1: any, param2: any, p3: any, p4: any) {

    }
    create() {
        this.scene.launch(Scenes.CONTROLS, GameConf);

        // for(let type in this.cache) {
        //   console.log(type)
        //
        //   if (type != 'game') {
        //     for (let entry in this.cache[type]) {
        //       this.cache[type].remove(entry);
        //     }
        //   }
        //
        // }

        this.setFactories();
        setTimeout(() => {
            this.scene.start(Scenes.GAMEPLAY, GameConf)
        }, 2);
    }

    private loadImages() {
        this.load.setPath("./assets/images");
        for (let image in Images) {
            Logger.i(`loading asset: ${Images[image]}`, "LOAD");
            this.load.image(Images[image], Images[image] + ".png");
        }

        for (let image in Spritesheets) {
            Logger.i(`loading Spritesheets: ${Spritesheets[image]["path"]}`, "LOAD");
            let spriteConfig = Spritesheets[image];
            this.load.spritesheet(spriteConfig["name"], spriteConfig["name"] + ".png", { frameWidth: spriteConfig["frameWidth"], frameHeight: spriteConfig["frameHeight"], endFrame: spriteConfig["framesNum"] });
            // this.load.multiatlas('pedestrian', 'pedestrian.json');
        }
    }

    private setFactories() {

    }
}
