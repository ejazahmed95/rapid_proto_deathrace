import GameObject from "../engine/GameObject";
import {Images, ObjTags} from "../const";

export default class Pedestrian extends GameObject {
static count = 0;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Pedestrian, ObjTags.Pedestrian);
    this.setCollideWorldBounds(true);
    this.id = Pedestrian.count;
    Pedestrian.count++;
    console.log('Pedestrian id ' + this.id);
  }

  update(deltaTime: Number) {
    
  }

  onKill() {
    this.visible = false;
    //this.body.checkCollision = false;
  }

  onSpawn()
  {
    this.visible = true;
  }
}
