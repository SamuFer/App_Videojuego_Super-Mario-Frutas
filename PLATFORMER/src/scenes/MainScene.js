import Phaser from 'phaser'; 

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Cargar el tileset
        this.load.image('tiles', 'assets/tileset/44pes_games_plataformer_grass_tileset_2.0.png');
        
        // Cargar el mapa en formato JSON
        this.load.tilemapTiledJSON('map', 'assets/maps2/platformer_map.json');

        // 🏃‍♂️ Cargar el personaje (imagen o spritesheet)
        this.load.spritesheet('player', 'assets/characters/tomato/tomato_Idle.png', {
          frameWidth: 128, // Ajusta según tu spritesheet
          frameHeight: 128 // Ajusta según tu spritesheet
        });
    }

    create() {
        // Crear el mapa
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('suelo', 'tiles');

        // Agregar la capa de tiles
        const layer = map.createLayer('suelo', tileset, 0, 0);

        // 🔽 Ajustar la escala de la capa de tiles (esto debe coincidir con la escala de la imagen y la colisión)
        layer.setScale(0.5); // Reduce los tiles de 64x64 a 32x32 

        // 🏃‍♂️ Crear el personaje en una posición inicial (x, y)
        this.player = this.physics.add.sprite(100, 300, 'player');
        // Reducir el tamaño del personaje sin afectar la imagen original
        this.player.setScale(0.5);

        // Agregar gravedad y colisiones
        this.player.setCollideWorldBounds(true); // Evita que salga del mundo
        this.player.setBounce(0.2); // Rebote leve
        this.player.setGravityY(300); // Gravedad del personaje

        // Habilitar colisión entre el personaje y la capa
        layer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, layer); // Añadido para interactuar con el mapa

        // Asegurarse de que los tiles de "suelo" tengan colisión activa (esto lo defines en Tiled)
        // Si los tiles de "suelo" están bien definidos en el mapa, esto debería funcionar sin problemas
    }

update() {
  // Lógica de actualización del juego (ESTAS SON PRUEBAS DE BOTONES PARA MOVER AL PERSONAJE(AL FINAL SE PUEDEN ELIMINAR))
  // AL FINAL ESTA JUGABILIDAD ESTARIA EN UN ARCHIVO SEPARADO
    const cursors = this.input.keyboard.createCursorKeys();
    

    // Movimiento a la izquierda
    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
    }
    // Movimiento a la derecha
    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
    }
    // Si no se mueve, detenerse
    else {
        this.player.setVelocityX(0);
    }

    // Salto si está en el suelo
    if (cursors.up.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-350);
    }
}
}