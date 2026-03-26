// ===== MAP.JS — Leaflet Live Hazard Map =====

document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('leafletMap');
  if (!mapEl || typeof L === 'undefined') return;

  // Center on Bohol, Philippines
  const map = L.map('leafletMap', {
    center: [9.65, 124.15],
    zoom: 10,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  // Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  // Custom icon factory
  function makeIcon(color, emoji) {
    return L.divIcon({
      className: '',
      html: `<div style="
        background:${color};
        border:3px solid #fff;
        border-radius:50% 50% 50% 0;
        width:36px;height:36px;
        display:flex;align-items:center;justify-content:center;
        font-size:1.1rem;
        transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
      "><span style="transform:rotate(45deg)">${emoji}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -40],
    });
  }

  // Hazard markers
  const markers = [
    {
      lat: 9.648,  lng: 123.854,
      icon: makeIcon('#e53935', '🔥'),
      title: 'Fire – Brgy. Booy',
      level: 'HIGH RISK',
      color: '#e53935',
      detail: 'Fire Level 5 Alarm. Responders on-site.'
    },
    {
      lat: 9.73,   lng: 124.22,
      icon: makeIcon('#1a56a8', '🌊'),
      title: 'Flood Watch – Carmen',
      level: 'MODERATE',
      color: '#f57c00',
      detail: 'Water levels elevated. Monitor situation.'
    },
    {
      lat: 9.82,   lng: 124.35,
      icon: makeIcon('#1a56a8', '🌊'),
      title: 'Flood – Bilar Area',
      level: 'MODERATE',
      color: '#f57c00',
      detail: 'Low-lying areas at risk. Avoid floodways.'
    },
    {
      lat: 9.69,   lng: 124.46,
      icon: makeIcon('#2e7d32', '✅'),
      title: 'Danao – All Clear',
      level: 'SAFE',
      color: '#2e7d32',
      detail: 'No active hazards reported.'
    },
    {
      lat: 9.56,   lng: 123.75,
      icon: makeIcon('#2e7d32', '✅'),
      title: 'Panglao – All Clear',
      level: 'SAFE',
      color: '#2e7d32',
      detail: 'No active hazards reported.'
    },
  ];

  markers.forEach(m => {
    L.marker([m.lat, m.lng], { icon: m.icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'DM Sans',sans-serif;min-width:180px">
          <strong style="font-size:0.95rem;color:#0a2463">${m.title}</strong><br/>
          <span style="
            background:${m.color};color:#fff;
            font-size:0.72rem;font-weight:700;
            padding:2px 10px;border-radius:10px;
            display:inline-block;margin:6px 0;
          ">${m.level}</span>
          <p style="font-size:0.85rem;color:#3d4f63;margin:0">${m.detail}</p>
        </div>
      `);
  });

  // Flood zone polygon around Carmen area
  L.polygon([
    [9.75, 124.18], [9.80, 124.26], [9.74, 124.30], [9.70, 124.22]
  ], {
    color: '#f57c00',
    fillColor: '#f57c00',
    fillOpacity: 0.15,
    weight: 2,
    dashArray: '6,4',
  }).addTo(map).bindPopup('<strong>Flood Zone – Carmen Area</strong><br/>Moderate risk. Stay alert.');

  // Fire zone circle
  L.circle([9.648, 123.854], {
    radius: 600,
    color: '#e53935',
    fillColor: '#e53935',
    fillOpacity: 0.18,
    weight: 2,
  }).addTo(map).bindPopup('<strong>Active Fire Area – Brgy. Booy</strong><br/>Level 5 Alarm. Keep distance.');
});
