export { LevelConfig } from "../const"
import Texture = Phaser.Textures.Texture;
import DI from "../utilities/DI";
import Pedestrian from "../game/Pedestrian";
import Grave from "../game/Grave";
import Player from "../game/Player";
import GameObject from "../engine/GameObject";
import { LevelConfig } from "../const";

import Zombie from "./Zombie";
import EventManager from "../utilities/EventManager";
import { GameEvents, PedestrianKillInfo } from "../utilities/events";

export default class SpawnManager {
    private pedestrians: Pedestrian[] = [];
    private graves: Grave[] = [];
    private zombies: Zombie[] = [];
    private player: Player | undefined;

    private scene: Phaser.Scene | undefined;

    private pedestrianGroup: Phaser.GameObjects.Group | undefined;
    private gravesGroup: Phaser.GameObjects.Group | undefined;
    private zombieGroup: Phaser.GameObjects.Group | undefined;

    constructor() {

    }

    init(scene: Phaser.Scene) {
        this.scene = scene;
        this.createFactories(scene);

        let eventManager = DI.Get("EventManager") as EventManager;
        eventManager.addHandler(GameEvents.KilledPedestrian, this.onPedestrianKilled = this.onPedestrianKilled.bind(this));
        eventManager.addHandler(GameEvents.KilledZombie, this.onZombieKilled = this.onZombieKilled.bind(this));
        eventManager.addHandler(GameEvents.OffGrave, this.onGraveOff = this.onGraveOff.bind(this));

        this.pedestrianGroup = scene.add.group();
        this.gravesGroup = scene.add.group();
        this.zombieGroup = scene.add.group();

        let levelConfig = LevelConfig.Level1;

        // need change into pass config as parameter
        let playerConfig = levelConfig.Player;
        this.player = scene.add.player(playerConfig.x, playerConfig.y, playerConfig.speed, playerConfig.angleSpeed);

        let zombiesConfig = levelConfig.Zombies;
        this.zombies = [];
        for (let id in zombiesConfig) {
            let config = zombiesConfig[id];
            this.zombies.push(scene.add.zombie(config.x, config.y));
            this.zombieGroup.add(this.zombies[id]);
        }

        let graveConfig = levelConfig.Graves;
        this.zombies = [];
        for (let id in graveConfig) {
            let config = graveConfig[id];
            this.graves.push(scene.add.grave(config.x, config.y));
            this.gravesGroup.add(this.graves[id]);
        }

        let pedestrianConfig = levelConfig.Pedestrians;
        this.pedestrians = [];
        for (let id in pedestrianConfig) {
            let config = pedestrianConfig[id];
            this.pedestrians.push(scene.add.pedestrian(config.x, config.y));
            this.pedestrianGroup.add(this.pedestrians[id]);
        }

        // register collider with group
        scene.physics.add.collider(this.player, this.zombieGroup, this.player.onColliderEnter, null);
        scene.physics.add.overlap(this.player, this.pedestrianGroup, this.player.onColliderEnter, null);
        scene.physics.add.collider(this.player, this.gravesGroup, this.player.onColliderEnter, null);


    }

    update(deltaTime: number) {
        this.player.update(deltaTime);
    }

    onPedestrianKilled(other?: object) {
        // let pedestrian = other.
        // console.log(pedestrian.getId());
        for (let i = 0; i < this.graves.length; ++i) {
            let grave = this.graves[i] as Grave;
            if (grave.isEnable() == false) {
                grave.reSpawn(100, 200);
                return;
            }
        }

        let grave = this.scene?.add.grave(100, 200);
        this.graves.push(grave);
        this.gravesGroup?.add(grave);
    }

    onZombieKilled(objectId?: number) {
        console.log("onZombieKilled " + objectId);
    }

    onGraveOff(objectId?: number) {
        console.log("onGraveOff " + objectId);
    }

    createFactories(scene: Phaser.Scene) {
        Phaser.GameObjects.GameObjectFactory.register(
            'gameObject', function (x: number, y: number, sprite: Texture, tag: number, movable = true) {
                const object = new GameObject(scene, x, y, sprite, tag);
                return object;
            }
        )

        Phaser.GameObjects.GameObjectFactory.register('player',
            function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, speed: number, angleSpeed: number) {
                const player = new Player(scene, x, y, speed, angleSpeed);
                return player;
            });

        Phaser.GameObjects.GameObjectFactory.register('pedestrian',
            function (x: number, y: number) {
                const player = new Pedestrian(scene, x, y);
                return player;
            });

        Phaser.GameObjects.GameObjectFactory.register('grave',
            function (x: number, y: number) {
                const grave = new Grave(scene, x, y);
                return grave;
            });

        Phaser.GameObjects.GameObjectFactory.register('zombie',
            function (x: number, y: number) {
                const zombie = new Zombie(scene, x, y);
                return zombie;
            });
    }
}