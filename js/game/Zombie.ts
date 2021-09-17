import MovableObject from "../engine/MovableObject";
import { Images, Keys, ObjTags } from '../const';

export default class Zombie extends MovableObject {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, Images.Zombie, ObjTags.Zombie);
        this.setCollideWorldBounds(true);
    }
}