'use client';

import React, { useEffect, useRef } from 'react';

/**
 * NetworkSection Component
 * 
 * Shows the Solmex network with an interactive Leaflet map
 */
export default function NetworkSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Wait for Leaflet to be available
    const initMap = () => {
      if (typeof (window as any).L === 'undefined') {
        setTimeout(initMap, 100);
        return;
      }

      const L = (window as any).L;

      // Create custom minimal dark tile layer
      const minimalDark = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        tileSize: 256,
        zoomOffset: 0,
        opacity: 0.8,
      });

      // Initialize map centered on North America
      const map = L.map(mapContainerRef.current!, {
        center: [35.0, -100.0],
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: false,
        layers: [minimalDark],
      });

      // Apply filter to tiles
      map.on('tileload', function (e: any) {
        const img = e.tile;
        img.style.filter = 'brightness(0.7) contrast(1.5) saturate(0.9)';
      });

      // Process tiles to make water transparent
      map.on('tileload', function (e: any) {
        const img = e.tile;

        if (img.complete) {
          makeWaterTransparent(img);
        } else {
          img.onload = function () {
            makeWaterTransparent(img);
          };
        }
      });

      // Function to make water areas transparent
      function makeWaterTransparent(img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width || 256;
        canvas.height = img.height || 256;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Detect blue/cyan water pixels
          if (b > r && b > g && b > 100) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }

        ctx.putImageData(imageData, 0, 0);
        img.src = canvas.toDataURL();
      }

      // Terminal coordinates
      const terminals = [
        {
          name: 'CDMX',
          subtitle: 'Hub Central',
          coords: [19.432608, -99.133209],
          type: 'hub',
          description: 'Centro de coordinación principal de la red Solmex',
        },
        {
          name: 'Guadalajara',
          subtitle: 'Hub Occidente',
          coords: [20.659698, -103.349609],
          type: 'hub',
          description: 'Terminal estratégica para el occidente de México',
        },
        {
          name: 'Veracruz',
          subtitle: 'Puerto Principal',
          coords: [19.173773, -96.134224],
          type: 'terminal',
          description: 'Terminal portuaria con conexión ferroviaria',
        },
        {
          name: 'Monterrey',
          subtitle: 'Hub Norte',
          coords: [25.686614, -100.316112],
          type: 'hub',
          description: 'Centro logístico del norte de México',
        },
        {
          name: 'Colima',
          subtitle: 'Terminal Pacífico',
          coords: [19.243333, -103.724722],
          type: 'terminal',
          description: 'Terminal estratégica en la costa del Pacífico',
        },
      ];

      // Create custom animated sparkling icon
      function createCustomIcon(type: string) {
        const size = 32;
        const pulseSize = size * 2;

        const iconHtml = `
          <div style="
            position: relative;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${type === 'hub' ? 'var(--gradient-primary)' : 'var(--gradient-secondary)'};
            border: 2px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 20px ${type === 'hub' ? 'rgba(255, 156, 55, 0.6)' : 'rgba(255, 216, 28, 0.6)'};
            animation: pulse 2s infinite;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: ${size * 0.6}px;
              height: ${size * 0.6}px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.9);
            "></div>
          </div>
        `;

        return L.divIcon({
          html: iconHtml,
          className: 'custom-marker',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
          popupAnchor: [0, -size / 2],
        });
      }

      // Add markers
      terminals.forEach((terminal) => {
        const marker = L.marker([terminal.coords[0], terminal.coords[1]], {
          icon: createCustomIcon(terminal.type),
          draggable: false,
          title: terminal.name,
        }).addTo(map);

        const popupContent = `
          <div style="font-family: 'Inter', sans-serif;">
            <h3 style="margin: 0 0 0.25rem 0; font-size: 1rem; font-weight: 700; color: #FF9C37; font-family: 'Space Grotesk', sans-serif;">${terminal.name}</h3>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.75rem; color: rgba(249, 250, 251, 0.7);">${terminal.subtitle}</p>
            <p style="margin: 0; font-size: 0.875rem; color: rgba(249, 250, 251, 0.9); line-height: 1.5;">${terminal.description}</p>
          </div>
        `;

        marker.bindPopup(popupContent);
      });

      // Major North American rail network routes by company
      // Based on actual rail corridors across North America
      const railNetworks = {
        'UNION PACIFIC': {
          color: '#FFD700', // Yellow
          routes: [
            // West Coast to Texas corridor
            [[47.6062, -122.3321], [45.5152, -122.6784], [39.7392, -104.9903], [32.7767, -96.7970], [29.7604, -95.3698]],
            // Pacific Northwest to Gulf Coast
            [[47.6062, -122.3321], [41.8781, -87.6298], [35.2271, -80.8431], [30.2672, -97.7431], [29.7604, -95.3698]],
            // Central corridor through Texas
            [[39.7392, -104.9903], [35.2271, -80.8431], [32.7767, -96.7970], [29.7604, -95.3698]],
            // Texas to Mexico border
            [[29.7604, -95.3698], [25.6866, -100.3161], [19.4326, -99.1332]],
          ],
        },
        'BNSF': {
          color: '#FF8C00', // Orange
          routes: [
            // West Coast to Midwest
            [[47.6062, -122.3321], [45.5152, -122.6784], [39.7392, -104.9903], [41.8781, -87.6298]],
            // Southwest to Texas
            [[34.0522, -118.2437], [33.4484, -112.0740], [32.7767, -96.7970], [29.7604, -95.3698]],
            // Texas to Mexico
            [[32.7767, -96.7970], [25.6866, -100.3161], [20.6597, -103.3496]],
          ],
        },
        'NORFOLK SOUTHERN': {
          color: '#000000', // Black
          routes: [
            // Great Lakes to Atlantic
            [[41.8781, -87.6298], [40.7128, -74.0060], [39.9526, -75.1652], [36.8529, -76.2859]],
            // Midwest to Southeast
            [[41.8781, -87.6298], [38.2527, -85.7585], [35.2271, -80.8431], [30.3322, -81.6557]],
            // Northeast corridor
            [[42.3601, -71.0589], [40.7128, -74.0060], [39.9526, -75.1652], [38.9072, -77.0369]],
          ],
        },
        'CSX': {
          color: '#9370DB', // Purple
          routes: [
            // Northeast to Florida
            [[40.7128, -74.0060], [39.9526, -75.1652], [35.2271, -80.8431], [30.3322, -81.6557], [25.7617, -80.1918]],
            // Midwest to Southeast
            [[41.8781, -87.6298], [38.2527, -85.7585], [35.2271, -80.8431], [30.3322, -81.6557]],
            // Atlantic corridor
            [[40.7128, -74.0060], [39.2904, -76.6122], [36.8529, -76.2859], [30.3322, -81.6557]],
          ],
        },
        'FERROMEX': {
          color: '#00FF00', // Green
          routes: [
            // Central Mexico to US border
            [[19.4326, -99.1332], [25.6866, -100.3161], [32.7767, -96.7970]],
            // Pacific coast corridor
            [[20.6597, -103.3496], [19.2433, -103.7247], [19.4326, -99.1332]],
            // Central to Gulf
            [[19.4326, -99.1332], [19.1738, -96.1342], [25.6866, -100.3161]],
            // West to Central
            [[20.6597, -103.3496], [19.4326, -99.1332]],
          ],
        },
        'FERROSUR': {
          color: '#8B0000', // Dark Red
          routes: [
            // Southern Mexico corridor
            [[19.4326, -99.1332], [19.1738, -96.1342], [16.8634, -99.8901], [20.6843, -88.5678]],
            // Gulf to Yucatan
            [[19.1738, -96.1342], [18.4674, -95.2408], [20.6843, -88.5678]],
            // Pacific to Central
            [[16.8634, -99.8901], [19.4326, -99.1332]],
          ],
        },
      };

      // Add rail network routes as a new layer
      Object.entries(railNetworks).forEach(([company, network]) => {
        network.routes.forEach((route) => {
          L.polyline(route as [number, number][], {
            color: network.color,
            weight: 3,
            opacity: 0.7,
            smoothFactor: 1.0,
          }).addTo(map);
        });
      });

      // Fit map to show North America (including terminals and rail networks)
      const allPoints: [number, number][] = [
        ...terminals.map((t) => [t.coords[0], t.coords[1]] as [number, number]),
        // Add key points from rail networks
        [47.6062, -122.3321], // Seattle
        [40.7128, -74.0060], // New York
        [29.7604, -95.3698], // Houston
        [20.6843, -88.5678], // Yucatan
      ];
      
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [80, 80] });

      mapRef.current = map;
    };

    // Initialize map when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(initMap, 300);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const networkFeatures = [
    'Terminales alineadas a un mismo estándar',
    'Operadores validados y auditados',
    'Integración gradual con tecnología Solmex',
    'Expansión bajo demanda del cliente',
  ];

  return (
    <section className="section section-alt" id="network" ref={sectionRef}>
      <div className="container">
        <div className="network-grid">
          <div className="reveal-left">
            <p className="section-eyebrow">Red Solmex</p>
            <h2 className="section-title font-display">Nuestra red de terminales</h2>
            <p className="section-description" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              Tejemos una red de operadores certificados en puntos estratégicos del país, 
              posicionados estratégicamente para aprovechar las principales redes ferroviarias 
              de Norteamérica y facilitar la distribución eficiente de carga.
            </p>

            <ul className="network-features">
              {networkFeatures.map((feature, index) => (
                <li key={index} className="network-feature">
                  <div className="network-check">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <span style={{ color: 'var(--solmex-text-muted)' }}>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="glass network-emphasis">
              <div className="network-emphasis-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div>
                <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                  Estamos seleccionando operadores de alto nivel para integrarse a la red Solmex.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--solmex-text-muted)' }}>
                  Únase a la red logística más confiable de México.
                </p>
              </div>
            </div>
          </div>

          <div className="glass network-map reveal-right" style={{ padding: '1.5rem' }}>
            <div
              ref={mapContainerRef}
              id="solmexMap"
              style={{ borderRadius: '0.75rem', overflow: 'hidden', minHeight: '400px' }}
            ></div>

            <div className="map-legend">
              <div className="map-legend-title">Leyenda</div>
              <div className="map-legend-items">
                <div className="map-legend-item">
                  <div className="map-legend-dot hub"></div>
                  <span>Hub Central</span>
                </div>
                <div className="map-legend-item">
                  <div className="map-legend-dot"></div>
                  <span>Terminales</span>
                </div>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="map-legend-title" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  Redes Ferroviarias
                </div>
                <div className="map-legend-items">
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#FFD700',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>Union Pacific</span>
                  </div>
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#FF8C00',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>BNSF</span>
                  </div>
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#000000',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>Norfolk Southern</span>
                  </div>
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#9370DB',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>CSX</span>
                  </div>
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#00FF00',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>Ferromex</span>
                  </div>
                  <div className="map-legend-item">
                    <div
                      style={{
                        width: '1.5rem',
                        height: '3px',
                        background: '#8B0000',
                        borderRadius: '2px',
                      }}
                    ></div>
                    <span style={{ fontSize: '0.75rem' }}>Ferrosur</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass network-emphasis" style={{ marginTop: '1rem', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{ 
                  width: '1.5rem', 
                  height: '1.5rem', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 156, 55, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '0.125rem'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#FF9C37' }}>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div>
                  <p style={{ 
                    fontWeight: 600, 
                    marginBottom: '0.25rem', 
                    fontSize: '0.875rem',
                    color: 'var(--solmex-text-primary)'
                  }}>
                    Servicios ferroviarios son más costo efectivos
                  </p>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--solmex-text-muted)',
                    lineHeight: '1.4'
                  }}>
                    Son más seguros y mueven mayor volumen, posicionando estratégicamente nuestras terminales para distribución eficiente en toda Norteamérica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

