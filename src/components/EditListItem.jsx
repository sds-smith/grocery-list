
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function EditListItem({listItem, setListItem}) {
    const handleChange = (e) => {
        setListItem(prevListItem => ({
            ...prevListItem,
            quantity: Number(e.target.value)
        }))
    }

    const handleChangeNotes = (e) => {
        setListItem(prevListItem => ({
            ...prevListItem,
            notes: e.target.value
        }))
    }

    const quantityOptions = [1,2,3,4,5,6,7,8,9]


    return (
        <>
            <Grid item xs={12}>
                <TextField fullWidth label='name' value={listItem?.name} disabled/>
            </Grid>
            <Grid item xs={12} >
                <FormControl fullWidth>
                    <InputLabel id="quantity-select-label">Quantity</InputLabel>
                    <Select
                      id="quantity-select"
                      labelId="quantity-select-label"
                      label='quantity'
                      value={listItem?.quantity}
                      onChange={handleChange}
                    >
                        { quantityOptions.map(option => (
                            <MenuItem key={option} value={option} >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='price' value={listItem?.price} disabled/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='sub-total' value={listItem?.price * listItem?.quantity} disabled/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline
                    fullWidth
                    label="Notes (optional)"
                    value={listItem?.notes}
                    onChange={handleChangeNotes}
                />
            </Grid>
        </>
    )
}
