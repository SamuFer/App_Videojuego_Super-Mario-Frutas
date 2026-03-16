import Phaser from "phaser";

const MOVEMENT_SPEED = 160;
const CLIMB_SPEED = 100;
const JUMP_SPEED = -400;
const GRAVITY = 300;
const TOLERANCE_MARGIN = 10;

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'tomato_idle');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(0.5);
    this.body.setSize(128 * 0.5, 128 * 0.5);
    this.body.setOffset(0, 128 * (1 - 0.5));

    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravityY(GRAVITY);

    this.onLadder = false;
    this.onTopOfLadder = false;

    this.createAnimations(scene);
  }

  // Crear animaciones para el jugador
  createAnimations(scene) {
    const anims = [
      { key: 'left', sheet: 'tomato_run' },
      { key: 'right', sheet: 'tomato_run' },
      { key: 'turn', sheet: 'tomato_idle' },
      { key: 'climb', sheet: 'tomato_idle' }
    ];

    anims.forEach(({ key, sheet }) => {
      scene.anims.create({
        key,
        frames: scene.anims.generateFrameNumbers(sheet, { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1,
      });
    });

    scene.anims.create({
      key: 'jump',
      frames: [{ key: 'tomato_jump', frame: 0 }],
      frameRate: 10,
    });

    scene.anims.create({
      key: 'fall',
      frames: [{ key: 'tomato_fall', frame: 0 }],
      frameRate: 10,
    });
  }

  // Método principal de actualización
  update(cursors, sound_jump, escaleras) {
    const left = cursors.left?.isDown || cursors.A?.isDown;
    const right = cursors.right?.isDown || cursors.D?.isDown;
    const jumpKey = cursors.up?.isDown || cursors.W?.isDown || cursors.space?.isDown;
    const upKey = cursors.up?.isDown || cursors.W?.isDown;
    const downKey = cursors.down?.isDown || cursors.S?.isDown;

    // Si no hay escaleras, no hacer nada
    if (!escaleras) return;

    // Comprobación de la escalera
    const ladderTile = escaleras.getTileAtWorldXY(this.x, this.y + 2);
    const ladderTileBelow = escaleras.getTileAtWorldXY(this.x, this.y + 1);
    const tileWidth = escaleras.tilemap.tileWidth;
    const isAligned = ladderTile && Math.abs(this.x - (ladderTile.pixelX + tileWidth / 2)) < TOLERANCE_MARGIN;

    const isTopOfLadder = !ladderTileBelow || ladderTileBelow.index === -1;

    // Controlar la entrada/salida de la escalera
    if (ladderTile && ladderTile.index !== -1 && isAligned) {
      this.onLadder = true;
    } else {
      this.onLadder = false;
    }

    // Si estamos en la escalera, manejar el movimiento
    if (this.onLadder) {
      this.body.allowGravity = false;
      this.handleLadderMovement(left, right, upKey, downKey, jumpKey, sound_jump, isTopOfLadder);
    } else {
      this.body.allowGravity = true;
    }

    // Si estamos en el suelo o en el aire, manejar el movimiento normal
    if (!this.onLadder) {
      if (!this.body.blocked.down) {
        this.handleAirMovement(left, right, jumpKey, sound_jump);
      } else {
        this.handleGroundMovement(left, right, jumpKey, sound_jump);
      }
    }
  }

  // Movimiento en la escalera
  handleLadderMovement(left, right, upKey, downKey, jumpKey, sound_jump, isTopOfLadder) {
    if (left || right) {
      this.setVelocityX(left ? -CLIMB_SPEED : right ? CLIMB_SPEED : 0);
      this.anims.play('climb', true);
    } else {
      this.setVelocityX(0);
      this.anims.play('climb', true);
    }

    if (jumpKey && isTopOfLadder) {
      this.setVelocityY(JUMP_SPEED);  // Salto desde la cima de la escalera
      this.anims.play('jump', true);
      this.onLadder = false;
      this.body.allowGravity = true;
      sound_jump?.play({ volume: 1, loop: false });
      return;
    }

    if (upKey) {
      this.setVelocityY(-CLIMB_SPEED); // Subir
      this.anims.play('jump', true);
    } else if (downKey) {
      this.setVelocityY(CLIMB_SPEED); // Bajar
      this.anims.play('fall', true); // Animación para bajar
    } else {
      this.setVelocityY(0); // Detener el movimiento vertical
    }

    this.onTopOfLadder = isTopOfLadder;
  }

  // Movimiento en el aire (cuando no estamos en la escalera)
  handleAirMovement(left, right, jumpKey, sound_jump) {
    if (this.body.velocity.y < 0) {
      this.anims.play('jump', true);
    } else {
      this.setTexture('tomato_fall');
    }

    this.setVelocityX(left ? -MOVEMENT_SPEED : right ? MOVEMENT_SPEED : 0);
    this.setFlipX(left);

    // Si estamos en el aire, y presionamos la tecla de salto, tenemos que saltar
    if (jumpKey && this.body.blocked.down) {
      this.setVelocityY(JUMP_SPEED);
      this.anims.play('jump', true);
      sound_jump?.play({ volume: 1, loop: false });
    }
  }

  // Movimiento en el suelo (cuando no estamos en la escalera)
  handleGroundMovement(left, right, jumpKey, sound_jump) {
    if (jumpKey && this.body.blocked.down) {
      this.setVelocityY(JUMP_SPEED);
      this.anims.play('jump', true);
      sound_jump?.play({ volume: 1, loop: false });
      return;
    }

    if (left) {
      this.setVelocityX(-MOVEMENT_SPEED);
      this.anims.play('left', true);
      this.setFlipX(true);
    } else if (right) {
      this.setVelocityX(MOVEMENT_SPEED);
      this.anims.play('right', true);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
      this.anims.play('turn', true);
    }
  }
}