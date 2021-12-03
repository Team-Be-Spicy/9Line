import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography} from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import mgrs from "mgrs";
import {data} from '../Dummy-data.js';
import ReactDOM from "react-dom"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Popup = ({responder, status}) => {
    return(
        <Box>
            <Box sx={{display: 'flex', alignItems:"baseline"}}  marginBottom='6px' >
                <Box sx={{display:"flex", justifyContent:"end"}}>
                    <Typography fontWeight={'bolder'} fontSize={"14px"} >
                        Responder: &nbsp;
                    </Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Typography fontSize={"16px"}>
                        {responder || "N/A"}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{display: 'flex', alignItems:"baseline"}}  marginBottom='6px' >
                <Box sx={{display:"flex", justifyContent:"end"}}>
                    <Typography fontWeight={'bolder'} fontSize={"14px"} >
                        Status: &nbsp;
                    </Typography>
                </Box>
                <Box sx={{display:"flex"}}>
                    <Typography fontSize={"16px"}>
                        {status}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const ReportMap = ({requests}) => {
    const STYLE_URL = "mapbox://styles/egorkra/ckwnsh9qu2f2o15obo0qo2fjc";

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15, closeButton: false, closeOnClick: false }))

    const convertMgrsToLatLng = (mgrsString) => mgrs.toPoint(mgrsString);

    const createPoints = () => {
        let points = [];

        requests.map(point => {
            points.push(
                {
                    'type': 'Feature',
                    'properties': {
                        'responder': point.responder,
                        'status': point.status

                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': convertMgrsToLatLng(point.location)
                    }
                },
            );
        })
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
                    'circle-color': [
                        'match',
                        ['get', 'status'],
                        'Pending',
                        '#ff0000',
                        'Complete',
                        '#33cc33',
                        'Assigned',
                        '#FFA500',
                        '#000000'
                    ],
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });



            map.current.on('mouseenter', 'places', (e) => {

                map.current.getCanvas().style.cursor = 'pointer';


                const coordinates = e.features[0].geometry.coordinates.slice();
                const responder = e.features[0].properties.responder;
                const status = e.features[0].properties.status;


                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const popupNode = document.createElement("div");
                ReactDOM.render(<Popup status={status} responder={responder}/>, popupNode);

                popUpRef.current.setLngLat(coordinates).setDOMContent(popupNode).addTo(map.current);
            });

            map.current.on('mouseleave', 'places', () => {
                map.current.getCanvas().style.cursor = '';
                popUpRef.current.remove();
            });
        });

    }, []);

    return (
        <div
            ref={mapContainer}
            style={{width: "100%", height: "100%", borderRadius: '15px'}}
        />

    );
}


export default ReportMap;