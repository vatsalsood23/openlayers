const init = () => {
  const attributionControl = new ol.control.Attribution({
    collapsible: true,
  });

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
    controls: ol.control
      .defaults({ atrribution: false })
      .extend([attributionControl]),
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

  // Carto DB layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png",
      attributions: "Cato",
    }),
    visible: true,
  });

  map.addLayer(cartoDBBaseLayer);

  // Stamen basemap layer
  const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
    }),
    visible: false,
  });

  map.addLayer(stamenBaseLayer);

  // Stamen basemap layer
  const stamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
    }),
    visible: false,
  });

  map.addLayer(stamenBaseMapLayer);

  //   tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url:
        "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
    }),
    visible: false,
  });
  map.addLayer(tileArcGISLayer);

  //   NOAA WMS Layer
  const NOAAWMSLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url:
        "https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer",
      params: {
        LAYERS: 2,
        FORMAT: "image/png",
        TRANSPARENT: true,
      },
      attributions: '<a href="https://nowcoast.noaa.gov/">copyright noa</a>',
    }),
    visible: false,
  });

  map.addLayer(NOAAWMSLayer);

  console.log(
    NOAAWMSLayer.getSource().setAttributions(
      '<a href="https://nowcoast.noaa.gov/">copyright noa</a>'
    )
  );
};

window.onload = init;
