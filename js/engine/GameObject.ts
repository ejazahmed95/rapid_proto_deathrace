import Phaser from 'phaser'
import Texture = Phaser.Textures.Texture;

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
  private tag: number;
  protected speed: number;
  protected angleSpeed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string|Texture, tag: number) {
    super(scene, x, y, sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //@ts-ignore
    this.body.allowGravity = false;

    this.tag = tag;
    this.speed = 3.0;
    this.angleSpeed = 20.0;
  }

  getTag() {
    return this.tag;
  }

  update(deltaTime: Number) {

  }

  move(_x: number, _y: number, _deltaTime: number) {

  }
}
