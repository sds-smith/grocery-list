import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import EditListItem from './EditListItem';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function CustomModal({open, setListItems, handleClose}) {
  const { action, payload } = open ? open : { action: null, payload: null };
  const [listItem, setListItem] = useState(payload);

  const title = action === 'delete' ? `Are you sure you want to ${action} ${payload?.name}?` : `Edit ${payload?.name}`;
  const subTitle = `This action is irreversible`;

  const handleAction = () => {
    if (action === 'delete') {
      setListItems(prevListItems => {
        const newListItems = { ...prevListItems };
        delete newListItems[payload.id];
        return newListItems;
      })
      handleClose();
    }
    if (action === 'edit') {
      setListItems(prevListItems => ({
        ...prevListItems,
        [listItem.id]: listItem
      }))
      handleClose();
    }
  }

  useEffect(() => setListItem(payload), [payload])

  return (      
    <Modal
      open={Boolean(open)}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        { action === 'delete' && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subTitle}
          </Typography>
        )}
        { action === 'edit' && (
          <EditListItem
            listItem={listItem}
            setListItem={setListItem}
          />
        )}

        <Button variant='contained' color="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleAction}>{action === 'delete' ? 'Delete' : 'Edit'}</Button>
      </Box>
    </Modal>
  )
}
