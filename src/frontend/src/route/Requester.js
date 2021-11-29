import {
    Alert,
    Box, Checkbox,
    Container,
    FormControl,
    FormControlLabel, FormHelperText,
    FormLabel, IconButton,
    MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {Typography} from '@mui/material';
import {useForm, Controller} from "react-hook-form";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {submitForm} from "../service/service";
import DetailModal from "../component/DetailModal";
import CloseIcon from "@mui/icons-material/Close";

const Requester = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [alert, setAlert] = useState(false);
    const {register, reset, control, handleSubmit, setValue, formState: {errors}} = useForm();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data) => {
        const newData = {
            ...data,
            equipment: ((data.equipment.length === 0) ? 'None' : data.equipment.join(', ')),
            status: 'Pending'
        };
        console.log(newData);
        try {
            await submitForm(newData);
            setAlert(true);
            setData(newData);
            reset({
                location: '',
                callSign: '',
                totalPatient: '0',
                precedence: 'Urgent',
                equipment: [],
                litter: '',
                ambulatory: '',
                security: 'No Enemy troop in area',
                marking: false,
                national: 'US Military',
                line9: 'Nuclear'
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
        },
        {
            label: "Hoist",
        },
        {
            label: "Extraction Equipment",
        },
        {
            label: "Ventilator",
        },
    ];

    const markingOptions = [
        {
            label: "Panels",
        },
        {
            label: "Pyrotechnic signal",
        },
        {
            label: "Smoke signal",
        },
        {
            label: "None",
        },
        {
            label: "Other",
        },
    ];

    return (
        <>
            {alert && <Alert sx={{marginBottom: '28px'}} severity="success" action={
                <Box>
                    <Button color="success" onClick={handleClickOpen}>View Details</Button>
                    <IconButton
                        color='success'
                        onClick={() => setAlert(false)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            }>Request Submitted. A dispatcher will contact you soon.</Alert>}

            <Container maxWidth="sm">
                <h1>MEDEVAC Request Form</h1>
                <form>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Controller
                            defaultValue=''
                            name='location'
                            control={control}
                            rules={{required: "Location is required"}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField error={!!error}
                                           helperText={error ? error.message : null}
                                           margin="dense"
                                           onChange={onChange}
                                           value={value}
                                           label="Location"/>
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name='callSign'
                            control={control}
                            rules={{required: "Radio Freq/Call Sign/Suffix is required"}}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label="Radio Frequency/ Call Sign/ Suffix"/>
                            )}
                        />
                    </Box>

                    <Box sx={{display: 'flex', alignItems: 'flex-start', marginTop: '16px'}}>
                        <Controller
                            defaultValue='0'
                            name='totalPatient'
                            control={control}
                            rules={{
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    max: v => parseInt(v) <= 9999,
                                },
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    error={!!error}
                                    helperText={error ? 'Patient number not valid' : null}
                                    sx={{marginRight: '16px'}}
                                    onChange={onChange}
                                    value={value}
                                    label="Patient Number"/>
                            )}
                        />
                        <Controller
                            defaultValue="Urgent"
                            control={control}
                            name='precedence'
                            render={({field: {onChange, value}}) => (
                                <Select sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value='Urgent'>
                                        Urgent
                                    </MenuItem>
                                    <MenuItem value='Urgent Surgical'>
                                        Urgent Surgical
                                    </MenuItem>
                                    <MenuItem value='Priority'>
                                        Priority
                                    </MenuItem>
                                    <MenuItem value='Routine'>
                                        Routine
                                    </MenuItem>
                                </Select>
                            )}
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
                                                            checked={selectedItems.includes(option.label)}
                                                            onChange={() => handleSelect(option.label)}
                                                        />
                                                    }
                                                    control={control}
                                                />
                                            }
                                            label={option.label}
                                            key={option.label}
                                        />
                                    );
                                })}
                            </div>
                        </FormControl>
                    </Box>
                    <Box sx={{display: 'flex', marginTop: '8px'}}>
                        <Controller
                            defaultValue=''
                            name='litter'
                            control={control}
                            rules={{
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    max: v => parseInt(v) <= 9999,
                                },
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    error={!!error}
                                    helperText={error ? 'Patient number not valid' : null}
                                    sx={{width: '100%', marginRight: '8px'}}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label="Litter Patient Number"/>
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name='ambulatory'
                            control={control}
                            rules={{
                                validate: {
                                    positive: v => parseInt(v) > 0,
                                    max: v => parseInt(v) <= 9999,
                                },
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    error={!!error}
                                    helperText={error ? 'Patient number not valid' : null}
                                    sx={{width: '100%', marginLeft: '8px'}}
                                    margin="dense"
                                    onChange={onChange}
                                    value={value}
                                    label="Ambulatory Patient Number"/>
                            )}
                        />
                    </Box>
                    <Box sx={{marginTop: '16px'}}>
                        <Controller
                            defaultValue="No Enemy troop in area"
                            control={control}
                            name='security'
                            render={({field: {onChange, value}}) => (
                                <Select sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value='No Enemy troop in area'>
                                        No Enemy troop in area
                                    </MenuItem>
                                    <MenuItem value='Possible Enemy troop'>
                                        Possible Enemy troop
                                    </MenuItem>
                                    <MenuItem value='Enemy in Area, Proceed with Caution'>
                                        Enemy in Area, Proceed with caution
                                    </MenuItem>
                                    <MenuItem value='Enemy in Area, Escort Required'>
                                        Enemy in Area, Escort Required
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
                                                key={singleOption.label}
                                                value={singleOption.label}
                                                label={singleOption.label}
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
                                <Select sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value='US Military'>
                                        US Military
                                    </MenuItem>
                                    <MenuItem value='US Civilian'>
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
                            defaultValue="Nuclear"
                            control={control}
                            name='line9'
                            render={({field: {onChange, value}}) => (
                                <Select sx={{width: '100%'}} onChange={onChange} value={value}>
                                    <MenuItem value='Nuclear'>
                                        Nuclear
                                    </MenuItem>
                                    <MenuItem value='Biological'>
                                        Biological
                                    </MenuItem>
                                    <MenuItem value='Chemical'>
                                        Chemical
                                    </MenuItem>
                                    <MenuItem value='Chemical'>
                                        None
                                    </MenuItem>
                                </Select>
                            )}
                        />
                    </Box>
                    <Box onClick={() => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                    }} sx={{display: 'flex', justifyContent: 'end', marginY: '28px'}}>
                        <Button variant='contained' color="success" onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Box>
                </form>
            </Container>
            <DetailModal
                open={open}
                data={data}
                handleClose={handleClose}/>
        </>
    )
}

export default Requester;

