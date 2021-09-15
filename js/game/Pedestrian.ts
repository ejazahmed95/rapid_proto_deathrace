import GameObject from "../engine/GameObject";
import {Images, ObjTags} from "../const";

export default class Pedestrian extends GameObject {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, Images.Cross, ObjTags.Pedestrian);
  }
}
