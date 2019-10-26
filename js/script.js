var map = L.map('map').setView([-75.75, -122.23], 4);
var icon = L.icon({
    iconUrl: 'reddit-alien-brands.svg',
    iconSize: [27, 31],
    iconAnchor: [13.5, 17.5],
    popupAnchor: [0, -11],
});
L.geoJSON(ino, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {
            icon: icon
        }).bindPopup("Я инопланетный Василий!");
    }
}).addTo(map);


var layer = L.tileLayer('https://api.mapbox.com/styles/v1/alohomor/ck24fssed2nqu1cmymww7nokb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWxvaG9tb3IiLCJhIjoiY2syNGZqNzV4MDEwcjNua3gzemNwMDVnMyJ9.mKrMrrsj2eF33EA5-8hR8A').addTo(map);
var layerLabels;

function setBasemap(basemap) {
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