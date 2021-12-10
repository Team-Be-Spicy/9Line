import {
    Alert,
    Box, Checkbox,
    Container,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel, IconButton,
    MenuItem, Radio, RadioGroup,
    Select,
    TextField, Typography, useMediaQuery
} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import Button from "@mui/material/Button";
import {useEffect, useState, useRef} from "react";
import {checkUserRole, submitForm} from "../service/service";
import DetailModal from "../component/DetailModal";
import CloseIcon from "@mui/icons-material/Close";
import {
    ENEMY_IN_AREA_ESCORT_REQUIRED,
    ENEMY_IN_AREA_PROCEED_WITH_CAUTION,
    NO_ENEMY_TROOPS_IN_AREA,
    POSSIBLE_ENEMY_TROOPS,
    AMBULATORY_PATIENT_NUMBER, LITTER_PATIENT_NUMBER, PATIENT_NUMBER_NOT_VALID
} from "../constant/RequestConstants";
import mgrs from "mgrs";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MapIcon from '@mui/icons-material/Map';
import MapModal from "../component/MapModal";
import {useAuth0} from "@auth0/auth0-react";
import {getRoles} from "@testing-library/react";
import {useNavigate} from "react-router-dom";

const Requester = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [alert, setAlert] = useState(false);
    const {reset, control, handleSubmit, setValue, formState: {errors}} = useForm();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isNavigatorApiAvailable, setIsNavigatorApiAvailable] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    const {isAuthenticated,getAccessTokenWithPopup,getAccessTokenSilently,isLoading} = useAuth0();
    const options = {scope: "read:requests assign:requests", audience: "https://egor-dev.com"};
    let navigate = useNavigate();

    useEffect(() => {
        getCurrentLocation();

    }, []);

    // useEffect(async () => {
    //     const response = await checkUserRole(await getToken());
    //     if(isAuthenticated && !isLoading){
    //         console.log(response.data);
    //         if (response.data.includes("SCOPE_assign:requests")){
    //             console.log("dispatcher");
    //             navigate("/dispatcher")
    //         }else if (response.data.includes("SCOPE_read:requests")){
    //             console.log("responder");
    //             navigate("/responder")
    //         }
    //     }
    // }, [isAuthenticated,isLoading]);

    const getToken = async () => {
        let token = "";
        try {
            token = await getAccessTokenSilently(options);
        }catch{
            token = await getAccessTokenWithPopup(options);
        }
        console.log(token);
        return token;
    }

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(position => {
                const mgrsLocation = mgrs.forward([position.coords.longitude, position.coords.latitude,], 5);
                setLocation(mgrsLocation)
                setLoading(false);
                setIsNavigatorApiAvailable(true);
            }, () => {
                console.error("Error getting your location");
                setLoading(false);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            setIsNavigatorApiAvailable(false);
            setLoading(false);
        }
    }

    const setLocation = (mgrsLocation) => {
        setValue('location', mgrsLocation);
    }

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = async (data) => {
        const newData = {
            ...data,
            equipment: ((data.equipment.length === 0) ? 'None' : data.equipment.join(', ')),
            status: 'Pending',
            date: new Date()
        };
        console.log(newData);
        try {
            await submitForm(newData);
            setAlert(true);
            setData(newData);
            reset({
                location: '',
                callSign: '',
                urgent: 0,
                urgentSurgical: 0,
                priority: 0,
                routine: 0,
                equipment: [],
                litter: '',
                ambulatory: '',
                security: NO_ENEMY_TROOPS_IN_AREA,
                marking: false,
                national: 'US Military',
                line9: 'None'
            });
            setSelectedItems([]);
        } catch (e) {
            console.log(e);
        }
    };


    const handleSelect = (value) => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item) => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems((prevItems) => [...prevItems, value]);
        }
    };

    useEffect(() => {
        setValue('equipment', selectedItems);
    }, [selectedItems]);

    const equipmentOptions = [
        {
            label: "None",
            "data-cy": "eqNone",
        },
        {
            label: "Hoist",
            "data-cy": "eqHoist",
        },
        {
            label: "Extraction Equipment",
            "data-cy": "eqExtraction",
        },
        {
            label: "Ventilator",
            "data-cy": "eqVentilator",
        },
    ];

    const markingOptions = [
        {
            label: "Panels",
            "data-cy":"mkPanels",
        },
        {
            label: "Pyrotechnic signal",
            "data-cy":"mkPyro",
        },
        {
            label: "Smoke signal",
            "data-cy":"mkSmoke",
        },
        {
            label: "None",
            "data-cy":"mkNone",
        },
        {
            label: "Other",
            "data-cy":"mkOther",
        },
    ];


    return (
        <div>
            {isMapOpen &&
                <MapModal setLocation={setLocation} open={isMapOpen} handleClose={() => setIsMapOpen(false)}/>}
            {alert &&
                <Alert sx={{marginBottom: '28px', display: 'flex', alignItems: 'center'}} severity="success" action={
                    <Box sx={{display: 'flex', flexWrap: 'no-wrap'}}>
                        <Button data-cy="btnViewDetails" color="success" onClick={handleClickOpen}>View Details</Button>
                        <IconButton
                            color='success'
                            onClick={() => setAlert(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                }><p data-cy="alertSuccess">Request Submitted. A dispatcher will contact you soon.</p></Alert>}

            <Container maxWidth="sm">
                <Typography fontSize="40px" fontWeight="200" paddingBottom="20px" color="text.primary">MEDEVAC Request Form</Typography>
                <form>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{display: 'flex', justifyContent: 'stretch'}}>
                            <Controller
                                defaultValue=""
                                name='location'
                                control={control}
                                rules={{required: "Location is required"}}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        data-cy="location"
                                        sx={{width: '100%'}}
                                        error={!!error}
                                        helperText={error ? error.message : loading ? 'Getting location...' : null}
                                        margin="dense"
                                        onChange={onChange}
                                        value={value}
                                        label="Location"/>
                                )}
                            />
                            <IconButton disabled={!isNavigatorApiAvailable} onClick={() => getCurrentLocation()}
                                        sx={{marginLeft: '6px'}} color="warning"
                                        size="large">
                                <PersonPinIcon fontSize="large"/>
                            </IconButton>
                            <IconButton
                                onClick={() => setIsMapOpen(true)}
                                sx={{marginLeft: '6px'}} color="primary" size="large">
                                <MapIcon fontSize="large"/>
                            </IconButton>
                        </Box>
                        <Controller
                            defaultValue=''
                            name='callSign'
                            control={control}
                            rules={{required: "Radio Freq/ Call Sign/ Suffix is required"}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    data-cy="radio"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label="Radio Frequency/ Call Sign/ Suffix"/>
                            )}
                        />
                    </Box>

                    <Box sx={{display: 'flex',
                        marginTop: '16px',
                        flexDirection: (isSmallScreen ? 'column' : 'row'),
                        gap: '16px'}
                    }>
                        <Controller
                            defaultValue='0'
                            name='urgent'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) =>
                                <TextField
                                    data-cy="urgentPatient"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    label="Urgent"
                                    type="number"
                                    onChange={onChange}
                                    value={value}
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    fullWidth
                                />}
                        />
                        <Controller
                            defaultValue='0'
                            name='urgentSurgical'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,

                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) =>
                                <TextField
                                    data-cy="urgentSurgPatient"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    label="Urgent Surgical"
                                    type="number"
                                    onChange={onChange}
                                    value={value}
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    fullWidth
                                />}
                        />
                        <Controller
                            defaultValue='0'
                            name='priority'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,

                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) =>
                                <TextField
                                    data-cy="priorityPatient"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    label="Priority"
                                    type="number"
                                    onChange={onChange}
                                    value={value}
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    fullWidth
                                />}
                        />
                        <Controller
                            defaultValue='0'
                            name='routine'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,

                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) =>
                                <TextField
                                    data-cy="routinePatient"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    label="Routine"
                                    type="number"
                                    onChange={onChange}
                                    value={value}
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    fullWidth
                                />}
                        />

                    </Box>


                    <Box sx={{marginTop: '16px'}}>
                        <FormControl>
                            <FormLabel>Special Equipment</FormLabel>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {equipmentOptions.map((option) => {
                                    return (
                                        <FormControlLabel
                                            labelPlacement='end'
                                            control={
                                                <Controller
                                                    name="equipment"
                                                    render={() =>
                                                        <Checkbox
                                                            data-cy={option["data-cy"]}
                                                            checked={selectedItems.includes(option.label)}
                                                            onChange={() => handleSelect(option.label)}
                                                        />
                                                    }
                                                    control={control}
                                                />
                                            }
                                            sx={{color: 'text.primary'}}
                                            label={option.label}
                                            key={option.label}
                                        />
                                    );
                                })}
                            </div>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        marginTop: '8px',
                        flexDirection: (isSmallScreen ? 'column' : 'row'),
                        gap: (isSmallScreen ? '0' : '16px')
                    }}>
                        <Controller
                            defaultValue=''
                            name='litter'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,

                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    data-cy="litterPatient"
                                    error={!!error}
                                    helperText={error ? PATIENT_NUMBER_NOT_VALID : null}
                                    sx={{width: '100%'}}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label={LITTER_PATIENT_NUMBER}/>
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name='ambulatory'
                            control={control}
                            rules={{
                                pattern: /^[0-9]\d*$/i,
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    data-cy="ambulatoryPatient"
                                    error={!!error}
                                    helperText={error ? PATIENT_NUMBER_NOT_VALID : null}
                                    sx={{width: '100%'}}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label={AMBULATORY_PATIENT_NUMBER}/>
                            )}
                        />
                    </Box>
                    <Box sx={{marginTop: (isSmallScreen ? '8px' : '16px')}}>
                        <Controller
                            defaultValue={NO_ENEMY_TROOPS_IN_AREA}
                            control={control}
                            name='security'
                            render={({field: {onChange, value}}) => (
                                <Select data-cy="securitySelect" sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value={NO_ENEMY_TROOPS_IN_AREA}>
                                        {NO_ENEMY_TROOPS_IN_AREA}
                                    </MenuItem>
                                    <MenuItem
                                        data-cy="securityPossible"
                                        value={POSSIBLE_ENEMY_TROOPS}>
                                        {POSSIBLE_ENEMY_TROOPS}
                                    </MenuItem>
                                    <MenuItem
                                        data-cy="securityCaution"
                                        value={ENEMY_IN_AREA_PROCEED_WITH_CAUTION}>
                                        {ENEMY_IN_AREA_PROCEED_WITH_CAUTION}
                                    </MenuItem>
                                    <MenuItem
                                        data-cy="securityEscort"
                                        value={ENEMY_IN_AREA_ESCORT_REQUIRED}>
                                        {ENEMY_IN_AREA_ESCORT_REQUIRED}
                                    </MenuItem>
                                </Select>
                            )}
                        />
                    </Box>

                    <Box sx={{marginTop: '16px'}}>
                        <Controller
                            defaultValue={false}
                            name='marking'
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <FormControl
                                    error={!!error}>
                                    <RadioGroup
                                        value={value}
                                        onChange={onChange}>
                                        <FormLabel>Marking Equipment</FormLabel>
                                        {markingOptions.map(singleOption =>
                                            <FormControlLabel
                                                data-cy={singleOption["data-cy"]}
                                                key={singleOption.label}
                                                value={singleOption.label}
                                                label={singleOption.label}
                                                sx={{color: 'text.primary'}}
                                                control={<Radio/>}
                                            />)}
                                    </RadioGroup>
                                    <FormHelperText>{error ? "Select Marking" : null}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Box>

                    <Box sx={{marginTop: '16px'}}>
                        <Controller
                            defaultValue="US Military"
                            control={control}
                            name='national'
                            render={({field: {onChange, value}}) => (
                                <Select
                                    data-cy="selNationality"
                                    sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem

                                        value='US Military'>
                                        US Military
                                    </MenuItem>
                                    <MenuItem
                                        data-cy="natCivilian"
                                        value='US Civilian'>
                                        US Civilian
                                    </MenuItem>
                                    <MenuItem value='Non-US Military'>
                                        Non-US Military
                                    </MenuItem>
                                    <MenuItem value='Non-US Civilian'>
                                        Non-US Civilian
                                    </MenuItem>
                                    <MenuItem value='EPW'>
                                        EPW
                                    </MenuItem>
                                </Select>
                            )}
                        />
                    </Box>
                    <Box sx={{marginTop: '16px'}}>
                        <Controller
                            defaultValue="None"
                            control={control}
                            name='line9'
                            render={({field: {onChange, value}}) => (
                                <Select
                                    data-cy="selNBC"
                                    sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value='None'>
                                        None
                                    </MenuItem>
                                    <MenuItem value='Nuclear'>
                                        Nuclear
                                    </MenuItem>
                                    <MenuItem
                                        data-cy="nbcBio"
                                        value='Biological'>
                                        Biological
                                    </MenuItem>
                                    <MenuItem value='Chemical'>
                                        Chemical
                                    </MenuItem>
                                </Select>
                            )}
                        />
                    </Box>
                    <Box onClick={() => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }} sx={{display: 'flex', justifyContent: 'end', marginY: '28px'}}>
                        <Button data-cy="btnSubmit" variant='contained' color="success" onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Box>
                </form>
            </Container>
            <DetailModal
                open={open}
                data={data}
                handleClose={handleClose}/>
        </div>
    )
}

export default Requester;

