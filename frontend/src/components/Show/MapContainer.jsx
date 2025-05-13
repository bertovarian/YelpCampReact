import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = ({ coordinates }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        if (!coordinates || !mapContainerRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: coordinates,
            zoom: 10,
        });

        // Add navigation controls (zoom and compass)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Optional: Add fullscreen control
        map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

        // Add a marker at the campground's location
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

        return () => map.remove(); // Cleanup on unmount
    }, [coordinates]);

    return <div className="map-container" ref={mapContainerRef} style={{ height: '250px', width: '100%' }} />;
};

export default MapContainer;