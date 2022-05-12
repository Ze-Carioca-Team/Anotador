/* ****************************************************
Pages.tsx takes care of the state variables and calls
the current view ("page") and other tools.
**************************************************** */
import Button from '@mui/material/Button';
import { DropzoneAreaBase, FileObject } from "mui-file-dropzone";
import React from 'react';

import { PagesContext } from '../Pages';
import Cards from './Cards';

export default function Upload(){
  const {filename, setFilename} = React.useContext(PagesContext);
  const [clicks,setClicks] = React.useState(0);
  const changeFilename=()=>{
    setFilename("Hey" + clicks);
    setClicks(clicks+1);
  }
  function seeExample(){
    const example = require('../../ExampleData/example.json');
    // setTemp('creditos_placa_errada_8.json',example)
  }
  function handleFile(fileObjs: any){}
  return(
    <React.Fragment>
      <Cards />
      <Button variant="contained" color="primary" style={{marginBottom:'1rem', marginLeft:'auto',marginRight:'auto'}} onClick={() => seeExample()}>
        Dados de Exemplo
      </Button>
      <DropzoneAreaBase
          onAdd={(fileObjs: FileObject[]) => console.log('Added Files:', fileObjs)}
      />
    </React.Fragment>
  )
}