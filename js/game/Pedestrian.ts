import GameObject from "../engine/GameObject";
import {Images, Spritesheets, ObjTags} from "../const";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";

export default class Pedestrian extends GameObject {
static count = 0;

private id: number;
private statusDuration: number;
private movement: [number, number] = [0, 0];
private boundX: [number, number] = [0, 0];
private boundY: [number, number] = [0, 0];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Spritesheets.Pedestrian, ObjTags.Pedestrian);
    //this.setCollideWorldBounds(true);
    this.id = Pedestrian.count;
    Pedestrian.count++;
    this.statusDuration = 0;
    let layout = (DI.Get("GameInfra") as GameInfra).layout;
    this.boundX = [-layout.Border, layout.GameWidth + layout.Border];
    this.boundY = [-layout.Border, layout.GameHeight - layout.Border];

	this.anims.create({
		key: "walk",
		frames: this.anims.generateFrameNumbers(Spritesheets.Pedestrian, {frames: [0, 1]}),
		frameRate: 8,
		repeat: -1,
	});
	this.play('walk');
  }

  getID(){
    return this.id;
  }

  update(deltaTime: number) {

    this.statusDuration -= deltaTime;

    if(this.x < this.boundX[0] || this.x > this.boundX[1])
      this.statusDuration = 0;
    if(this.y < this.boundY[0] || this.y > this.boundY[1])
      this.statusDuration = 0;

    if(this.statusDuration <= 0)
    {
      let radio: number = Phaser.Math.FloatBetween(0, 1);
      if(radio <= 0.3)
      {
        this.statusDuration = 1000; // ms
        // do nothing
      } else
      {
        this.statusDuration = 3000;
        // random move
        this.movement[0] = Phaser.Math.Between(-1, 1);
        this.movement[1] = Phaser.Math.Between(-1, 1);
      }
    }

    this.setVelocity(this.movement[0] * deltaTime * this.speed, this.movement[1] * deltaTime * this.speed);

  }

  onKill() {
    this.visible = false;
  }

  onSpawn()
  {
    this.visible = true;
  }

  onMoveReverse()
  {
    this.statusDuration = 3000;
    this.movement[0] = -this.movement[0];
    this.movement[1] = -this.movement[1];
  }

  onFreeze()
  {
    this.statusDuration = 3000;
    this.movement = [0, 0];
  }
}
