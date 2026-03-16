export default class MapLoader {
  constructor(scene) {
    this.scene = scene;
  }

  loadMap() {
    const map = this.scene.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('platformer', 'tiles');

    // Visual layers
    const suelo = map.createLayer('suelo', tileset, 0, 0);
    const sueloTierra = map.createLayer('sueloTierra', tileset, 0, 0);
    const bloques = map.createLayer('bloques', tileset, 0, 0);
    const escaleras = map.createLayer('escaleras', tileset, 0, 0);
    const maderas = map.createLayer('maderas', tileset, 0, 0);
    const puertas = map.createLayer('puertas', tileset, 0, 0);
    const flores = map.createLayer('flores', tileset, 0, 0);
    const arboles = map.createLayer('arboles', tileset, 0, 0);
    const pinchos = map.createLayer('pinchos', tileset, 0, 0);
    const flechas = map.createLayer('flechas', tileset, 0, 0);
    const premios = map.createLayer('premios', tileset, 0, 0);
    const peligros = map.createLayer('peligros', tileset, 0, 0);

      
  

    // Object layers
    const personajesLayer = map.getObjectLayer('personajes');
    const colisionesLayer = map.getObjectLayer('colisiones');
    const triggerZoneLayer = map.getObjectLayer('trigger zone');
    const monedasLayer = map.getObjectLayer('monedas');
    const estrellaLayer = map.getObjectLayer('stars');

    // Collisions només amb la capa "suelo"
    suelo.setCollisionByExclusion([-1]);
    maderas.setCollisionByExclusion([-1]);
    bloques.setCollisionByExclusion([-1]);
    sueloTierra.setCollisionByExclusion([-1]);
    escaleras.setCollisionByExclusion(false);




    return {
      map,
      suelo,
      sueloTierra,
      bloques,
      escaleras,
      maderas,
      puertas,
      flores,
      arboles,
      pinchos,
      flechas,
      premios,
      peligros,
      personajesLayer,
      colisionesLayer,
      triggerZoneLayer,
      monedasLayer,
      estrellaLayer,
    };
  }
}
