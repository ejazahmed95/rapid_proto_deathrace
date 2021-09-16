import {Images, ObjTags} from '../const';
import GameObject from './GameObject';
import Pedestrian from '../game/Pedestrian';
import {GameEvents} from '../utilities/events';
import DI from '../utilities/DI';
import InputManager from './InputManager';
import {Keys} from '../const'

export default class Player extends GameObject {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Car, ObjTags.Player);

    this.body.collideWorldBounds = true;
    this.speed = 20.0;
  }

  update(deltaTime: number) {
   let inputs =  (DI.Get('InputManager') as InputManager).getInput();
   let horizontal: number = inputs.has(Keys.Left) ? -1 : ( inputs.has(Keys.Right) ? 1 : 0);
   let vertical: number = inputs.has(Keys.Up) ? -1 : ( inputs.has(Keys.Down) ? 1 : 0);

   this.setAngularVelocity(this.angleSpeed * horizontal * deltaTime);
   let radians = this.angle / 180.0 * Math.PI;
   this.setVelocity(-1 * vertical * this.speed * Math.sin(radians) * deltaTime, vertical * this.speed * Math.cos(radians)* deltaTime);
  }

  onHitEnter(player: Player, others: GameObject) {
    console.log(others.getTag());
    if(others.getTag() == ObjTags.Pedestrian)
    {
      let pedestrian = (others as Pedestrian)
      pedestrian.onKill();

      DI.Get('EventManager').sendEvent(GameEvents.KilledPedestrian, others);
    }
  }
}
