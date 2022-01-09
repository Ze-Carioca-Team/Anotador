import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import DialogCard from './Annotation/DialogCard.js';
import Tables from './Annotation/Tables.js';
import Toolset from './Annotation/Toolset.js';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function Annotation(props) {
    const classes = useStyles();
    const [domain, setDomain] = React.useState('');
    const changeDomain = (event) => {
        setDomain(event.target.value);
      };
    const openDrawer = () => {
        props.setInfo({...props.info, drawer: true});
    }
    const dialogUp = () => {
        props.setInfo({...props.info, selected: props.info.selected+1});
    }
    const dialogDown = () => {
        props.setInfo({...props.info, selected: props.info.selected-1});
    }
    return(
        <Grid item container xs={12} direction="column" justifyContent="center" alignItems="center" spacing={1} style={{paddingTop:'1rem'}}>       
            <Tables {...props}/>
            <Toolset {...props}/>
                {props.info.selected!==-1?
                    <Grid item>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button disabled={props.info.selected===0} onClick={dialogDown}>{'<'}</Button>
                            <Button disabled>Dialogo Nº{props.info.data.dialogs[props.info.selected].id}</Button>
                            <Button disabled={props.info.selected===props.info.data.dialogs.length-1} onClick={dialogUp}>{'>'}</Button>
                        </ButtonGroup>
                    </Grid>
                :
                    <Grid item>
                        <Button variant="outlined" onClick={openDrawer}>
                            Selecione um Dialogo
                        </Button>
                    </Grid>
                }
            {props.info.selected!==-1?
                <DialogCard {...props}/>
            :
                null
            }
            {props.info.selected!==-1?
                <Grid item>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button disabled={props.info.selected===0} onClick={dialogDown}>{'<'}</Button>
                        <Button disabled>Dialogo Nº{props.info.data.dialogs[props.info.selected].id}</Button>
                        <Button disabled={props.info.selected===props.info.data.dialogs.length-1} onClick={dialogUp}>{'>'}</Button>
                    </ButtonGroup>
                </Grid>
                :
                null
            }
        </Grid>
    )
}