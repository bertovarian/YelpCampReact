import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapWithClusters = ({ campsites }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!campsites) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-103.59179687498357, 40.66995747013945],
            zoom: 1,
        });

        map.on('load', () => {
            map.addSource('campgrounds', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: campsites.map((camp) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: camp.geometry.coordinates,
                        },
                        properties: {
                            popUpMarkup: `<strong>${camp.title}</strong><p>${camp.location}</p><a href="/campgrounds/${camp._id}">${camp.title}</a>`,
                        },
                    })),
                },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50,
            });

            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'campgrounds',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#00BCD4',
                        10,
                        '#2196F3',
                        30,
                        '#3F51B5',
                    ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        15,
                        10,
                        20,
                        30,
                        25,
                    ],
                },
            });

            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'campgrounds',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                },
            });

            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'campgrounds',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                },
            });

            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters'],
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('campgrounds').getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom,
                    });
                });
            });

            map.on('click', 'unclustered-point', (e) => {
                const { popUpMarkup } = e.features[0].properties;
                const coordinates = e.features[0].geometry.coordinates.slice();

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(popUpMarkup)
                    .addTo(map);
            });

            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        });

        return () => map.remove();
    }, [campsites]);

    return <div ref={mapContainerRef} className="map-container" style={{ height: '300px' }} />;
};

export default MapWithClusters;