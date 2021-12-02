import {
    AppBar,
    Button, CircularProgress,
    Dialog,
    DialogContent,
    IconButton,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import CloseIcon from "@mui/icons-material/Close";
import {forwardRef, useEffect, useRef, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mgrs from "mgrs";
import Box from "@mui/material/Box";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MapModal({open, handleClose, setLocation}) {
    return (
        <Dialog fullScreen TransitionComponent={Transition} onClose={handleClose} open={open}>
            <MapboxWrapper handleClose={handleClose} setLocation={setLocation}/>
        </Dialog>
    );
}

const MapboxWrapper = ({handleClose, setLocation}) => {
    const STYLE_URL = "mapbox://styles/egorkra/ckwnsh9qu2f2o15obo0qo2fjc";

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [markerLocation, setMarkerLocation] = useState('');

    const convertMarkerLocation = (lngLatLocation) => {
        setMarkerLocation(mgrs.forward(lngLatLocation, 5))
    }

    const initializeMap = (mapCenter) => {
        setMapLoaded(false);
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: STYLE_URL,
            center: mapCenter,
            zoom: 17,
        });
        convertMarkerLocation(mapCenter);

        map.current.on('load', () => {

            function onDragEnd() {
                const lngLat = marker.getLngLat();
                convertMarkerLocation([lngLat.lng, lngLat.lat]);
            }

            const marker = new mapboxgl.Marker({draggable: true})
                .setLngLat(mapCenter)
                .addTo(map.current);


            marker.on('dragend', onDragEnd);
            setMapLoaded(true);
        });
    }

    useEffect(() => {
        if (map.current) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                initializeMap([position.coords.longitude, position.coords.latitude]);
            }, () => {
                console.error("Error getting your location");
                initializeMap([69.154956, 34.536558]);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            initializeMap([69.154956, 34.536558]);
        }

    }, [])

    return (
        <>
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Drag marker to HLZ
                    </Typography>
                    <Button autoFocus variant="outlined" disabled={!mapLoaded} color="inherit" onClick={() => {
                        setLocation(markerLocation);
                        handleClose();
                    }}>
                        Set Location
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent
                sx={{alignContent: "center", padding: 0, margin: 0}}>
                <Box ref={mapContainer} sx={{
                    width: "100%",
                    height: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {!mapLoaded && <CircularProgress size={150}/>}
                </Box>
            </DialogContent>
        </>
    );
}