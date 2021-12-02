import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import mgrs from "mgrs";
import {data} from '../Dummy-data.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const ReportMap = () => {
    const STYLE_URL = "mapbox://styles/egorkra/ckwnsh9qu2f2o15obo0qo2fjc";

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    const convertMgrsToLatLng = (mgrsString) => mgrs.toPoint(mgrsString);

    const createPoints = () => {
        let points = [];

        data.map(point => {
            points.push(
                {
                    'type': 'Feature',
                    'properties': {
                        'description': document.createElement(<div style={{height: '50px', width: '50px', bgColor: 'red'}}/>);

                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': convertMgrsToLatLng(point.location)
                    }
                },
            );
        })
        console.log(points);
        return points;
    }

    useEffect(() => {
        setMapLoaded(false);
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: STYLE_URL,
            center: convertMgrsToLatLng("43SBR1899486017"),
            zoom: 15,
        });


        map.current.on('load', () => {
            map.current.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': createPoints(),
                },
            });

            map.current.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                'paint': {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });


            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.current.on('mouseenter', 'places', (e) => {

                map.current.getCanvas().style.cursor = 'pointer';


                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;


                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }


                popup.setLngLat(coordinates).setDOMContent(React.render(description)).addTo(map.current);
            });

            map.current.on('mouseleave', 'places', () => {
                map.current.getCanvas().style.cursor = '';
                popup.remove();
            });
        });

    }, []);

    return (
        <div
            ref={mapContainer}
            style={{width: "500px", height: "500px"}}
        />

    );
}


export default ReportMap;