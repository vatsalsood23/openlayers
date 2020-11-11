const init = () => {
  // Attribution control
  const attributionControl = new ol.control.Attribution({
    collapsible: true,
  });

  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),

    target: "js-map",
    keyboardEventTarget: document,
    controls: ol.control
      .defaults({ atrribution: false })
      .extend([attributionControl]),
  });

  // Base Layers
  // Openstreet Map Standard
  const openstreetMapStandardLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: true,
    title: "OSMStandard",
  });

  // Open Street map Humanitarian
  const opemstreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    zIndex: 0,
    visible: false,
    title: "OSMHumanitarian",
  });

  // Carto DB layer
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png",
      attributions: "Cato",
    }),
    visible: false,
    title: "voyager_labels_under",
  });

  // Stamen basemap layer
  const stamenBaseLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "terrain-labels",
    }),
    visible: false,
    title: "StamenTerrainWithLabels",
  });

  // Stamen basemap layer
  const stamenBaseMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
    }),
    visible: false,
    title: "StamenTerrain",
  });

  // Base Vector Layers
  // Vector Tile Layer OpenstreetMap
  // This will be applied to all the layers on the map if they are visible

  const openstreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url:
        "https://api.maptiler.com/tiles/v3-4326/{z}/{x}/{y}.pbf?key=QeIUwoaCPC4IKWmLaAkB",
      format: new ol.format.MVT(),
      attributions:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    visible: false,
    title: "VectorTileLayerOpenStreetMap",
  });

  const openstreetMapVectorTileStyles =
    "https://api.maptiler.com/maps/7014b9a5-04b3-4315-afe8-de034e5bfa73/style.json?key=QeIUwoaCPC4IKWmLaAkB";

  fetch(openstreetMapVectorTileStyles).then(function (response) {
    response.json().then(function (glStyle) {
      olms.applyStyle(openstreetMapVectorTile, glStyle, "31ffb1ca-a60e-4a5d-a4d0-78fc608ead69");
    });
  });


  // Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandardLayer,
      opemstreetMapHumanitarian,
      cartoDBBaseLayer,
      stamenBaseLayer,
      stamenBaseMapLayer,
      openstreetMapVectorTile,
    ],
  });
  map.addLayer(baseLayerGroup);

  // Layer switcher logic for base layers
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );

  for (let baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", () => {
      let baseLayerElementValue = baseLayerElement.value;
      baseLayerGroup.getLayers().forEach((element, index, array) => {
        let baseLayerName = element.get("title");
        element.setVisible(baseLayerName === baseLayerElementValue);
      });
    });
  }

  //   tile ArcGIS REST API Layer
  const tileArcGISLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url:
        "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer",
    }),
    visible: false,
    title: "TileArcGISLayer",
  });

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
    title: "NOAAWMSLayer",
  });

  const rasterTileLayerGroup = new ol.layer.Group({
    layers: [tileArcGISLayer, NOAAWMSLayer],
  });

  map.addLayer(rasterTileLayerGroup);

  // Logic Switcher for raster tile layers
  const tileRatserLaterElements = document.querySelectorAll(
    ".sidebar > input[type=checkbox]"
  );
  for (let tileRatserLaterElemet of tileRatserLaterElements) {
    tileRatserLaterElemet.addEventListener("change", (e) => {
      let tilRasterLayerElementValue = e.target.value;
      let tileRasterLayer;
      rasterTileLayerGroup.getLayers().forEach((element, index, array) => {
        if (tilRasterLayerElementValue === element.get("title")) {
          tileRasterLayer = element;
        }
      });
      e.target.checked
        ? tileRasterLayer.setVisible(true)
        : tileRasterLayer.setVisible(false);
    });
  }
};

window.onload = init;
