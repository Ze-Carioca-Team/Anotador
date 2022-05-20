import axios from 'axios';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { Rings } from  'react-loader-spinner'
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useTheme } from '@material-ui/core/styles';

import DialogCardLearning from './Annotation/DialogCardLearning.js';
import Tables from './Annotation/Tables.js';
import Toolset from './Annotation/Toolset.js';

export default function LearningPage(props){
  const theme = useTheme();
  const { promiseInProgress } = usePromiseTracker();
  React.useEffect(()=>{
    trackPromise(axios.get("http://localhost:5000/")
    .then((response) => {
      props.setInfo({...props.info, learning: 0, dataLearning: response.data.dataLearning, metaLearning: response.data.metaLearning });
    }).catch((error) => {
      alert("Failed connecting to API")
    }))
  },[]);
  return(
    <Grid item container direction="column" justifyContent="center" alignItems="center">
      {promiseInProgress?
        <Rings color={theme.palette.primary.light} />
      :props.info.learning!==-1?
        <Fade in={!promiseInProgress} timeout={10000}>
          <>
            <Toolset {...props}/>
            <Typography variant="h4" style={{padding: '1rem'}}>
              Precisão de <b>56,5%</b>
            </Typography>
            <DialogCardLearning {...props}/>
          </>
        </Fade>
      :
        "There seems to be a problem with the API!"
      }
    </Grid>
  )
}