/* ****************************************************
Toolbar takes care of generating the toolbar and 
change the theme mode
**************************************************** */
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';

// Imports context
import { ThemeContext } from '../index'

// A dialog to help people understand the program
function HelpDialog(){
  return(
    <React.Fragment>
      <DialogTitle>Sobre o ASSIS</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus quam dapibus massa viverra, sed convallis dolor bibendum. Morbi ornare eros vel orci porttitor, sit amet molestie nisl varius. Curabitur velit dolor, egestas quis ex eu, commodo mattis eros. In tortor magna, vulputate maximus convallis sit amet, suscipit in mauris. Praesent tempor eleifend enim ut convallis. Nam vehicula est vitae turpis fringilla vestibulum a lacinia sem. Fusce varius vulputate metus, malesuada sollicitudin arcu pulvinar id. Nam eleifend ornare erat, eu lacinia nibh iaculis ac. Donec sollicitudin risus in orci lacinia accumsan. Proin vulputate dictum viverra.
          Feito com ❤️ pelo Andreis. Baseado no Design do Henrique.
        </DialogContentText>
      </DialogContent>
    </React.Fragment>
  )
}

// Generates Toolbar
export default function AssisToolbar(){
  // Gets theme to check if its dark or light
  const mode = useTheme().palette.mode;
  // Open or close help dialog
  const [openHelp, setOpenHelp] = React.useState<boolean>(false);
  const colorMode = React.useContext(ThemeContext);
  return(
    <AppBar position="static">
      <Toolbar>
        <Button variant="outlined" color="inherit" onClick={()=>setOpenHelp(true)}>
          Ajuda
        </Button>
        <Dialog open={openHelp} onClose={() => {setOpenHelp(false)}}>
          <HelpDialog />
        </Dialog>
        <Typography variant="h5" color="inherit" align="center" noWrap sx={{fontFamily: "Bookman Old Style", fontVariant: 'small-caps', flexGrow: 1}}>
          Assis
        </Typography>
        <Tooltip title={"Ativar modo "+mode}>
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {mode==='light'?<DarkModeIcon />:<LightModeIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title={"Visualizar o código fonte"}>
          <IconButton color="inherit">
            <GitHubIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}