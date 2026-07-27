import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

type MarkerData = {
    marker: maplibregl.Marker;
    type: "musee" | "galerie" | "centre" | "evenement";
};

const FILTERS = [
    { key: "all", label: "Tout" },
    { key: "musee", label: "Musées" },
    { key: "galerie", label: "Galeries" },
    { key: "centre", label: "Centres d'art" },
    { key: "evenement", label: "Événements" },
];

const COLORS: Record<string, string> = {
    musee: "#bf7b69",
    galerie: "#ffffff",
    centre: "#7b7979",
    evenement: "#d4af37",
};

function createMarkerEl(type: string) {
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.style.backgroundColor = COLORS[type] ?? "#ffffff";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.borderRadius = "50%";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.fontSize = "16px";
    el.style.border = "2px solid rgba(0,0,0,0.3)";
    el.style.cursor = "pointer";
    el.style.lineHeight = "1";
    el.style.textAlign = "center";
    return el;
}

async function fetchOverpass(query: string): Promise<any> {
    const urls = [
        "https://overpass.kumi.systems/api/interpreter",
        "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
        "https://overpass-api.de/api/interpreter",
    ];
    return new Promise((resolve) => {
        let resolved = false;
        let failed = 0;
        for (const url of urls) {
            fetch(url, { method: "POST", body: query })
                .then(r => r.text())
                .then(text => {
                    if (!resolved && text.startsWith("{")) {
                        resolved = true;
                        resolve(JSON.parse(text));
                    } else {
                        failed++;
                        if (failed === urls.length && !resolved) resolve(null);
                    }
                })
                .catch(() => {
                    failed++;
                    if (failed === urls.length && !resolved) resolve(null);
                });
        }
    });
}

function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<MarkerData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    const applyFilter = (filter: string) => {
        setActiveFilter(filter);
        for (const { marker, type } of markersRef.current) {
            const el = marker.getElement();
            el.style.display = (filter === "all" || type === filter) ? "" : "none";
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                const map = new maplibregl.Map({
                    container: mapContainer.current!,
                    style: {
                        version: 8 as const,
                        sources: {
                            osm: {
                                type: "raster" as const,
                                tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                                tileSize: 256,
                            }
                        },
                        layers: [{ id: "osm", type: "raster" as const, source: "osm" }]
                    },
                    center: [longitude, latitude],
                    zoom: 13,
                });

                mapRef.current = map;

                const userEl = createMarkerEl("evenement");
                userEl.style.backgroundColor = "#2d9e5f";
                new maplibregl.Marker({ element: userEl })
                    .setLngLat([longitude, latitude])
                    .setPopup(new maplibregl.Popup().setHTML("<strong>Vous êtes ici</strong>"))
                    .addTo(map);

                setLoading(false);

                const radius = 5000;
                const overpassQuery = `[out:json][timeout:25];(node["tourism"="museum"](around:${radius},${latitude},${longitude});node["tourism"="gallery"](around:${radius},${latitude},${longitude});node["amenity"="arts_centre"](around:${radius},${latitude},${longitude}););out body;`;

                const overpassData = await fetchOverpass(overpassQuery);

                if (overpassData) {
                    for (const el of overpassData.elements) {
                        if (!el.lat || !el.lon) continue;
                        const type: MarkerData["type"] =
                            el.tags?.tourism === "museum" ? "musee" :
                                el.tags?.tourism === "gallery" ? "galerie" : "centre";
                        const markerEl = createMarkerEl(type);
                        const popup = new maplibregl.Popup().setHTML(
                            `<div class="map-popup"><strong>${el.tags?.name ?? "Lieu culturel"}</strong><br/><span>${el.tags?.tourism ?? el.tags?.amenity ?? ""}</span></div>`
                        );
                        const marker = new maplibregl.Marker({ element: markerEl })
                            .setLngLat([el.lon, el.lat])
                            .setPopup(popup)
                            .addTo(map);
                        markersRef.current.push({ marker, type });
                    }
                }

                try {
                    const eventsRes = await fetch(
                        `${import.meta.env.VITE_API_URL ?? ""}/api/events?lat=${latitude}&lon=${longitude}`
                    );
                    const eventsData = await eventsRes.json();
                    for (const ev of eventsData.events ?? []) {
                        const lat = ev.location?.latitude;
                        const lon = ev.location?.longitude;
                        if (!lat || !lon) continue;
                        const title = ev.title?.fr ?? ev.title?.en ?? "Événement";
                        const markerEl = createMarkerEl("evenement");
                        const popup = new maplibregl.Popup().setHTML(
                            `<div class="map-popup"><strong>${title}</strong><br/><span>Événement</span></div>`
                        );
                        const marker = new maplibregl.Marker({ element: markerEl })
                            .setLngLat([lon, lat])
                            .setPopup(popup)
                            .addTo(map);
                        markersRef.current.push({ marker, type: "evenement" });
                    }
                } catch { }
            },
            () => {
                setError("Impossible d'accéder à votre position.");
                setLoading(false);
            }
        );

        return () => mapRef.current?.remove();
    }, []);

    return (
        <main className="map-page">
            <h1 className="map-title">Autour de vous</h1>
            <p className="map-subtitle">Musées, galeries et événements artistiques près de chez vous</p>
            {loading && <p className="map-loading">Chargement de la carte...</p>}
            {error && <p className="map-error">{error}</p>}
            <div className="map-filters">
                {FILTERS.map(f => (
                    <button
                        key={f.key}
                        type="button"
                        className={`map-filter-btn ${activeFilter === f.key ? "active" : ""}`}
                        onClick={() => applyFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <div className="map-legend">
                <span className="legend-item"><span className="dot" style={{ backgroundColor: "#bf7b69" }} /> Musées</span>
                <span className="legend-item"><span className="dot white" /> Galeries</span>
                <span className="legend-item"><span className="dot" style={{ backgroundColor: "#7b7979" }} /> Centres d'art</span>
                <span className="legend-item"><span className="dot" style={{ backgroundColor: "#d4af37" }} /> Événements</span>
            </div>
            <div ref={mapContainer} className="map-container" />
        </main>
    );
}

export default Map;
