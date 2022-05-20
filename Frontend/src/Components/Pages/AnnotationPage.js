import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import DialogCard from './Annotation/DialogCard.js';
import Tables from './Annotation/Tables.js';
import Toolset from './Annotation/Toolset.js';

export default function Annotation(props) {
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