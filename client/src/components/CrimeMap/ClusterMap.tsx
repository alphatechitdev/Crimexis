import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";

function CrimeClusterLayer({ crimes }) {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup();

    crimes.forEach((crime) => {
      const marker = L.marker([crime.lat, crime.lng]).bindPopup(`
        <b>${crime.type}</b><br />
        ${crime.description}<br />
        <small>${crime.time}</small>
      `);
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.removeLayer(markers);
    };
  }, [crimes, map]);

  return null;
}

export default function CrimeMapWithClusters({ crimes }) {
  return (
    <MapContainer center={[31.4, 74.3]} zoom={12} style={{ height: "90vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CrimeClusterLayer crimes={crimes} />
    </MapContainer>
  );
}
