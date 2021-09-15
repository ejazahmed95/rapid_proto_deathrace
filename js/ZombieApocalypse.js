import Phaser from 'phaser';

import {Tags} from './constants';
import PlayerPlugin from './engine/GameObject';
import GameoverScene from './scenes/GameoverScene';
import GameScene from './scenes/GameScene';
import MenuScene from './scenes/MenuScene';
import DI from './utilities/DI';
import Logger from './utilities/logger';

export default class ZombieApocalypse {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 640,
      height: 1080,
      physics: {default: 'arcade', arcade: {gravity: {y: 200}}},
      scene: [MenuScene, GameScene]
    };
    DI.objects = {};
    this.game = new Phaser.Game(this.config);
    this.game.testValue = 'Some test value';
    DI.Register('Game', this.game);
    // bind methods
  }

  init() {
    Logger.i('zombie apocalypse file is initialized');
  }

  preload() {}

  create() {}

  update() {}
}
