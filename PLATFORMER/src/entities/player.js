import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mario');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(16, 32);
    //this.setCollideWorldBounds(true);

    this.createAnimations(scene);
  }

  createAnimations(scene) {
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('mario', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'turn',
      frames: [{ key: 'mario', frame: 8 }],
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('mario', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('mario', { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
  }

  update(cursors, sound_jump) {

    if (cursors.left.isDown) {
        console.log("corrent")

      this.setVelocityX(-160);
      this.anims.play('left', true);
      this.setFlipX(true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(160);
      this.anims.play('right', true);
      this.setFlipX(false);
    } else {
      if (this.body.onFloor()) {
        this.setVelocityX(0);
        this.anims.play('turn', true);
      }
    }

    if (cursors.up.isDown && this.body.onFloor()) {
      this.setVelocityY(-280);
      this.anims.play('jump', true);
      sound_jump.play({ volume: 1, loop: false });
    }
  }
}