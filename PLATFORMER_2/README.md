LINK VIDEO 1: https://www.youtube.com/watch?v=hDW7aq6lY74
link video 2: 


# PUNT 1. La base

* PLATFORMER(SUPER_VEGETABLE)/
* │── assets/            # 📁 Conté tots els recursos multimèdia
* │   ├── tilesets/      # 📁 Per als tiles del mapa
* │   │   ├── 44pes_games_plat.png

* │   ├── maps/          # 📁 Per als mapes exportats des de Tiled
* │   │   ├── map.json
* │   ├── character/       # 📁 Per als personatges i objectes
* |   |   ├── tomato/
* │   │       ├── tomato_Idle.png
* │   │       ├── tomato_Run.png
* │   │       ├── tomato_Jump.png

* │── src/               # 📁 Codi font del joc
* │   ├── scenes/        # 📁 Cada escena del joc en un fitxer JS separat
* │   │   ├── MainScene.js
* │   │   ├── Menu.js
* │   │   ├── Level.js
* │   ├── index.js       # 🟢 Arxiu principal on es configura Phaser

* │── package.json       # 📄 Configuració del projecte (npm install)
* │── webpack.common.js  # 📄 Configuració per Webpack
* │── .gitignore         # 📄 Fitxers a ignorar a GitHub
* │── README.md          # 📄 Explicació del projecte


# PUNT 2. Afegint el jugador (player) i moviment
--- 
## EJEMPLO USADO
Al mètode preload:

this.load.spritesheet('mario',
          'assets/Mario.png',
          { frameWidth: 32, frameHeight: 32 }
      );



Observa que especifiquem la mida de cada frame, tal com hem calculat abans. Farà servir el primer sprite. Més endavant veurem com crear animacions
Al mètode create:

player = this.physics.add.sprite(280,200,'mario')


En aquest punt veurem que el sprite es queda penjant al cel. Ens cal afegir la gravetat; descomenta a config aquest apartat:

arcade: {
        gravity: { y: 300 }
      }
      
---
## Cal indicar-li a Phaser que el nostre player ha de colisionar amb la capa 'platform' de la nostra plataforma
 * Cal indicar-li a Phaser que el nostre player ha de colisionar amb la capa 'platform' de la nostra plataforma

            platform_layer.setCollisionByExclusion([-1]);
            this.physics.add.collider(player,platform_layer)


* Observa a la documentació què fa la primera línia: SetCollisionByExclusion
* La segona línia estableix que player i platform_layer no es poden travessar (colisionen)




# 🎮 Joc Platformer – Phaser 3

Aquest projecte és un videojoc 2D de plataformes desenvolupat amb **Phaser 3**, que incorpora salts, recollida d’objectes, animacions, so, i connexió amb Firebase. El jugador controla un tomàquet animat que ha de superar obstacles i recollir monedes i estrelles abans d’arribar al final del nivell.

## 📋 Funcionalitats implementades segons l’enunciat

**1. Jugador i moviment**
- Control del jugador amb tecles fletxa/WASD.
- Salt amb SPACE o W.
- Física arcade i gravetat personalitzada.

**2. Col·lisions i salts realistes**
- El jugador només pot saltar si està tocat terra.
- Col·lisions amb terra i plataformes flotants.
- Tractament especial per escales.

**3. Escales**
- El jugador pot pujar i baixar escales amb moviment suau.
- Es desactiva la gravetat mentre està a sobre.

**4. Recol·lecció d’objectes**
- Animacions de monedes i estrelles.
- So de recollida.
- Recompensa de punts per cada objecte.

**5. Final de nivell**
- Bandera amb animació.
- Final dinàmic amb puntuació extra segons l’altura.

**6. So**
- Música de fons en bucle.
- Sons per saltar, morir i recollir objectes.

**7. Puntuació i rànquing amb Firebase**
- Desem el nom del jugador i puntuació a Firebase.
- Mostrem un **ranking ordenat** per puntuació.
- Formulari HTML integrat per enviar dades.

## 🛠️ Tecnologies utilitzades

- [Phaser 3](https://phaser.io/)
- Firebase (Firestore)
- Tiled per disseny de mapes

## 📦 Com executar

1. Clona el repositori.
2. Obre amb `Live Server` o similar.
3. Juga i competeix per la millor puntuació!

---

**Projecte desenvolupat per [el teu nom o equip], curs 2024-2025.**
