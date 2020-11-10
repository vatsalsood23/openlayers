const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      //   extent: [
      //     7200979.560689885,
      //     675091.8338146787,
      //     10860172.978757843,
      //     4412556.768846657,
      //   ],
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: false,
        // Only this area of this layer will be visible
        // extent: [
        //   7200979.560689885,
        //   675091.8338146787,
        //   10860172.978757843,
        //   4412556.768846657,
        // ],
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
  });

  // Layer Group
  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 0,
        visible: false,
        // extent: [
        //   7200979.560689885,
        //   675091.8338146787,
        //   10860172.978757843,
        //   4412556.768846657,
        // ],
      }),
    ],
  });
  map.addLayer(layerGroup);

  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png",
    }),
    visible: true,
  });

  map.addLayer(cartoDBBaseLayer);

  map.on("click", (e) => {
    console.log(e.coordinate);
  });
};

window.onload = init;
