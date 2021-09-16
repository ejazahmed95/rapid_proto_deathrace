import {Images, Keys, ObjTags} from '../const';
import GameObject from './GameObject';
import DI from "../utilities/DI";
import InputManager from "./InputManager";

export default class Player extends GameObject {
	private inputManager: InputManager;
	private angleSpeed: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Car, ObjTags.Player);
    this.body.collideWorldBounds = true;

    this.inputManager = DI.Get("InputManager") as InputManager;
	this.speed = 20.0;
  }

  update(deltaTime: number) {
	  let inputs = this.inputManager.getInput();
	  let horizontal: number = inputs.has(Keys.Left) ? -1 : ( inputs.has(Keys.Right) ? 1 : 0);
	  let vertical: number = inputs.has(Keys.Up) ? -1 : ( inputs.has(Keys.Down) ? 1 : 0);

	  this.setAngularVelocity(this.angleSpeed * horizontal * deltaTime);
	  let radians = this.angle / 180.0 * Math.PI;
	  this.setVelocity(-1 * vertical * this.speed * Math.sin(radians) * deltaTime, vertical * this.speed * Math.cos(radians)* deltaTime);

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
