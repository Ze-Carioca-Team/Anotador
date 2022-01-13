import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Rings } from  'react-loader-spinner'
import React from 'react';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useTheme } from '@material-ui/core/styles';

export default function LearningPage(props){
  const theme = useTheme();
  const { promiseInProgress } = usePromiseTracker();
  const [reponse, setReponse] = React.useState('');
  React.useEffect(()=>{
    trackPromise(axios.get("http://localhost:5000/")
    .then((response) => {
      setReponse(JSON.stringify(response.data))
    }).catch((error) => {
      alert("Failed connecting to API")
    }))
  },[]);
  return(
    <Grid item container direction="column" justifyContent="center" alignItems="center">
      {promiseInProgress?
        <Rings color={theme.palette.primary.light} />
      :
        'Ended ' + reponse
      }
    </Grid>
  )
}