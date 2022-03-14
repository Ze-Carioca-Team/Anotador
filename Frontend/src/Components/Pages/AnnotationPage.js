import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import DialogCard from './Annotation/DialogCard.js';
import Tables from './Annotation/Tables.js';
import Toolset from './Annotation/Toolset.js';


import axios from 'axios';
import { Rings } from  'react-loader-spinner';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useTheme } from '@material-ui/core/styles';

export default function Annotation(props) {
    const theme = useTheme();
    const { promiseInProgress } = usePromiseTracker();
    const finishDialog=()=>{
        let newMeta = props.info.meta;
        newMeta[props.info.selected].status="finished"
        let newCount = props.info.count;
        newCount["active"]--;
        newCount["finished"]++;
        if(props.info.count.finished>=5){
            trackPromise(axios.get("http://localhost:5000/")
                .then((response) => {
                props.setInfo({...props.info, learning: 0, dataLearning: response.data.dataLearning, metaLearning: response.data.metaLearning });
                }).catch((error) => {
                alert("Failed connecting to API")
            }))
        }
        if(props.info.selected!==props.info.data.dialogs.length-1){
            props.setInfo({...props.info, meta: newMeta, count: newCount, selected: props.info.selected+1});
        }
        else{
            props.setInfo({...props.info, meta: newMeta, count: newCount, step:1});
        }
    }
    const deleteDialog=()=>{
        let newMeta = props.info.meta;
        newMeta[props.info.selected].status="deleted"
        let newCount = props.info.count;
        newCount["active"]--;
        newCount["deleted"]++;
        if(props.info.count.finished>=5){
            trackPromise(axios.get("http://localhost:5000/")
                .then((response) => {
                props.setInfo({...props.info, learning: 0, dataLearning: response.data.dataLearning, metaLearning: response.data.metaLearning });
                }).catch((error) => {
                alert("Failed connecting to API")
            }))
        }
        if(props.info.selected!==props.info.data.dialogs.length-1){
            props.setInfo({...props.info, meta: newMeta, count: newCount, selected: props.info.selected+1});
        }
        else{
            props.setInfo({...props.info, meta: newMeta, count: newCount, step:1});
        }
    }
    
    return(
        <Grid item container xs={12} direction="column" justifyContent="center" alignItems="center" spacing={1} style={{paddingTop:'1rem'}}>       
            <Tables {...props}/>
            <Toolset {...props}/>
            <Typography variant="overline" style={{paddingTop: '1rem'}}>
                Dialogo Nº{props.info.data.dialogs[props.info.selected].id}
            </Typography>
            {props.info.count.finished>=5?
                <Typography variant="caption">
                    Anotado Automaticamente por <b>BERT Vanilla</b>
                </Typography>
            :null}
            <Grid item>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={promiseInProgress} onClick={deleteDialog}>Deletar</Button>
                    <Button disabled={promiseInProgress} onClick={finishDialog}>Continuar</Button>
                </ButtonGroup>
            </Grid>
            {promiseInProgress?
                <Rings color={theme.palette.primary.light} />
            :
                <DialogCard {...props}/>
            }
        </Grid>
    )
}