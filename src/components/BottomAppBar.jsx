
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BottomAppBar({total, archiveList, view}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {view === 'List' && <Button variant="outlined" color="inherit" onClick={archiveList}>Archive List</Button>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {view === 'List' && <Typography >{`Total: ${total}`}</Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
