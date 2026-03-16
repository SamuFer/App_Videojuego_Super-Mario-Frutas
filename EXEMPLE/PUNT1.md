# PUNT 1. La base

## Començant 

Com a pas previ et caldrà instal·lar [Tiled](https://www.mapeditor.org/) al teu ordinador. Aquesta és una eina imprescindible per a dibuixar el mapa del teu joc.

A continuació aquest projecte al teu ordinador i obre'l a Visual Studio. Afegeix al teu repositori de GitHub Classroom. Aquest exemple de base està corrent sota Webpack, una llibreria que ens permet executar javascript amb node.js, com si estiguéssim  en una aplicació
de React 

Per tant, hauràs d'iniciaitzar el projecte i posar-lo en marxa amb

```
npm install 
npm run dev
```

Partim d'un únic fitxer, però cada escena, en algun moment, la ubicarem en fitxers ***js*** separats.
La carpeta assets contindrà tots els elements multimèdia necessaris. Els presents són a mode ilustratiu, però haureu de posar-hi els vostres
La carpeta src tots els javascripts que ens calguin. Un, inicialment


## Introducció

Phaser és un framework open-source de JavaScript que s'utilitza per a la creació de jocs en HTML5. És una eina potent i flexible que permet crear jocs tant per a ordinadors com per a dispositius mòbils.

### Elements i conceptes importants

***Escenes***: Les escenes són les unitats bàsiques d'organització en un joc de Phaser. Cada escena representa un estat independent del joc, com ara la pantalla de presentació, el nivell principal o la pantalla final.

***Objectes***: Els objectes representen les entitats del joc, com ara personatges, enemics, objectes interactius, etc. Cada objecte té les seves pròpies propietats i comportaments.

***Gràfics***: Phaser admet diversos formats d'imatges, com ara PNG, JPG i GIF. També permet usar **spritesheets** i **animacions**.

***Física***: Phaser inclou un motor de física integrat que permet simular el moviment i les col·lisions dels objectes del joc.

***So***: Phaser permet reproduir sons i música en format MP3, OGG i WAV.

***Entrada***: Phaser permet gestionar la interacció de l'usuari amb el joc, com ara clics del ratolí, tocs a la pantalla i pulsacions de tecles.

### El cor del nostre videojoc: el fitxer index.js i la configuració

De fet pot tenir qualsevol nom, però tal com el tenim aquí configurat serà index.js i es trobarà dins de la carpeta js

En aquest fitxer, si és únic, és on tindrem tot el codi del nostre videojoc. Aquí definirem totes les escenes i , molt important, l'objecte **config**.  L'objecte config és el cor de la configuració del joc. Defineix diversos aspectes clau de com funcionarà i es comportarà el  videojoc un cop s'inicialitzi.

El següent exemple és el que teniu a la plantilla. L'element scene , en aquest cas, conté un array amb tots les classes scenes de la nostra aplicació. El valor *type* defineix el tipus de renderitzat. Normalment el deixaem en *AUTO* . *width* i *height* s'expliquen per si mateixos. *scene* conté les escenes del joc i *physics* defineix la física del joc (arcade, impact). *arcade* és la física més senzilla i la que utilitzarem


```const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 572,
  //scene: [Menu, MainScene, Level, Mode, Controls, EndGame], //La primera escena és per on entra el joc
  scene: [MainScene, Menu, Level, Mode, Controls, EndGame], //La primera escena és per on entra el joc
  // scale: {
  //     mode: Phaser.Scale.FIT
  // },
  physics: {
      default: 'arcade',
      // arcade: {
      //   gravity: { y: 200 }
      // }
    },
}
```

Cada scene té un aspecte com el següent:

```
class MainScene extends Phaser.Scene {
  constructor() {
      super('gameScene');
  }

  preload() {
      //1r cop i  1 únic cop
  }

  create() {
      //1 únic cop
  }

  update() {
      //De forma repetida, un i un altre cop
  }
}`
```

### Els mètodes preload, create i update

Aquí desenvoluparem la màgia del nostre videojoc. Cada escena té al menys (habitualment) aquests tres mètodes. **preload** s'executa primer en carregar una escena. A continuació **create**. **update** s'executa ciclicament un determinat nombre de cops per segon (60 --> 60 fps)

[Explicació d'aquests tres mètodes](https://g.co/gemini/share/9cd3e30447c3)

Observa en aquest exemple com carreguem algunes imatges (preload)  

```
this.load.image('sky', 'assets/sky.png');
```

I com l'afegim a l'escena (create)

```
this.add.image(400, 300, 'sky');
```

<img src="assets/sky.png" alt="Fons del joc" width="350" /><br/>

Evidentment hi ha més mètodes a l'exemple, però ja els anirem comentant


### Creació del mapa

En aquest punt ja et tocarà treballar. Es tractaria de crear el mapa del vostre videojoc (plataformes i objectes fixos)

En aquest punt, et tocarà llegir tutorials: 

[Create Tilemap with Tiled](https://medium.com/swlh/grid-based-movement-in-a-top-down-2d-rpg-with-phaser-3-e3a3486eb2fd)
(Baixa a la secció Create Tilemap with Tiled)

El que necessitem és crear un json amb la informació del mapa. Et caldrà una imatge que contingui tots els elements (els patrons). Aquest fitxer sol tenir el nom de **Tiles**. En el cas de Mario, fitxer aquí present és força gran . Et recomano tenir el json resultant i la imatge tiles en la mateixa carpeta.

Tens també un video "casolà" per si estimes més una forma visual: [tiled en 2 minuts](https://www.youtube.com/watch?v=xJ4smDPvkIU)
(El video conté un error, ja que al carregar el conjunt de patrons cañl especificar que s'incrusti al mapa)

<img src="assets/maps/tiles.png" alt="Tiles del joc" width="250" /><br/><br/>

És important tenir clares les dimensions de cada tile dins de la imatge (32x32, 16x16,...): això ho trobaràs a la informació de cada pack que descarreguis. Les dimensions del mapa és l'altre punt important però aquí et recomano anar una mica a ull. Ho pots redimensionar en qualsevol moment si trobes que t'has quedat curt

Recursos:  [Tilemaps](https://itch.io/game-assets/free/tag-tilemap)

### Afegir el mapa a la nostra escena

Al tutorial anterior tens aquest mateix codi (canviant noms), però de forma resumida:

- [ ] Al mètode preload

```
this.load.image('marioTiles', 'assets/tiles.png');
this.load.tilemapTiledJSON('tilemap', 'assets/mapmario.json');
```

- [ ] Al mètode create

```
const map = this.add.tilemap('tilemap');
const tileset = map.addTilesetImage('map-tileset', 'marioTiles');
const platform_layer = map.createLayer('platform', tileset)
cons  coin_layer = map.createLayer('coin', tileset)
```
*map-tileset* és el nom que li hem donat al conjunt de patrons a l'aplicació Tiled 
Observa que amb aquest codi relacionem tots els elements

*createLayer* afegeix les capes del nostre mapa. 

# Punt 1. Activitat  ***M9***

Construeix el mapa del teu videojoc. Recorda que ha de ser similar al nivell de Mario Bros que et toqui fer i que no pots emprar els mateixos assets que altres grups. N'hi han molts de gratuits per internet, així que no et serà complicat aconseguir-ho. Envia al forum del moodle la imatge 'tiled' que utilitzis, però   revisa abans que ningú l'hagi emprat !!

No cal que el facis sencer en aquest punt, però més endavant si que l'hauràs de completar


[Punt 2](PUNT2.md)


