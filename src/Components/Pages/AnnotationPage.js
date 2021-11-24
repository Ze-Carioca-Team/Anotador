import Button from '@material-ui/core/Button';
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
    return(
        <Grid item container xs={12} direction="column" justifyContent="center" alignItems="center" spacing={1} style={{paddingTop:'1rem'}}>       
            <Tables {...props}/>
            <Toolset {...props}/>
                {props.info.selected!==-1?
                <React.Fragment>
                    <Grid item>
                        <Typography>
                            Dialogo Nº{props.info.data.dialogs[props.info.selected].id}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined"  className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Domínio</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={domain}
                            onChange={changeDomain}
                            label="Domínio"
                            >
                            <MenuItem value=''>Nenhum</MenuItem>
                            {props.info.intentions.map((entry,index)=>
                                <MenuItem value={entry.value}>{entry.value}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                </React.Fragment>
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
        </Grid>
    )
}