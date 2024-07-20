
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BottomAppBar({total, archiveList}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Button variant="outlined" color="inherit" onClick={archiveList}>Archive List</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Typography >{`Total: ${total}`}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
