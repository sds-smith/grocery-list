import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import AddItem from './AddItem';

export default function Header({items, handleUpdateList, view, toggleView}) {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(show => !show);

  const handleToggleView = () => {
    if (show) setShow(false);
    toggleView();
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, height: '50px' }}>
        <AppBar position="fixed">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery List
            </Typography>
            <IconButton color="inherit" onClick={toggleShow} disabled={view === 'Admin'} >
              <AddShoppingCartIcon/>
            </IconButton>
            <IconButton color="inherit" onClick={handleToggleView}>
              { view === 'List' ? <BuildIcon/> : <HomeIcon/> }
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Collapse in={show}>
       <AddItem items={items} handleUpdateList={handleUpdateList} />
      </Collapse>
    </>

  );
}
