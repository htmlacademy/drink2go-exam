const MAP_SETUP = {
  lat: 59.968500,
  lng: 30.317500,
  scale: 18
};

const MARKER_SETUP = {
    url: '../../img/content/map/map-pin.svg',
    size: [38, 50],
    isDraggable: false
};

const createPin = (url) => {
  return L.icon({
    iconUrl: url,
    iconSize: MARKER_SETUP.size,
    iconAnchor: [MARKER_SETUP.size[0] / 2, MARKER_SETUP.size],
  });
}

function createMarker (lat, lng, url, isDraggable, type) {
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      draggable: isDraggable,
      icon: createPin(url, type),
    },
  );

  return marker;
}

const initMapModule = () => {
  const map = L
    .map('map')
    .on('load')
    .setView(
      {
        lat: MAP_SETUP.lat,
        lng: MAP_SETUP.lng,
      },
      MAP_SETUP.scale);

  L
    .tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    )
    .addTo(map);

  const mainMarker = createMarker(MAP_SETUP.lat, MAP_SETUP.lng, MARKER_SETUP.url, MARKER_SETUP.isDraggable);
  mainMarker.addTo(map)
};

export { initMapModule };
