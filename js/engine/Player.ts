import {Images, ObjTags} from '../const';
import GameObject from './GameObject';
import Pedestrian from '../game/Pedestrian';
import GameInfra from '../utilities/GameInfra';

export default class Player extends GameObject {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Car, ObjTags.Player);

    this.body.collideWorldBounds = true;
  }

  update(deltaTime: Number) {
    
  }

  onHitEnter(player: Player, others: GameObject) {
    console.log(others.getTag());
    if(others.getTag() == ObjTags.Pedestrian)
    {
      let pedestrian = (others as Pedestrian)
      pedestrian.onKill();
    }
  }
}
