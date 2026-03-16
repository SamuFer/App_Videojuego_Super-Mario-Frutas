import Phaser from "phaser";
import MainScene from "./scenes/MainScene.js";
import Menu from "./scenes/Menu.js";
import Level from "./scenes/Level.js";
import Mode from "./scenes/Mode.js";
import Controls from "./scenes/Controls.js";
import EndGame from "./scenes/EndGame.js";
import RankingScene from "./scenes/RankingScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1250,
  height: 1200,
  backgroundColor: '#ffffac',
  scene: [MainScene, EndGame, RankingScene, Menu, Mode, Controls, Level], // Aquí afegim les escenes que volem carregar

  physics: {
    default: 'arcade',
    arcade: {
      //debug: true, // Set to true to see physics debug information --> veiem els requadres de col·lisió
      gravity: { y: 300 }
    }
  },
  dom: {
    createContainer: true
  }
};

new Phaser.Game(config);