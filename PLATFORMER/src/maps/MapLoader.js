export default class MapLoader {
  constructor(scene) {
    this.scene = scene;
  }

  loadMap() {
    const map = this.scene.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('platformer', 'tiles');

    const layers = {
      suelo: map.createLayer('suelo', tileset),
      sueloTierra: map.createLayer('sueloTierra', tileset),
      bloques: map.createLayer('bloques', tileset),
      escaleras: map.createLayer('escaleras', tileset),
      maderas: map.createLayer('maderas', tileset),
      puertas: map.createLayer('puertas', tileset),
      flores: map.createLayer('flores', tileset),
      arboles: map.createLayer('arboles', tileset),
      pinchos: map.createLayer('pinchos', tileset),
      flechas: map.createLayer('flechas', tileset),
      premios: map.createLayer('premios', tileset),
      peligros: map.createLayer('peligros', tileset),
    };

    //Object.values(layers).forEach(layer => layer.setScale(0.5));

    layers.suelo.setCollisionByExclusion([-1]);
    layers.maderas.setCollisionByExclusion([-1]);
    layers.escaleras.setCollisionByExclusion([-1]);
    // Ajustar la colisión de los tiles en la capa "maderas"
    // Ajustar la colisión para todos los tiles de cada capa
    Object.values(layers).forEach(layer => {
      layer.forEachTile(tile => {
        // Ajustar la colisión de todos los tiles (por ejemplo, 64x64 o el tamaño que necesites)
        tile.setSize(32, 32);  // Aquí ajustas el tamaño de la colisión a 64x64
      });
    });
    return {
      map,
      ...layers,
      personajesLayer: map.getObjectLayer('personajes'),
      colisionesLayer: map.getObjectLayer('colisiones'),
      triggerZoneLayer: map.getObjectLayer('trigger zone'),
      monedasLayer: map.getObjectLayer('monedas'),
      estrellaLayer: map.getObjectLayer('stars')
    };
  }
}
