/* ****************************************************
index.tsx takes care of the theming 
**************************************************** */
// Generic imports modules should be done by alphabetic order
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import useMediaQuery from '@mui/material/useMediaQuery';

// Component imports. Toolbar is userful for language and theme
import AssisToolbar from './Common/AssisToolbar';
import Pages from './Pages/Pages';

// Creates Context for Toolbar to update mode and language
export const ThemeContext = React.createContext({ toggleColorMode: ()=>{}})

function Assis(){
  // Dark or Light mode
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }),[]);
  // Creates customized CSS material UI theme
  const theme = React.useMemo(()=>createTheme({
    palette: {
      mode,
      primary: {
        main: '#ae8887',
      },
      secondary: {
        main: '#c3c1ab',
      },
    },
  // Checks if user has a preference for dark color scheme
  }), [mode,useMediaQuery('(prefers-color-scheme: dark)')]);
  const [lang, setLang] = React.useState('pt')
  return(
    <React.StrictMode>
      <CssBaseline />
      <ThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <AssisToolbar/>
            <Pages />
        </ThemeProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  )
}

// Calls DOM to generate the app in the root element
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Assis />);
