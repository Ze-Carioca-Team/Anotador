/* ****************************************************
Pages.tsx takes care of the state variables and calls
the current view ("page") and other tools.
**************************************************** */
import Button from '@mui/material/Button';
import React from 'react';

import { PagesContext } from '../Pages'

export default function Upload(){
  const {filename, setFilename} = React.useContext(PagesContext);
  const [clicks,setClicks] = React.useState(0);
  const changeFilename=()=>{
    setFilename("Hey" + clicks);
    setClicks(clicks+1);
  }

  // const change
  return(
    <div>
      <Button onClick={changeFilename}>
        Hey
      </Button>
      {filename}
    </div>

  )
}