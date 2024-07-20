import { useState } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { addItem } from "../utils/firebase";

export default function AdminPanel({sections, setItems, numItems}) {
    const [ name, setName ] = useState({value: "", error: false});
    const [ price, setPrice ] = useState({value: "", error: false});
    const [ section, setSection ] = useState({value: "", error: false});

    const handleChangeName = (e) => setName({value: e.target.value, error: !e.target.value});
    const handleChangePrice = (e) => setPrice({value: e.target.value, error: !e.target.value});
    const handleChangeSection = (e) => setSection({value: e.target.value, error: !e.target.value});

    const handleSubmit = async () => {
        if (name.value && price.value && section.value) {
            const addedItem = await addItem({
                name: name.value,
                price: Number(price.value),
                section: section.value
            }, numItems)
            setName({value: "", error: false});
            setPrice({value: "", error: false});
            setSection({value: "", error: false});
            return setItems(prevItems => ({
                ...prevItems,
                [addedItem.id] : addedItem
            }));
        }
        if (!name.value) setName(prev => ({...prev, error: true}));
        if (!price.value) setPrice(prev => ({...prev, error: true}));
        if (!section.value) setSection(prev => ({...prev, error: true}));
    }

    return (
        <Grid container rowSpacing={4}>
            <Grid item xs={12}>
                <Typography>Add item to Database</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField  
                    fullWidth
                    label="Name" 
                    variant="outlined" 
                    value={name.value}
                    onChange={handleChangeName}
                    error={name.error}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <TextField  
                    fullWidth
                    type="number"
                    label="Price" 
                    variant="outlined" 
                    value={price.value}
                    onChange={handleChangePrice}
                    error={price.error}
                    required
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="section-select-label">Section</InputLabel>
                    <Select
                        id="section-select"
                        labelId="section-select-label"
                        value={section.value}
                        onChange={handleChangeSection}
                        label="Section"
                        error={section.error}
                        required
                    >
                        { Object.values(sections).map(option => (
                            <MenuItem key={option.id} value={option.id} >
                                {option.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={handleSubmit} >Submit</Button>
            </Grid>
        </Grid>
    )
}
