export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    this.load.image('bg', 'assets/images/fondo_menu2.jpg');
    this.load.audio('menuMusic', 'assets/sounds/Voicy_Mario_intro_theme.mp3');
  }

  create() {
    this.add.image(1250 / 2, 1100 / 2, 'bg');

    this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.5 });
    this.menuMusic.play(); // 🔊 No usamos setName

    this.add.text(440, 150, '🎮 SUPER-VEGETABLE', {
      fontSize: '42px',
      fill: '#ffffff'
    });

    const addHoverEffect = (text, baseColor = '#fff', hoverColor = '#ff0') => {
      text.setInteractive()
        .on('pointerover', () => text.setStyle({ fill: hoverColor, fontStyle: 'bold' }))
        .on('pointerout', () => text.setStyle({ fill: baseColor, fontStyle: 'normal' }));
    };

    const startText = this.add.text(520, 300, '▶ Empezar', { fontSize: '32px', fill: '#0f0' });
    addHoverEffect(startText, '#0f0');
    startText.on('pointerdown', () => {
      this.menuMusic.stop(); // 👈 o .pause() si quieres retomarla luego
      this.scene.start('MainScene');
    });

    this.add.text(440, 450, 'Presiona la tecla [ESC] para Pausar el juego', {
      fontSize: '18px',
      fill: '#ffffff'
    });
    // const controlsText = this.add.text(520, 370, '🎮 Controles', { fontSize: '32px', fill: '#fff' });
    // addHoverEffect(controlsText);
    // controlsText.on('pointerdown', () => {
    //   this.scene.start('Controls');
    // });

    // const levelText = this.add.text(520, 440, '🗺️ Niveles', { fontSize: '32px', fill: '#fff' });
    // addHoverEffect(levelText);
    // levelText.on('pointerdown', () => {
    //   this.scene.start('Level');
    // });

    // const modeText = this.add.text(520, 510, '⚙️ Modo', { fontSize: '32px', fill: '#fff' });
    // addHoverEffect(modeText);
    // modeText.on('pointerdown', () => {
    //   this.scene.start('Mode');
    // });
  }
}
