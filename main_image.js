const Feature = ol.Feature;
const Point = ol.geom.Point;
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

  map.addLayer(openstreetMapStandardLayer);

  const IndiaGeoJSON = new ol.layer.VectorImage({
    visible: true,
    source: new ol.source.Vector({
      url: "./data/vector_data/map.geojson",
      format: new ol.format.GeoJSON(),
    }),
  });

  const iconStyle = new ol.style.Style({
    geometry: function (feature) {
      let geometry = feature.getGeometry();
      console.log("geometry", geometry.getCoordinates()[0]);
      // find midpoint of longest line
      let coords = geometry.getCoordinates()[0];
      let ax = 0;
      let ay = 0;
      let maxLength = -1;
      for (var i = 0; i < coords.length; i++) {
        let dx = coords[(i + 1) % coords.length][0] - coords[i][0];
        let dy = coords[(i + 1) % coords.length][1] - coords[i][1];
        if (dx * dx + dy * dy > maxLength) {
          maxLength = dx * dx + dy * dy;
          ax = coords[i][0] + dx / 2;
          ay = coords[i][1] + dy / 2;
        }
      }
      return new Point([ax, ay]);
    },
    image: new ol.style.Icon({
      src: "./data/static_images/marker.png",
    }),
  });

  const polygonStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: "#fff",
    }),
    stroke: new ol.style.Stroke({
      color: "#fff",
      width: 2,
    }),
  });

  const rectangleStyle = () => {};

  IndiaGeoJSON.setStyle([polygonStyle, iconStyle]);

  map.addLayer(IndiaGeoJSON);
};
window.onload = init;
