import {Images, ObjTags} from '../const';
import GameObject from './GameObject';

export default class Player extends GameObject {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Car, ObjTags.Player);
    this.setCollideWorldBounds(true);
    
  }

  update() {
    console.log('Player object update.');
  }

  onHitEnter(player: Player, others: GameObject) {
    console.log(others.getTag());

    if (player.body.touching.left) {
      console.log('On Player Hit Enter Left');
    } else if (player.body.touching.right) {
      console.log('On Player Hit Enter Right');
    } else if (player.body.touching.up) {
      console.log('On Player Hit Enter Up');
    } else if (player.body.touching.down) {
      console.log('On Player Hit Enter Down');
    }
  }
}
