import Phaser from 'phaser'
import Texture = Phaser.Textures.Texture;

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
  private tag: number;
  private speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string|Texture, tag: number) {
    super(scene, x, y, sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // this.body.allowGravity = false;

    this.tag = tag;
    this.speed = 1.0;
  }

  getTag() {
    return this.tag;
  }

  update() {}

  move(_x: number, _y: number) {
    this.x += _x * this.speed;
    this.y += _y * this.speed;
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'object', function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, sprite: Texture, tag: number, movable = true) {
    const object = new GameObject(this.scene, x, y, sprite, tag);
    // this.displayList.add(object);
    // this.updateList.add(object);
    return object;
  }
)

