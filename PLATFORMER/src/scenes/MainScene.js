import Phaser from 'phaser';
import MapLoader from '../maps/MapLoader';
import Player from '../entities/player';
import Goomba from '../entities/goomba'; // Importar la clase Goomba enemigo

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.music_bucle = null;
    this.isAlive = true;
  }

  preload() {
    // Cargar tilesets y mapas
    this.load.image('tiles', 'assets/tileset/44pes_games_plataformer_grass_tileset_2.0.png');
    this.load.tilemapTiledJSON('map', 'assets/maps2/platformer_map.json');

    // Animaciones del personaje
    this.load.spritesheet('tomato_idle', 'assets/characters/tomato/tomato_Idle.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('tomato_run', 'assets/characters/tomato/tomato_Run.png', { frameWidth: 128, frameHeight: 128 });
    this.load.image('tomato_jump', 'assets/characters/tomato/tomato_Jump.png');
    this.load.image('tomato_fall', 'assets/characters/tomato/tomato_Fall.png');

    // Animaciones de los enemigos
    this.load.spritesheet('goomba', 'assets/characters/overworld/goomba.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    // Cargar audios
    this.load.audio('jump', 'assets/sounds/smb_jump-small.mp3');
    this.load.audio('bucle', 'assets/sounds/MarioBrosBucle.mp3');
    this.load.audio('die', 'assets/sounds/smb_mariodie.mp3');
    this.load.audio('coin', 'assets/sounds/super_mario_bros_3_moneda.mp3');
    this.load.audio('star', 'assets/sounds/star-collect.mp3');
    this.load.audio('goomba-stomp', 'assets/sounds/goomba-stomp.wav');

    // Objetos animados
    this.load.spritesheet('moneda', 'assets/objects/moneda3.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('estrella', 'assets/objects/star3.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('flag', 'assets/objects/flag3.png', {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.isAlive = true; // Reactiva el control del jugador después del restart

    // Cargar mapa
    const mapLoader = new MapLoader(this);
    const {
      map,
      suelo,
      sueloTierra,
      personajesLayer,
      escaleras,
      maderas
    } = mapLoader.loadMap();

    // Música de fondo
    this.music_bucle = this.sound.add('bucle', {
      loop: true,
      volume: 1
    });
    if (!this.music_bucle.isPlaying) {
      this.music_bucle.play();
    }
    this.sound_jump = this.sound.add('jump');
    this.sound_die = this.sound.add('die');
    this.sound_coin = this.sound.add('coin');
    this.sound_star = this.sound.add('star');
    this.sound_goomba = this.sound.add('goomba-stomp');

    // Crear jugador
    const playerSpawn = personajesLayer.objects.find(obj => obj.name === 'player');
    this.player = new Player(this, playerSpawn?.x || 100, playerSpawn?.y || 300);

    // Cámara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Overlap con escaleras
    this.escaleras = escaleras;
    this.physics.add.overlap(this.player, this.escaleras);

    // Collider con suelo y maderas
    this.physics.add.collider(this.player, suelo, null, (player, tile) => {
      return player.body.velocity.y >= 0;
    });
    this.physics.add.collider(this.player, maderas, null, (player, tile) => {
      return player.body.velocity.y >= 0;
    });

    // Crear Goombas en múltiples ubicaciones
    const goombaPositions = [
      { x: 500, y: 300 },
      { x: 1000, y: 400 },
      { x: 1500, y: 350 }
    ];
    this.goombas = [];  // Almacenar los Goombas creados
    goombaPositions.forEach(position => {
      const goomba = new Goomba(this, position.x, position.y);
      this.goombas.push(goomba);
    });

    // Colisiones entre Goombas y plataformas sólidas (suelo, madera, etc.)
    this.physics.add.collider(this.goombas, suelo);
    this.physics.add.collider(this.goombas, maderas);

    // Límite de caída
    this.fallLimit = map.heightInPixels + 100;

    // Animaciones de monedas, estrellas y bandera
    if (!this.anims.exists('moneda')) {
      this.anims.create({
        key: 'moneda',
        frames: this.anims.generateFrameNumbers('moneda', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.anims.exists('estrella')) {
      this.anims.create({
        key: 'estrella',
        frames: this.anims.generateFrameNumbers('estrella', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.anims.exists('flag')) {
      this.anims.create({
        key: 'flag',
        frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
      });
    }

    const monedas_layer = map.getObjectLayer('monedas');
    this.collectables = this.physics.add.staticGroup();

    monedas_layer.objects.forEach(moneda => {
      const spriteMoneda = this.collectables.create(moneda.x, moneda.y, 'moneda');
      spriteMoneda.setOrigin(0, 1);
      spriteMoneda.anims.play('moneda', true);
    });

    const estrellas_layer = map.getObjectLayer('stars');
    this.estrelles = this.physics.add.staticGroup();

    estrellas_layer.objects.forEach(obj => {
      const spriteEstrella = this.estrelles.create(obj.x, obj.y, 'estrella');
      spriteEstrella.setOrigin(0, 1);
      spriteEstrella.anims.play('estrella', true);
    });

    // Objeto bandera (final de nivel)
    const banderaLayer = map.getObjectLayer('banderaFinal');
    if (banderaLayer) {
      const banderaObj = banderaLayer.objects[0];
      if (banderaObj) {
        const spriteBandera = this.add.sprite(banderaObj.x, banderaObj.y - banderaObj.height, 'flag');
        spriteBandera.setOrigin(0.5, 0.5);
        spriteBandera.anims.play('flag', true);
        spriteBandera.setDepth(1);

        const zonaFinal = this.add.zone(banderaObj.x, banderaObj.y, banderaObj.width, banderaObj.height);
        this.physics.add.existing(zonaFinal);
        zonaFinal.body.setAllowGravity(false);
        zonaFinal.body.setImmovable(true);

        this.physics.add.overlap(this.player, zonaFinal, () => {
          if (this.isAlive) {
            const altura = this.player.y;
            let puntsAltura = 0;
            if (altura < 200) puntsAltura = 50;
            else if (altura < 300) puntsAltura = 30;
            else puntsAltura = 10;
            this.refreshScore(puntsAltura);
            this.endGame(true);
          }
        });
      }
    }

    this.monedaCount = 0;
    this.estrellaCount = 0;

    this.textEstrelles = this.add.text(16, 16, '⭐ Estrelles: 0', {
      fontSize: '18px',
      fill: '#000',
      backgroundColor: 'rgba(98, 189, 85, 0.5)',
      padding: { x: 6, y: 4 }
    }).setScrollFactor(0);

    this.textMonedes = this.add.text(16, 56, '💰 Monedes: 0', {
      fontSize: '18px',
      fill: '#000',
      backgroundColor: 'rgba(98, 189, 85, 0.5)',
      padding: { x: 6, y: 4 }
    }).setScrollFactor(0);

    this.physics.add.overlap(this.player, this.collectables, (player, moneda) => {
      if (!moneda.collected) {
        moneda.visible = false;
        moneda.collected = true;
        this.monedaCount++;
        this.sound_coin?.play({ volume: 0.5 }); // Sonido de moneda
        this.textMonedes.setText(`💰 Monedes: ${this.monedaCount}`);
        console.log(`💰 Moneda recollida. Total: ${this.monedaCount}`);
        console.log(`⭐ Estrelles actuals: ${this.estrellaCount}`);
        this.refreshScore(10);
      }
    }, null, this);

    this.physics.add.overlap(this.player, this.estrelles, (player, estrella) => {
      if (!estrella.collected) {
        estrella.visible = false;
        estrella.collected = true;
        this.estrellaCount++;
        this.sound_star.play({ volume: 0.8 }); // Sonido de estrella (inicio)
        this.time.delayedCall(1000, () => {
          this.sound_star.stop(); // Detener tras 1 segundo
        });
        this.textEstrelles.setText(`⭐ Estrelles: ${this.estrellaCount}`);
        console.log(`⭐ Estrella recollida. Total: ${this.estrellaCount}`);
        console.log(`💰 Monedes actuals: ${this.monedaCount}`);
        this.refreshScore(20);
      }
    }, null, this);

    this.score = 0;
    this.scoreText = this.add.text(16, 96, '🏆 Score: 0', {
      fontSize: '18px',
      fill: '#000',
      backgroundColor: 'rgba(98, 189, 85, 0.5)',
      padding: { x: 6, y: 4 }
    }).setScrollFactor(0);

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.launch('PauseMenu'); // Lanza escena de pausa
      this.scene.pause();             // Pausa MainScene
    });
  }

  update() {
    if (!this.isAlive) return;
    this.player.update(this.cursors, this.sound_jump, this.escaleras);

    // Actualizar Goombas
    this.goombas.forEach(goomba => {
      goomba.update();
    });

    // Verificar colisión con el Goomba
    this.goombas.forEach(goomba => {
      if (this.physics.overlap(this.player, goomba)) {
        // Verificar si el jugador está cayendo y está sobre el Goomba
        if (this.player.body.velocity.y > 0 && this.player.body.bottom > goomba.body.top) {
          // El jugador está cayendo y lo aplasta
          goomba.die();
          this.player.body.velocity.y = -300; // Rebote hacia arriba tras aplastar
          this.sound_goomba.play({ volume: 1 }); // Sonido del Goomba aplastado
          this.time.delayedCall(500, () => {
            goomba.destroy(); // Eliminar el Goomba
          });
        } else {
          // El jugador está colisionando con el Goomba de otra forma (no está cayendo)
          // El jugador muere en este caso
          this.playerDie(); // Solo se llama una vez
          this.player.body.velocity.x = 0; // Detener el movimiento horizontal
          this.player.body.velocity.y = 0; // Detener el movimiento vertical
          this.player.body.allowGravity = false; // Desactivar gravedad para evitar que el jugador caiga
        }
      }
    });

    const fallLimit = this.physics.world.bounds.height - 300;
    if (this.player.y > fallLimit) {
      this.playerDie(); // Llamada a la función de muerte si cae
    }
  }

  // Método SCORE para incrementar el score
  refreshScore(value) {
    this.score += value;
    this.scoreText.setText(`🏆 Score: ${this.score}`);
  }

  playerDie() {
    // Comprobar si el jugador ya ha muerto antes
    if (!this.isAlive) return; // Si ya está muerto, no hacemos nada más

    this.isAlive = false; // Marcamos que el jugador está muerto

    // Crear siempre una nueva instancia del sonido de muerte y reproducirlo
    this.sound_die.play({ volume: 1 });

    // Detener la música de fondo actual
    this.music_bucle.stop();

    // Realizamos la animación de la cámara (fade out)
    this.cameras.main.fade(2150, 0, 0, 0);

    // Reiniciar la escena después de 2 segundos
    this.time.delayedCall(2000, () => {
      this.scene.restart(); // Reiniciar la escena
    });
  }

  endGame(completed = false) {
    if (!this.isAlive) return;
    this.isAlive = false;
    this.physics.pause();
    this.player.setVelocity(0);
    this.player.anims.stop();
    if (this.music_bucle && this.music_bucle.isPlaying) {
      this.music_bucle.stop();
    }
    this.sound_die.play();

    if (!completed) {
      this.time.delayedCall(2500, () => {
        this.scene.restart();
      });
    } else {
      this.scene.start('endScene', {
        score: this.score,
        monedes: this.monedaCount,
        estrelles: this.estrellaCount,
        bonusAltura: this.player.y
      });
    }
  }
}
