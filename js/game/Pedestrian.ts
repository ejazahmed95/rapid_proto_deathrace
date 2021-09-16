import GameObject from "../engine/GameObject";
import {Images, ObjTags} from "../const";
import DI from "../utilities/DI";
import InputManager from './InputManager';
import {Keys} from '../const'
import GameInfra from "./utilities/GameInfra";

export default class Pedestrian extends GameObject {
static count = 0;

private id: number;
private statusDuration: number;
private movement: [number, number] = [0, 0];
private boundX: [number, number] = [0, 0];
private boundY: [number, number] = [0, 0];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Pedestrian, ObjTags.Pedestrian);
    //this.setCollideWorldBounds(true);
    this.id = Pedestrian.count;
    Pedestrian.count++;
    this.statusDuration = 0;
    let layout = (DI.Get("GameInfra") as GameInfra).layout;
    this.boundX = [-layout.Border, layout.GameWidth + layout.Border];
    this.boundY = [-layout.Border, layout.GameHeight - layout.Border];
  }

  getID(){
    return this.id;
  }

  update(deltaTime: number) 
  {
    if(this.visible == false)
       return;

    this.statusDuration -= deltaTime;

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
    
    this.keepBodyInBound(deltaTime);
  }

  keepBodyInBound(deltaTime: number)
  {
    let bInside: boolean =  true;

      this.x = Math.min(Math.max(this.x, this.boundX[0]), this.boundX[1]);
      this.y = Math.min(Math.max(this.y, this.boundY[0]), this.boundY[1]);
    
    return bInside;
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
