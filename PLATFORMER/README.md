# PUNT 1. La base

* SUPER_VEGETABLE/
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