import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useRef} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWdvcmtyYSIsImEiOiJja21uMXk5OHMwdTN4Mm9wbDVpOXllcGY0In0.ZheSrkcBpR9hmpfG0qW5EQ';

export default function MapModal({open, handleClose}) {
    return (
        <Dialog maxWidth onClose={handleClose} open={open}>
            <DialogTitle sx={{m: 0, p: 1.5}}>Select a location
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <MapboxWrapper/>
        </Dialog>
    );
}

const MapboxWrapper = () => {
    const STYLE_URL = "mapbox://styles/egorkra/ckwnsh9qu2f2o15obo0qo2fjc";

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: STYLE_URL,
            center: [-70.9, 42.35],
            zoom: 10,
        });

        map.current.on('load', () => {

            function onDragEnd() {
                const lngLat = marker.getLngLat();
            }

            const marker = new mapboxgl.Marker({
                draggable: true
            })
                .setLngLat([0, 0])
                .addTo(map.current);


            marker.on('dragend', onDragEnd);
        });


    }, [])

    return (
        <>
            <DialogContent sx={{alignContent: "center", padding: 0, marginLeft: 1.5, marginRight: 1.5, marginBottom: 1.5}}>
                <div ref={mapContainer} style={{height: "800px", width: "800px", borderRadius: '25px' }}/>
            </DialogContent>
        </>);
}