import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CasinoIcon from '@material-ui/icons/Casino';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import TextField from '@material-ui/core/TextField';

var randomColor = require('randomcolor');

export default function Creator(props) {
    const [open, setOpen] = React.useState(false);
    const [creation, setCreation] = React.useState({color: randomColor({luminosity: 'dark'}), value: ''})
    function handleCreate(){
        if(props.entity && !props.intention && !props.topic){
            let newEntities = props.info.entities;
            newEntities.push(creation);
            props.setInfo({...props.info, toolsetOpen: false, entities: newEntities, entity: newEntities.length-1});
        }
        else if(props.intention  && !props.entity && !props.topic){
            let newIntentions = props.info.intentions;
            newIntentions.push(creation);
            props.setInfo({...props.info, toolsetOpen: false, intentions: newIntentions, intention: newIntentions.length-1});
        }
        else if(props.topic  && !props.entity && !props.intention){
            let newTopics = props.info.topics;
            newTopics.push(creation);
            props.setInfo({...props.info, toolsetOpen: false, topics: newTopics, topic: newTopics.length-1});
        
        }
    }
    function close(){
        setCreation({color: randomColor(),value:''});
        setOpen(false);
    }
    return(
        <>
            <IconButton size='small' onClick={() => {setOpen(true)}}  style={{borderRadius:'0'}}>
                <AddCircleOutlineIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => close()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"Criar " + (props.entity? "Entidade" : props.intention? "Intenção" : "Domínio")}</DialogTitle>
                <DialogContent>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Grid item>
                                <Box style={{width:'1.5rem',height:'1.5rem', backgroundColor: creation.color, border: 'thin solid grey', borderRadius: '0.3rem'}}/>
                            </Grid>
                        <Grid item>
                            <IconButton onClick={() => setCreation({...creation, color: randomColor()})}>
                                <CasinoIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="intention"
                        label={props.entity? "Nome da Entidade" : props.intention? "Nome da Intenção" : "Nome do Domínio"}
                        fullWidth
                        onChange={event => setCreation({...creation, value: event.target.value})}
                        />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => close()} color="primary">
                        Cancelar
                    </Button>
                    <Button disabled={!creation.value} onClick={() => {handleCreate();close()}} color="primary">
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}