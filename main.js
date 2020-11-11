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

  // Layer Group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openstreetMapStandardLayer,
      opemstreetMapHumanitarian,
      cartoDBBaseLayer,
      stamenBaseLayer,
      stamenBaseMapLayer,
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
      console.log(e);
    });
  }
  console.log(tileRatserLaterElements);
};

window.onload = init;
