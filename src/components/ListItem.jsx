
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';

export default function ListItem({listItem}) {
  const { name, price, quantity } = listItem;

  return (
    <Grid container alignItems="center" >
      <Grid item xs={1} >
        <Checkbox size='small' />
      </Grid>
      <Grid item xs={4}>
        <span style={{width: '30%', margin: '0px 10px'}} >{name}</span>
      </Grid>
      <Grid item xs={2}>
        <span style={{width: '10%', margin: '0px 10px'}} >{quantity}</span>       
      </Grid>
      <Grid item xs={2}>
        <span style={{width: '10%', margin: '0px 10px'}} >{price}</span>
      </Grid>
      <Grid item xs={3}>
        <span style={{width: '10%', margin: '0px 10px'}} >{price * quantity}</span>
      </Grid> 

    </Grid>
  )
}
