// Generic imports modules should be done by alphabetic order
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

// Components import in alphabetical order
import TitleToolbar from './Components/Common/TitleToolbar.js';

// Currently the theme is empty, but if we want to config it is there
const assisTheme = createTheme({});

function Control(){
  // Filename is simply the current uploaded file
  const [filename, setFilename] = React.useState('');
  // Step is the current step being executed
  const [view, setView] = React.useState(0);
  // Generic alert
  const [alert, setAlert] = React.useState(null);
  // Data is where all the MultiWoz Data will be stored
  const [data, setData] = React.useState(null);
  return(
    <MuiThemeProvider theme={assisTheme}>
      <CssBaseline />
      {/* <WelcomeDialog /> */}
      {/* <AssisAlert /> */}
      <TitleToolbar />
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Control />,document.getElementById('root'));
