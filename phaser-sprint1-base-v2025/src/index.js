import Phaser from "phaser";
import MainScene from "./scenes/MainScene.js";
import Menu from "./scenes/Menu.js";
import Level from "./scenes/Level.js";
import Mode from "./scenes/Mode.js";
import Controls from "./scenes/Controls.js";
import EndGame from "./scenes/EndGame.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ffffac',
  scene: [MainScene, Menu, Level, Mode, Controls, EndGame],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
};

new Phaser.Game(config);