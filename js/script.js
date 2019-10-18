var map = L.map('map').setView([-75.75, -122.23], 4);
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "DarkViolet",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};  
 var smallIcon = new L.Icon({
     iconSize: [27, 27],
     iconAnchor: [13, 27],
     popupAnchor:  [1, -24],
     iconUrl: 'rocket.png'
 });
L.geoJSON(ino,{
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, smallIcon);
    }
	}).addTo(map);
	
	
var layer = L.esri.basemapLayer('Topographic').addTo(map);
  var layerLabels;
  function setBasemap (basemap) {
    if (layer) {
      map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);

    map.addLayer(layer);

    if (layerLabels) {
      map.removeLayer(layerLabels);
    }

    if (
      basemap === 'ShadedRelief' ||
      basemap === 'Oceans' ||
      basemap === 'Gray' ||
      basemap === 'DarkGray' ||
      basemap === 'Terrain'
    ) {
      layerLabels = L.esri.basemapLayer(basemap + 'Labels');
      map.addLayer(layerLabels);
    } else if (basemap.includes('Imagery')) {
      layerLabels = L.esri.basemapLayer('ImageryLabels');
      map.addLayer(layerLabels);
    }
  }

  document
    .querySelector('#basemaps')
    .addEventListener('change', function (e) {
      var basemap = e.target.value;
      setBasemap(basemap);
    });