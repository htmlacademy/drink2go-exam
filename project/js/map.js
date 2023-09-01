const mapContainer = document.querySelector('.main__map');

const PinMarkerCoordinates = {
  LAT: 59.968354,
  LNG: 30.317595,
};

const map = L.map('map');
const MAP_ZOOM = 18;

const pinIcon = L.icon({
  iconUrl: './img/map/map-pin.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const pinMarker = L.marker(
  {
    lat: PinMarkerCoordinates.LAT,
    lng: PinMarkerCoordinates.LNG,
  },
  {
    icon: pinIcon,
  }
);

mapContainer.classList.remove('main__map--nojs');

map.setView({
  lat: PinMarkerCoordinates.LAT,
  lng: PinMarkerCoordinates.LNG,
}, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

pinMarker.addTo(map);
