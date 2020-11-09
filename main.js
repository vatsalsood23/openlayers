const init = () => {
  const map = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      maxZoom: 2,
      rotation: 0.5,
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    target: "js-map",
    keyboardEventTarget: document,
    controls: ol.control.defaults().extend([]),
  });

  const popupContainerElement = document.getElementById("popup-coordinates");
  const popup = new ol.Overlay({
    element: popupContainerElement,
    positioning: "center-left",
  });

  map.addOverlay(popup);

  map.on("click", (e) => {
    const clickedCoordinate = e.coordinate;
    popup.setPosition(undefined);
    popup.setPosition(clickedCoordinate);
    popupContainerElement.innerHTML = clickedCoordinate;
  });

  // DragRotate Interaction
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly,
  });

  map.addInteraction(dragRotateInteraction);

  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
    freehand: true,
  });

  map.addInteraction(drawInteraction);

  // Could use the following code to save the drawing to the db after we finish drawing
  drawInteraction.on("drawend", (e) => {
    console.log("drawend", e);
    let parser = new ol.format.GeoJSON();
    let drawnFeatures = parser.writeFeaturesObject([e.feature]);
    console.log(
      "drawnFeatures",
      drawnFeatures.features[0].geometry.coordinates[0]
    );
  });
};

window.onload = init;
