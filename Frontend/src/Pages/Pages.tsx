/* ****************************************************
Pages.tsx takes care of the state variables and calls
the current view ("page") and other tools.
**************************************************** */
import Container from '@mui/material/Container';
import React from 'react';


import Upload from './Upload/Upload';

// Declares context
export const PagesContext = React.createContext({
  filename: "" as String,
  setFilename: (newFilename: String) => {}
})

// All possible views and tools drawers
type Iviews = 'upload' | 'annotation' | 'download'
type Itools =  false | 'dialog' | 'entities' | 'intentions' | 'domains'

function ErrorPage(){
  return(<h1>ERROR!</h1>)
}

export default function Pages(){
  const [view,setView] = React.useState<Iviews>('upload');
  const [tools, setTools] = React.useState<Itools>(false)
  const [filename, setFilename] = React.useState<String>("")
  const [data, setData] = React.useState(null)
  const [domains, setDomains] = React.useState(null);
  const [entities, setEntities] = React.useState(null);
  const [intentions, setIntentions] = React.useState(null);
  const colorMode = React.useMemo(() => ({
  }),[]);
  function generateView(){
    switch(view){
      case 'upload': return <Upload />
      case 'annotation': return null
      case  'download': return null
      default: return <ErrorPage />
    }
  }
  return(
    <PagesContext.Provider value={{ filename, setFilename }}>
      <Container maxWidth="lg" style={{paddingTop:'1.5rem'}}>
        {generateView()}
      </Container>
    </PagesContext.Provider>
  )
}