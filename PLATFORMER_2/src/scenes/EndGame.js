import Phaser from "phaser";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

export default class EndGame extends Phaser.Scene {
  constructor() {
    super('endScene');
  }

  init(data) {
    this.score = data.score || 0;
    this.monedes = data.monedes || 0;
    this.estrelles = data.estrelles || 0;
    this.bonusAltura = data.bonusAltura || 0;
  }

  async create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.text(centerX, centerY - 100, "🏁 Final del Joc", {
      fontSize: '48px',
      fill: '#000'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 20, `🏆 Puntuació final: ${this.score}`, {
      fontSize: '28px',
      fill: '#000'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 30, `🎯 Bonus altura: ${this.bonusAltura}`, {
      fontSize: '22px',
      fill: '#000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 60, `💰 Monedes: ${this.monedes}`, {
      fontSize: '24px',
      fill: '#000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 90, `⭐ Estrelles: ${this.estrelles}`, {
      fontSize: '24px',
      fill: '#000',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // ✅ Desa puntuació a Firestore sense demanar nom
    const puntuacioData = {
      puntuacio: this.score,
      monedes: this.monedes,
      estrelles: this.estrelles,
      bonusAltura: this.bonusAltura,
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'puntuacions'), puntuacioData);
      console.log('✅ Puntuació guardada correctament!');
    } catch (error) {
      console.error('❌ Error al desar la puntuació:', error);
    }

    this.add.text(centerX, centerY + 220, '✅ Puntuació guardada! Prem ESPAI per veure el rànquing', {
      fontSize: '18px',
      fill: '#333'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('rankingScene');
    });
  }

  update() {}
}
