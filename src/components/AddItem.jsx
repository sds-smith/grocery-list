import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddItem({items, handleUpdateList}) {
    const [ selected, setSelected ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);
    const [ notes, setNotes ] = useState("");

    const quantityOptions = [1,2,3,4,5,6,7,8,9]

    const options = Object.values(items);

    const handleChangeItems = (_e, newValue) => {
        if (newValue) {
            setSelected(newValue.id);
            setQuantity(1);
        }
    }

    const handleChangeQty = (e) => {
        setQuantity(Number(e.target.value));
    }

    const handleChangeNotes = (e) => {
        setNotes(e.target.value);
    }

    const handleClickAddItem = () => {
        handleUpdateList(selected, quantity, notes)
    }

    return (
        <Grid container alignItems="center" sx={{backgroundColor: blue[100], border: '1px solid #1976d2', padding: '10px 0px'}} rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} >
                <Typography>{`Add an Item to This Week's Grocery List`}</Typography>
            </Grid>
            <Grid item xs={8} >
                <Autocomplete
                  disablePortal
                  options={options}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label="Search items" />}
                  onChange={handleChangeItems}
                />
            </Grid>
            <Grid item xs={2} >
                <Select
                  value={quantity}
                  onChange={handleChangeQty}
                >
                    { quantityOptions.map(option => (
                        <MenuItem key={option} value={option} >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={2} >
                <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClickAddItem} disabled={!selected}>
                  <AddShoppingCartIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    fullWidth
                    label="Notes (optional)"
                    value={notes}
                    onChange={handleChangeNotes}
                />
            </Grid>
        </Grid>
    )
}
