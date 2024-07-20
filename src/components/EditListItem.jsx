
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function EditListItem({listItem, setListItem}) {
    const handleChange = (e) => {
        setListItem(prevListItem => ({
            ...prevListItem,
            quantity: Number(e.target.value)
        }))
    }

    return (
        <Grid container rowSpacing={3}>
            <Grid item xs={12}>
                <TextField fullWidth label='name' value={listItem?.name} disabled/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='quantity' value={listItem?.quantity} onChange={handleChange}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='price' value={listItem?.price} disabled/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='sub-total' value={listItem?.price * listItem?.quantity} disabled/>
            </Grid>
        </Grid>
    )
}
