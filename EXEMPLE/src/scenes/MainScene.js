import Phaser from "phaser";
import Player from '../entities/player.js';
import MapLoader from '../map/MapLoader.js';

let player;
let sound_jump;
let coins = "";
let scoreText = "";
let score = 0;
let music_bucle, sound_die;
let viu;

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  onColision() {
    console.log("xoque");
  }

  refreshScore(value) {
    score += value;
    scoreText.setText("Score: " + score);
  }

  endGame(completed = false) {
    if (!completed) {
      this.physics.pause();
      console.log("S'atura");
      music_bucle.stop();
      sound_die.play({
        volume: 1,
        loop: false
      });
      this.time.addEvent({
        delay: 4500,
        loop: false,
        callback: () => {
          this.scene.restart();
        }
      });
    } else {
      this.scene.start('endScene');
    }
  }

  preload() {
    this.load.image('marioTiles', 'assets/maps/tiles.png');
    this.load.image('dungeonTiles', 'assets/maps/Dungeon.png');
    this.load.tilemapTiledJSON('tilemap', 'assets/maps/mariobros_map.json');
    this.load.image('estrella', 'assets/star.png');
    this.load.image('bomba', 'assets/bomb.png');
    this.load.spritesheet('mario', 'assets/Mario.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('moneda', 'assets/monedes.png', { frameWidth: 16, frameHeight: 16 });
    this.load.audio('bucle', 'assets/sounds/MarioBrosBucle.mp3');
    this.load.audio('die', 'assets/sounds/smb_mariodie.mp3');
    this.load.audio('jumpsmall', 'assets/sounds/smb_jump-small.mp3');
    this.load.spritesheet('bandera', 'assets/banderaSprite.png', { frameWidth: 16, frameHeight: 96 });
  }

  create() {
    viu = true;
    music_bucle = this.sound.add('bucle');
    sound_die = this.sound.add('die');
    music_bucle.play({ volume: 1, loop: true });

    const mapLoader = new MapLoader(this);
    const { map, plataforma_layer, bandera_layer } = mapLoader.loadMap();

    const colliders = this.physics.add.staticGroup();

    player = new Player(this, 480, 100);

    this.physics.add.collider(player, plataforma_layer);

    this.cameras.main.startFollow(player);

    const collectables_layer = map.getObjectLayer('collectables');
    const collectables = this.physics.add.staticGroup();

    collectables_layer.objects.forEach(moneda => {
      var spriteMoneda = this.add.sprite(moneda.x, moneda.y, 'moneda');
      collectables.add(spriteMoneda).setDepth(-1);
      this.anims.create({
        key: 'moneda',
        frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      spriteMoneda.anims.play('moneda', true);
    });

    const estrelles = this.physics.add.staticGroup();
    estrelles.create(400, 100, "estrella");
    estrelles.create(500, 100, "estrella");
    estrelles.create(600, 100, "estrella");

    const onOverlap = (jugador, colleccionable) => {
      this.refreshScore(10);
      colleccionable.disableBody(true, true);
      console.log("AAAAA");
    };
    const onOverlapLayer = (jugador, colleccionable) => {
      if (!colleccionable.collected) {
        colleccionable.visible = false;
        colleccionable.collected = true;
        this.refreshScore(1);
      }
      console.log("AAAAA");
    };

    this.physics.add.overlap(player, estrelles, onOverlap);
    this.physics.add.overlap(player, collectables, onOverlapLayer);

    const bomba = this.physics.add.staticGroup({
      key: 'bomba',
      repeat: 11,
    });
    bomba.children.iterate((bomb) => {
      bomb.setPosition(Phaser.Math.Between(500, 2500), Phaser.Math.Between(100, 150));
    });

    scoreText = this.add.text(300, -50, "Score: 0", { fontSize: '32px', fill: '#000' });

    console.log(bandera_layer)
    const bandera = this.physics.add.staticGroup();

    bandera_layer.objects.forEach(obj => {
      const sprite = bandera.create(obj.x, obj.y +16, 'bandera');  //- obj.height
      sprite.setOrigin(0, 0);
      sprite.setDepth(-2);

      // Colisio

      this.physics.add.overlap(player, bandera, () => {
        if (viu) {
          viu = false;
          this.endGame(true);
        }
      });
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (!sound_jump) sound_jump = this.sound.add('jumpsmall');
    player.update(cursors, sound_jump);
    scoreText.x = player.body.position.x;
    scoreText.y = player.body.position.y - 200;
    if (player.body.position.y > 400 && viu) {
      viu = false;
      this.endGame(false);
    }
  }
}