export default class PauseMenu extends Phaser.Scene {
    constructor() {
      super('PauseMenu');
    }
  
    preload() {
      this.load.audio('pauseMusic', 'assets/sounds/super_mario_bros_3_pausa.mp3');
    }
  
    create() {
      const { width, height } = this.scale;
  
      this.sound.pauseAll(); // en vez de stopAll
  
      this.pauseMusic = this.sound.add('pauseMusic', { volume: 0.5 });
      this.pauseMusic.play();
  
      this.add.rectangle(width / 2, height / 2, 400, 300, 0x000000, 0.6);
  
      this.add.text(width / 2, height / 2 - 80, '⏸️ Juego en pausa', {
        fontSize: '32px',
        color: '#ffffff'
      }).setOrigin(0.5);
  
      // Efecto de hover
      const addHoverEffect = (text, baseColor = '#fff', hoverColor = '#ff0') => {
        text.setInteractive()
          .on('pointerover', () => text.setStyle({ fill: hoverColor, fontStyle: 'bold' }))
          .on('pointerout', () => text.setStyle({ fill: baseColor, fontStyle: 'normal' }));
      };
  
      const resumeText = this.add.text(width / 2, height / 2 - 10, '▶ Reanudar', {
        fontSize: '28px',
        fill: '#0f0'
      }).setOrigin(0.5);
  
      addHoverEffect(resumeText, '#0f0', '#ff0');
  
      resumeText.on('pointerdown', () => {
        this.pauseMusic.stop();
        this.sound.resumeAll(); // reanudar toda la música pausada
        this.scene.stop();
        this.scene.resume('MainScene');
        });
    
  
      const backToMenuText = this.add.text(width / 2, height / 2 + 50, '🏠 Volver al menú', {
        fontSize: '28px',
        fill: '#f00'
      }).setOrigin(0.5);
  
      addHoverEffect(backToMenuText, '#f00', '#ff0');
  
      backToMenuText.on('pointerdown', () => {
        this.pauseMusic.stop();  // Detener música de pausa
        this.sound.stopAll();    // Detener cualquier música de fondo
    
        this.scene.stop('MainScene'); // Detener MainScene
        this.scene.stop();            // Detener PauseMenu
        this.scene.start('Menu');     // Volver al menú principal
        });
    
    }
  }
  