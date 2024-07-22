import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Collapse from '@mui/material/Collapse';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ListItem({listItem, handleOpenModal}) {
  const { name, price, quantity, notes } = listItem;
  const [showNotes, setShowNotes] = useState(false);

  const [ checked, setChecked ] = useLocalStorage(`${listItem.id}_checked`)

  const toggleNotes = () => {if (notes) setShowNotes(prevShowNotes => !prevShowNotes);}

  const handleCheck = (e) => setChecked(e.target.checked)

  const handleEdit = () => {
    handleOpenModal('edit', listItem)
  }

  const handleDelete = () => {
    handleOpenModal('delete', listItem)
  }

  return (
    <>
      <Grid container alignItems="center" >
        <Grid item xs={1} >
          <Checkbox size='small' checked={checked} onChange={handleCheck} />
        </Grid>
        <Grid item xs={4}>
          <span style={{width: '30%', margin: '0px 10px'}} onClick={toggleNotes}>{`${notes ? '**' : ''}${name}`}</span>
        </Grid>
        <Grid item xs={1}>
          <span style={{width: '10%', margin: '0px 10px'}} >{quantity}</span>       
        </Grid>
        <Grid item xs={2}>
          <span style={{width: '10%', margin: '0px 10px'}} >{price}</span>
        </Grid>
        <Grid item xs={2}>
          <span style={{width: '10%', margin: '0px 10px'}} >{price * quantity}</span>
        </Grid> 
        <Grid item xs={2} sx={{display: 'flex'}}>
          <IconButton onClick={handleEdit}>
            <EditIcon/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon/>
          </IconButton>
        </Grid> 
      </Grid>
      <Collapse in={showNotes}>
        <div style={{border: '1px solid black', textAlign: 'center'}}>{notes}</div>
      </Collapse>
    </>
  )
}
