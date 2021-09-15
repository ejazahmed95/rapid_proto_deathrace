import Phaser from 'phaser'

export default class GameObject extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, tag) {
    super(scene, x, y, sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;

    this.tag = tag;
    this.speed = 1.0;
  }

  getTag() {
    return this.tag;
  }

  update() {}

  move(_x, _y) {
    this.x += _x * this.speed;
    this.y += _y * this.speed;
  }
}

Phaser.GameObjects.GameObjectFactory.register(
    'object', function(x, y, sprite, tag, movable = true) {
      const object = new GameObject(this.scene, x, y, sprite, tag);

      return object;
    })