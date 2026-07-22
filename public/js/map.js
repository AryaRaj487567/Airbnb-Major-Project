const redIcon = L.icon({
    iconUrl: "/images/markerred.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const map = L.map("map").setView(
    [coordinates[1], coordinates[0]],
    10
);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }
).addTo(map);

const marker = L.marker([coordinates[1], coordinates[0]], {
    icon: redIcon
}).addTo(map);

marker.bindPopup(`<h5>${listingTitle}</h5><p>Exact location provided after booking.</p>`);