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
import items from '../data/items';

export default function AddItem({setListItems}) {
    const [ selected, setSelected ] = useState(null);
    const [ quantity, setQuantity ] = useState(1);

    const quantityOptions = [1,2,3,4,5,6,7,8,9]

    const options = Object.values(items);

    const handleChangeItems = (_e, newValue) => {
        if (newValue) {
            setSelected(newValue.id);
            setQuantity(1);
        }
    }

    const handleChangeQty = (e) => {
        console.log(e.target.value)
        setQuantity(e.target.value);
    }

    const handleClickAddItem = () => {
        setListItems(prevListItems => ({
            ...prevListItems,
            [selected] : {
                ...items[selected],
                quantity
            }
        }))
    }

    return (
        <Grid container alignItems="center" sx={{backgroundColor: blue[100], padding: '10px 0px'}} rowSpacing={3} columnSpacing={2}>
            <Grid item xs={12} >
                <Typography>Add an Item</Typography>
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
        </Grid>
    )
}
