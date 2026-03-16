import Phaser from "phaser";
import MainScene from "./scenes/MainScene.js";
// import Menu from "./scenes/Menu.js";
// import Level from "./scenes/Level.js";
// import Mode from "./scenes/Mode.js";
// import Controls from "./scenes/Controls.js";
// import EndGame from "./scenes/EndGame.js";

const config = {
  type: Phaser.AUTO,
  width: 1250,
  height: 700,
  backgroundColor: '#ffffac',
  scene: [MainScene],
//   scene: [MainScene, Menu, Level, Mode, Controls, EndGame],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
};

new Phaser.Game(config);