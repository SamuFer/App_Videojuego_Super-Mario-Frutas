export default class Goomba extends Phaser.Physics.Arcade.Sprite {
    static createdAnims = false;
    isDead = false;  // Nuevo flag para marcar si el Goomba está muerto

    constructor(scene, x, y) {
        super(scene, x, y, 'goomba');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Crear animaciones solo si no se han creado antes
        if (!Goomba.createdAnims) {
            Goomba.createAnims(scene);
            Goomba.createdAnims = true;  // Marcar como creadas
        }

        // Ajustar la escala y la física del Goomba
        this.setScale(2);
        this.body.setSize(16 * 1, 16 * 1);
        this.body.setOffset(0, 16 * (1 - 1));

        this.setCollideWorldBounds(true);
        this.flipX = false;

        this.setVelocityX(50); // Velocidad de movimiento inicial
        this.isDead = false; // Inicialmente no está muerto
    }

    // Crear animaciones para el Goomba
    static createAnims(scene) {
        scene.anims.create({
            key: 'goomba_walk',
            frames: scene.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1,
        });

        scene.anims.create({
            key: 'goomba_die',
            frames: [{ key: 'goomba', frame: 2 }],
            frameRate: 10,
            repeat: 0,
        });
    }

    // Método principal de actualización
    update() {
        if (this.isDead) return;  // Si el Goomba está muerto, no hacer nada más

        if (!this.body) return;
        this.handleMovement();  // Llamada a la lógica de movimiento
    }

    // Manejo de movimiento
    handleMovement() {
        const speed = 50;

        if (this.body.blocked.left || this.body.blocked.right) {
            this.flipX = !this.flipX;
        }

        this.body.setVelocityX(this.flipX ? -speed : speed);

        this.anims.play('goomba_walk', true);
    }

    // Método de muerte del Goomba
    die() {
        if (this.isDead) return;  // Evitar que se ejecute si ya está muerto

        this.isDead = true;  // Marcar al Goomba como muerto
        this.anims.play('goomba_die', true);

        // Usar this.scene.time.delayedCall para destruir el Goomba después de un retraso
        this.scene.time.delayedCall(500, () => {
            this.destroy();  // Destruir al Goomba después de la animación
        });
    }
}
