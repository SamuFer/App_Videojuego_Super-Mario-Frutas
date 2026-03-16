import Phaser from "phaser";

export default class EndGame extends Phaser.Scene {
  constructor() {
    super('endScene');
  }
  preload() {
    console.log("EEEEE");
  }
  create() {
    this.add.text(200, 100, "Final del Joc", { fontSize: '48px', fill: '#000' });
  }
  update() {}
}