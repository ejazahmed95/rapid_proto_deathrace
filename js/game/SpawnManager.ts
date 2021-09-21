export { LevelConfig } from "../const"
import Texture = Phaser.Textures.Texture;
import DI from "../utilities/DI";
import Pedestrian from "../game/Pedestrian";
import Grave from "../game/Grave";
import Player from "../game/Player";
import GameObject from "../engine/GameObject";
import { LevelConfig, ObjTags } from "../const";

import Zombie from "./Zombie";
import EventManager from "../utilities/EventManager";
import {
	GameEvents,
	GameObjectsInfo,
	PedestrianConvertInfo,
	PedestrianKillInfo,
	ZombieKillInfo
} from "../utilities/events";
import LevelConfigs from '../levels/levels';

export default class SpawnManager {
    private pedestrians: Pedestrian[] = [];
    private graves: Grave[] = [];
    private zombies: Zombie[] = [];
    private player!: Player;

    private scene!: Phaser.Scene;

    private pedestrianGroup!: Phaser.GameObjects.Group;
    private gravesGroup!: Phaser.GameObjects.Group;
    private zombieGroup!: Phaser.GameObjects.Group;
	private eventManager!: EventManager;

    constructor() {

    }

    init(scene: Phaser.Scene ) {
        this.scene = scene;
        this.createFactories(scene);

        this.eventManager = DI.Get("EventManager") as EventManager;
        this.eventManager.addHandler(GameEvents.KilledPedestrian, this.onPedestrianKilled = this.onPedestrianKilled.bind(this));
        this.eventManager.addHandler(GameEvents.KilledZombie, this.onZombieKilled = this.onZombieKilled.bind(this));
        this.eventManager.addHandler(GameEvents.OffGrave, this.onGraveOff = this.onGraveOff.bind(this));
        this.eventManager.addHandler(GameEvents.PedestrianConverted, this.onPedestrianConverted = this.onPedestrianConverted.bind(this));

        this.pedestrianGroup = scene.add.group();
        this.gravesGroup = scene.add.group();
        this.zombieGroup = scene.add.group();

        let levelConfig = LevelConfigs[0];

        // need change into pass config as parameter
        let playerConfig = levelConfig.Player;
        this.player = scene.add.player(playerConfig);
        this.player?.create();

        let zombiesConfig = levelConfig.Zombies;
        this.zombies = [];
        for (let id in zombiesConfig) {
            let config = zombiesConfig[id];
            this.zombies.push(scene.add.zombie(config));
            this.zombieGroup.add(this.zombies[id]);
            this.zombies[id].create();
        }

        let graveConfig = levelConfig.Graves;
        this.graves = [];
        for (let id in graveConfig) {
            let config = graveConfig[id];
            this.graves.push(scene.add.grave(config.x, config.y));
            this.gravesGroup.add(this.graves[id]);
            this.graves[id].create();
        }

        let pedestrianConfig = levelConfig.Pedestrians;
        this.pedestrians = [];
        for (let id in pedestrianConfig) {
            let config = pedestrianConfig[id];
            this.pedestrians.push(scene.add.pedestrian(config));
            this.pedestrianGroup.add(this.pedestrians[id]);
            this.pedestrians[id].create();
        }

        // register collider with group
        scene.physics.add.collider(this.player, this.zombieGroup, this.player.onColliderEnter, null);
        scene.physics.add.overlap(this.player, this.pedestrianGroup, this.player.onColliderEnter, null);
        scene.physics.add.collider(this.player, this.gravesGroup, this.player.onColliderEnter, null);

        scene.physics.add.collider(this.zombieGroup, this.zombieGroup, Zombie.onColliderEnter, null);
        scene.physics.add.collider(this.zombieGroup, this.gravesGroup, Zombie.onColliderEnter, null);
        scene.physics.add.overlap(this.zombieGroup, this.pedestrianGroup, Zombie.onColliderEnter, null);
    }

    update(deltaTime: number) {
        this.player.update(deltaTime);

        this.pedestrians.forEach(element => {
            let pedestrian = element as Pedestrian;
            pedestrian.update(deltaTime);
        });

        this.zombies.forEach(element => {
            let zombie = element as Zombie;
            zombie.update(deltaTime);
        });
    }

    onPedestrianKilled(info?: PedestrianKillInfo) {
        if (info) {
            let pId = info["PedestrianId"];
            for (let i = 0; i < this.pedestrians.length; ++i) {
                let pedestrian = this.pedestrians[i] as Pedestrian;
                if (pedestrian.getId() == pId) {
                    pedestrian.setEnable(false);
                    this.pedestrianGroup?.remove(pedestrian);
                    break;
                }
            }

            let x = info["PositionX"];
            let y = info["PositionY"];
            for (let i = 0; i < this.graves.length; ++i) {
                let grave = this.graves[i] as Grave;
                if (grave.isEnable() == false) {
                    grave.reSpawn(x, y)
                    return;
                }
            }

            let grave = this.scene?.add.grave(x, y);
            this.graves.push(grave);
            this.gravesGroup?.add(grave);

			if(this.getPedestrianCount() == 0) {
				this.eventManager.sendEvent(GameEvents.LevelFinished, {ZombieCount: this.getZombieCount(), PedestrianCount: 0} as GameObjectsInfo);
			}
        }
    }

    onZombieKilled(info?: ZombieKillInfo) {
        if (info) {
            let targetId = info["ZombieId"];
			let remZombies = 0;
            this.zombies.forEach(element => {
                let zombie = element as Zombie;
                if (zombie.getId() == targetId) {
                    zombie.setEnable(false);
					this.zombieGroup.remove(zombie);
                } else if(zombie.isEnable()) {
					remZombies++;
				}
            });

			let x = info["PositionX"];
			let y = info["PositionY"];
			for (let i = 0; i < this.graves.length; ++i) {
				let grave = this.graves[i] as Grave;
				if (grave.isEnable() == false) {
					grave.reSpawn(x, y)
					return;
				}
			}

			let grave = this.scene?.add.grave(x, y);
			this.graves.push(grave);
			this.gravesGroup?.add(grave);

			if(remZombies == 0) {
				this.eventManager.sendEvent(GameEvents.LevelFinished, {ZombieCount: 0, PedestrianCount: this.getPedestrianCount()} as GameObjectsInfo);
			}
        }
    }

	onPedestrianConverted(info?: PedestrianConvertInfo) {
		if (info) {
			let _x = info.PositionX;
			let _y = info.PositionY;

			let config = { x: _x, y: _y, speed: 15 };
			let zombie = this.scene.add.zombie(config);
			this.zombies.push(zombie);
			this.zombieGroup.add(zombie);
			zombie.create();

			if(this.getPedestrianCount() == 0) {
				this.eventManager.sendEvent(GameEvents.LevelFinished, {ZombieCount: this.getZombieCount(), PedestrianCount: 0} as GameObjectsInfo);
			}
		}
	}

	private getPedestrianCount(): number {
		let count = 0;
		this.pedestrians.forEach(elem => {
			let e = elem as Pedestrian;
			if(e.isEnable()) {
				count++;
			}
		});
		return count;
	}

	private getZombieCount(): number {
		let count = 0;
		this.zombies.forEach(elem => {
			let e = elem as Zombie;
			if(e.isEnable()) {
				count++;
			}
		});
		return count;
	}

    onGraveOff(objectId?: number) {
        console.log("onGraveOff " + objectId);
    }

    createFactories(scene: Phaser.Scene) {
        Phaser.GameObjects.GameObjectFactory.register(
            'gameObject', function (x: number, y: number, sprite: Texture, tag: number, movable = true) {
				return new GameObject(scene, x, y, sprite, tag);
            }
        )

        Phaser.GameObjects.GameObjectFactory.register('player',
            function (this: Phaser.GameObjects.GameObjectFactory, config: object) {
				return new Player(scene, config);
            });

        Phaser.GameObjects.GameObjectFactory.register('pedestrian',
            function (config: object) {
				return new Pedestrian(scene, config);
            });

        Phaser.GameObjects.GameObjectFactory.register('grave',
            function (x: number, y: number) {
				return new Grave(scene, x, y);
            });

        Phaser.GameObjects.GameObjectFactory.register('zombie',
            function (config: object) {
                const zombie = new Zombie(scene, config);
                return zombie;
            });
    }
}
