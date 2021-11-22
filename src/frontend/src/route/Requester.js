import {
    Alert,
    Box, Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {Typography} from '@mui/material';
import {useForm, Controller} from "react-hook-form";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {submitForm} from "../service/service";

const Requester = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [alert, setAlert] = useState(false);
    const {register, reset, control, handleSubmit, setValue, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        const newData = {...data, equipment: data.equipment.join(', ')};
        try {
            await submitForm(newData);
            setAlert(true);
            reset({
                location: '',
                callSign: '',
                totalPatient: '0',
                precedence: '',
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
            {alert && <Alert onClose={() => {
                setAlert(false)
            }} severity="success">This is a success alert — check it out!</Alert>}

            <Container maxWidth="sm">
                <Typography variant='h4'>MEDEVAC Request Form</Typography>

                <form>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Controller
                            defaultValue=''
                            name='location'
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField margin="dense" onChange={onChange} value={value} label="Location"/>
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name='callSign'
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField margin="dense" onChange={onChange} value={value}
                                           label="Radio Frequency/ Call Sign/ Suffix"/>
                            )}
                        />
                    </Box>

                    <Box sx={{display: 'flex', marginTop: '16px'}}>
                        <Controller
                            defaultValue='0'
                            name='totalPatient'
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{marginRight: '16px'}} onChange={onChange} value={value}
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
                                                    render={({}) => {
                                                        return (
                                                            <Checkbox
                                                                checked={selectedItems.includes(option.label)}
                                                                onChange={() => handleSelect(option.label)}
                                                            />
                                                        );
                                                    }}
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
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: '100%', marginRight: '16px'}} margin="dense" onChange={onChange}
                                           value={value} label="Litter Patient Number"/>
                            )}
                        />
                        <Controller
                            defaultValue=''
                            name='ambulatory'
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <TextField sx={{width: '100%'}} margin="dense" onChange={onChange} value={value}
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
                            render={({field: {onChange, value}}) => (
                                <RadioGroup value={value} onChange={onChange}>
                                    <FormLabel>Marking Equipment</FormLabel>
                                    {markingOptions.map(singleOption =>
                                        <FormControlLabel
                                            key={singleOption.label}
                                            value={singleOption.label}
                                            label={singleOption.label}
                                            control={<Radio/>}
                                        />)}
                                </RadioGroup>
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
                                </Select>
                            )}
                        />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'end', marginY: '28px'}}>
                        <Button variant='contained' color="success" onClick={handleSubmit(onSubmit)}>Submit</Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default Requester;

