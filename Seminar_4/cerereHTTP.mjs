// planes-over-country.js
import fetch from "node-fetch";

// helper generc pentru JSON (păstrat ca în exemplul tău)
async function getObjectFromUrl(url) {
  const response = await fetch(url, {
    headers: {
      // e politicos (și recomandat de Nominatim) să pui un User-Agent identificabil
      "User-Agent": "webtech-seminar/1.0 (contact@example.com)",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return await response.json();
}

// ia bounding box pentru o țară (folosește Nominatim)
async function getCountryBounds(country) {
  const data = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
      country
    )}&format=json`
  );

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`Nu am găsit țara: ${country}`);
  }

  // Nominatim dă boundingbox ca [south, north, west, east] (string-uri)
  const bb = data[0].boundingbox;
  const minLatitude = Number(bb[0]);
  const maxLatitude = Number(bb[1]);
  const minLongitude = Number(bb[2]);
  const maxLongitude = Number(bb[3]);

  return { minLatitude, maxLatitude, minLongitude, maxLongitude };
}

// map pentru un element "state" din OpenSky
function mapOpenSkyState(s) {
  // conform API OpenSky "states": [
  // 0: icao24, 1: callsign, 2: origin_country, 3: time_position, 4: last_contact,
  // 5: longitude, 6: latitude, 7: baro_altitude, 8: on_ground, 9: velocity,
  // 10: true_track, 11: vertical_rate, 12: sensors, 13: geo_altitude,
  // 14: squawk, 15: spi, 16: position_source (17: category - dacă e prezent)
  return {
    icao24: s[0],
    callsign: s[1]?.trim() || null,
    origin_country: s[2],
    time_position: s[3],
    last_contact: s[4],
    longitude: s[5],
    latitude: s[6],
    baro_altitude: s[7],
    on_ground: s[8],
    velocity: s[9],
    true_track: s[10],
    vertical_rate: s[11],
    geo_altitude: s[13],
    squawk: s[14],
    spi: s[15],
    position_source: s[16],
  };
}

// --- cerința: obține lista avioanelor de deasupra României (sau altă țară) ---
export async function getPlanesOverCountry(country = "Romania") {
  const { minLatitude, maxLatitude, minLongitude, maxLongitude } =
    await getCountryBounds(country);

  const url =
    `https://opensky-network.org/api/states/all` +
    `?lamin=${minLatitude}&lomin=${minLongitude}&lamax=${maxLatitude}&lomax=${maxLongitude}`;

  const data = await getObjectFromUrl(url);

  const states = Array.isArray(data.states) ? data.states : [];
  // map + un mic sort opțional după callsign
  return states.map(mapOpenSkyState).sort((a, b) => {
    const ca = a.callsign || "",
      cb = b.callsign || "";
    return ca.localeCompare(cb);
  });
}

/* ----------------- DEMO ----------------- */
// cu async/await
(async () => {
  try {
    const planes = await getPlanesOverCountry("Romania");
    console.log(`Avioane deasupra României: ${planes.length}`);
    console.log(planes.slice(0, 5)); // primele 5
  } catch (e) {
    console.error("Eroare:", e.message);
  }
})();

// cu .then (promises)
getPlanesOverCountry("Romania")
  .then((planes) => {
    console.log("[then] total:", planes.length);
  })
  .catch((err) => console.error("[then] eroare:", err.message));
