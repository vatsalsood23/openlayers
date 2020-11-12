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
      olms.applyStyle(
        openstreetMapVectorTile,
        glStyle,
        "31ffb1ca-a60e-4a5d-a4d0-78fc608ead69"
      );
    });
  });

  // Vector Layers
  // India GeoJSON Vector Layer
  // Style for polygons
  const fillStyle = new ol.style.Fill({
    color: [66, 135, 245],
  });

  // Style for lines
  const strokeStyle = new ol.style.Stroke({
    color: [29, 54, 94, 1],
    width: 1.2,
  });

  const regularShape = new ol.style.RegularShape({
    fill: new ol.style.Fill({
      color: [245, 49, 5, 1],
    }),
    stroke: strokeStyle,
    points: 3,
    radius: 15,
  });

  const circleStyle = new ol.style.Circle({
    fill: new ol.style.Fill({
      color: [245, 49, 5, 1],
    }),
    radius: 7,
    stroke: strokeStyle,
  });

  // Icon Marker Style

  const iconMarketStyle = new ol.style.Icon({
    src: "./data/static_images/marker.png",
    size: [100, 100],
    offset: [0, 0],
    opacity: 1,
    scale: 0.5,
    color: [10, 98, 240, 1],
  });

  const IndiaGeoJSON = new ol.layer.VectorImage({
    source: new ol.source.Vector({
      url: "./data/vector_data/map.geojson",
      format: new ol.format.GeoJSON(),
    }),
    visible: true,
    style: new ol.style.Style({
      // Styling of vector features
      // fill: fillStyle,
      stroke: strokeStyle,
      image: iconMarketStyle,
    }),
  });

  //map.addLayer(IndiaGeoJSON);

  // India KML
  // const IndiaKML = new ol.layer.Vector({
  //   source: new ol.source.Vector({
  //     url: "./data/vector_data/map.kml",
  //     format: ol.format.KML(),
  //   }),
  //   visible: true,
  // });
  // map.addLayer(IndiaKML);

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

  const layerGroup = new ol.layer.Group({
    layers: [tileArcGISLayer, NOAAWMSLayer, IndiaGeoJSON],
  });

  map.addLayer(layerGroup);

  // Logic Switcher for raster tile layers
  const tileRatserLaterElements = document.querySelectorAll(
    ".sidebar > input[type=checkbox]"
  );
  for (let tileRatserLaterElemet of tileRatserLaterElements) {
    tileRatserLaterElemet.addEventListener("change", (e) => {
      let tilRasterLayerElementValue = e.target.value;
      let tileRasterLayer;
      layerGroup.getLayers().forEach((element, index, array) => {
        if (tilRasterLayerElementValue === element.get("title")) {
          tileRasterLayer = element;
        }
      });
      e.target.checked
        ? tileRasterLayer.setVisible(true)
        : tileRasterLayer.setVisible(false);
    });
  }

  // Vector Feature Popup Information
  const overlayContainerElement = document.querySelector(".overlay-container");
  const overlayLayer = new ol.Overlay({
    element: overlayContainerElement,
  });

  map.addOverlay(overlayLayer);

  const overlayFeatureName = document.getElementById("feature-name");
  const overlayFeatureAdditionalInfo = document.getElementById(
    "feature-additional-info"
  );

  // Vector Feature Popup Information
  // Vector Feature Popup Logic

  map.on("click", (e) => {
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
      let clickedCoordinate = e.coordinate;
      let clickedFeatureName = feature.get("name");
      let clickedFeatureAdditionalInfo = feature.get("additional info");
      overlayLayer.setPosition(clickedCoordinate);
      overlayFeatureName.innerHTML = clickedFeatureName;
      overlayFeatureAdditionalInfo.innerHTML = clickedFeatureAdditionalInfo;
    });
  });

  // // Select Interaction - For Styling Selected Points
  // const selectInteraction = new ol.interaction.Select({
  //   condition: ol.events.condition.singleClick,
  //   style: new ol.style.Style({
  //     image: new ol.style.Circle({
  //       fill: new ol.style.Fill({
  //         color: [247, 26, 10, 1],
  //       }),
  //       radius: 12,
  //       stroke: new ol.style.Stroke({
  //         color: [247, 26, 10, 1],
  //         width: 3,
  //       }),
  //     }),
  //   }),
  // });

  // map.addInteraction(selectInteraction);
};

window.onload = init;
