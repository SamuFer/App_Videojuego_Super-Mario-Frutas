import Phaser from 'phaser';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

export default class RankingScene extends Phaser.Scene {
  constructor() {
    super('rankingScene');
  }

  async create() {
    this.cameras.main.setBackgroundColor('#ffffff');
    const centerX = this.cameras.main.centerX;
    let startY = 100;

    this.add.text(centerX, 40, '🏆 Rànquing de Puntuacions', {
      fontSize: '36px',
      fill: '#000'
    }).setOrigin(0.5);

    try {
      const puntuacionsRef = collection(db, 'puntuacions');
      const q = query(puntuacionsRef, orderBy('puntuacio', 'desc'));
      const querySnapshot = await getDocs(q);

      let pos = 1;
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // 🔁 Si no hi ha nom, posem "Jugador Anònim"
        const nom = data.nomJugador || "Jugador Anònim";
        const text = `${pos}. ${nom} - ${data.puntuacio || 0} punts (${data.monedes || 0}💰, ${data.estrelles || 0}⭐)`;

        this.add.text(centerX, startY, text, {
          fontSize: '20px',
          fill: '#333'
        }).setOrigin(0.5);

        startY += 30;
        pos++;
      });

    } catch (error) {
      console.error('Error carregant rànquing:', error);
      this.add.text(centerX, startY, 'Error carregant el rànquing', {
        fontSize: '20px',
        fill: '#900'
      }).setOrigin(0.5);
    }

    this.add.text(centerX, startY + 60, 'Prem ESPAI per tornar a començar', {
      fontSize: '18px',
      fill: '#555'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.stop();
      this.scene.stop('endScene');
      this.scene.start('MainScene');
    });
  }
}