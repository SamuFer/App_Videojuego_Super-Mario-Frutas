export default class MapLoader {
    constructor(scene) {
      this.scene = scene;
    }
  
    loadMap() {
      const map = this.scene.make.tilemap({ key: 'tilemap' });
      const tileset = map.addTilesetImage('mariobros', 'marioTiles');
      const tileset2 = map.addTilesetImage('Dungeon', 'dungeonTiles');
  
      map.createLayer('background', tileset);
      const plataforma2_layer = map.createLayer('platform2', tileset2);
      const plataforma_layer = map.createLayer('platform', tileset);
      const bandera_layer = map.getObjectLayer('bandera');

  
      plataforma_layer.setCollisionByExclusion([-1]);
  
      return {
        map,
        plataforma_layer,
        plataforma2_layer,
        bandera_layer
      };
    }
  }