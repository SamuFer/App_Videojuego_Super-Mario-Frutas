# PUNT 5. Afegint puntuació, matar al personatge, etc 

## Afegir una puntuació

El procés és molt simple

- [ ] A la **secció general**

Declarem les variablea , p.ex. *scoreText* i *score*  inicialitzades a "" i 0 respectivament
Aquestes variables desaran l'objecte Text i la puntuació en format enter

- [ ] A **create**:

```
scoreText = this.add.text(200,-100,"Score: 0",{ fontSize: '32px', fill:'#000'})
```

Els dos primers paràmetres són les coordenades, iniciant per la part superior-esquerra,  però has de jugar una mica amb els valors per obtenir la posició desitjada. Un valor negatiu puja més amunt la posició del text
 
- [ ] A **update**

```
scoreText.x = player.body.position.x
//scoreText.y = player.body.position.y - 200
```

La part comentada et servirà per a que el text no es mogui realment en pantalla. A l'activitat hauràs de sumar puntuació. En aquest punt serà recomanable crear un mètode a la classe de la nostra escena:

```
refreshScore(value) {
    score += value
    scoreText.setText("Score: "+ score)
}
```
I quan recollim monedes o altres objectes cridar a aquest mètode, que ho farem mitjançant this.refreshScore, ja que és un mètode de la classe i no general, com les variables anteriors


## El personatge more

Depenent del teu mapa, huràs de fer l'activitat relacionada amb aquest punt d'una forma o altra. En el cas de l'exemple hi ha "forats" al mapa, pel qual el jugador pot caure. Aprofitaré aquest punt per ilustrar aquest apartat. Faré que quan el jugador cau es torni a iniciar l'escena i si arriba al final de forma triomfant (cosa que encara no tenim programada) passi a una altra escena:

- [ ] A **update**

Establim les condicions en les quals el personatge more o acaba la partida,, tot i que podem jugar amb una capa amb Tiled, amb per exemple el castell final o un objecte transparent que quan  nostre jugador hi col·lisioni o solapi executi un mètode "final". en aquest darrer cas no caldria fer-ho a l'update, sinó al create quan establim la col·lisió o solapament 

En el meu exemple simplement control·lo si el personatge cau mirant la seva coordenada y

```

    if (player.body.position.y > 400) {
      this.endGame(false)
    }
```

El mètode endGame és un mètode de classe i per tant l'invoquem amb this.


```
endGame(completed = false) {
    if(! completed) { // no hem arribat al final
      // Podríem generar una animació de mort del personatge
      this.scene.restart() //start('EndGame');
    } else { // Hem arribat al final bé
      // Podriem Generar una animació
      this.scene.start('endScene');
    }
  }
```

Per carregar una Scene s'utilitza l'etiqueta especificada al constructor de la classe. en el meu cas: endScene

```
class EndGame extends Phaser.Scene {
  constructor() {
    super('endScene');
  }
  .......
``` 

Podem millorar afegint un àudio i un delay fins que canvii d'escena. (No s'inclou tot el codi)

```
if(! completed) { // no hem arribat al final
   this.physics.pause() // atura tot moviment
   console.log("S'atura")
   music_bucle.stop();  // atura la música principal
      
   sound_die.play({  // sona l'àudio de personatge mort
     volume: 1,
     loop: false
   })
   this.time.addEvent({  // Delay de 4,5 segons
      delay: 4500,
      loop:false,
      callback: ()=> {  // quan acaba, reinicia l'escena
        this.scene.restart()
      }
    })
}
```

Cal vigilar també que tal com està l'exemple, a l'update cal afegir alguna cosa més per a evitar un bucle infinit. Observa el codi


## Activitat 5

- [ ] Afegeix un comptador de puntuació
- [ ] Incorpora dos finals de joc, o escena: 
- Quan el jugador cau en algun forat (o més endavant quan l'ataqui un enemic) fem un restart de l'escena, amb una animació del sprite, un àudio i desactivant el control de tecles (pots fer servir una variable general, p.ex "isalive", a true o false, i no permetre control de teclat si està a false)
- quan el jugador arriba al final de l'escenari. Dues opcions:  *Control de coordenades*, i quan el jugador arribi a la bandera, saltar al final de joc o canvi de nivell o un  *objecte* (la bandera) quan hi col·lisioni fer el mateix. Incorpora un control de l'altura del personatge quan toqui la bandera i sumi més punts o menys en funció de l'altura