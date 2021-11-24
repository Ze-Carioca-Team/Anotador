import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import { makeStyles} from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import React from 'react';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';
import CasinoIcon from '@material-ui/icons/Casino';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import Creator from './Creator.js';

const useStyles = makeStyles((theme) => ({
    fab_entity: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
    fab_intention: {
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(4),
    },
    margin:{
        margin: theme.spacing(1),
    }
  }));

export default function Tables(props) {
    const classes = useStyles();
    const openToolset1 = () => {
        props.setInfo({...props.info, toolset: 1});
    }
    const openToolset2 = () => {
        props.setInfo({...props.info, toolset: 2});
    }
    const closeToolset = () => {
        props.setInfo({...props.info, toolset: 0});
    }
    function handleSelectEntity(index){
        props.setInfo({...props.info, toolset: 0, entity: index});
    }
    function handleSelectIntention(index){
        props.setInfo({...props.info, toolset: 0, intention: index});
    }
    return(
        <React.Fragment>
            <Drawer anchor='right' open={props.info.toolset!==0} onClose={closeToolset}>
                <div style={{minWidth:'20rem'}}></div>
                {props.info.toolset===1?
                    <React.Fragment>
                    <h3>Intenções:</h3>
                    <List dense='True'>
                        {props.info.intentions.map((entry, index) => (
                            <ListItem button onClick={()=>handleSelectIntention(index)} style={{color: entry.color}}>
                                <ListItemText primary={entry.value}/>
                            </ListItem>
                        ))}
                    </List>
                    <Creator intention {...props}/>
                    </React.Fragment>
                :
                    <React.Fragment>
                    <h3>Entidades:</h3>
                    <List dense='True'>
                        {props.info.entities.map((entry, index) => (
                            <ListItem button onClick={()=>handleSelectEntity(index)} style={{color: entry.color}}>
                                <ListItemText primary={entry.value}/>
                            </ListItem>
                        ))}
                    </List>
                    <Creator entity {...props}/>
                    </React.Fragment>
                }
            </Drawer>
            <Fab variant="extended" style={props.info.intention!==-1?{color:props.info.intentions[props.info.intention].color}:null} onClick={openToolset1} className={classes.fab_intention}>
                <ErrorOutlineIcon className={classes.margin}/>
                {props.info.intention!==-1?
                    props.info.intentions[props.info.intention].value
                :    
                    'Intenções'
                }
            </Fab>
            <Fab variant="extended" style={props.info.entity!==-1?{color:props.info.entities[props.info.entity].color}:null} onClick={openToolset2} className={classes.fab_entity}>
                <PermIdentityIcon className={classes.margin}/>
                {props.info.entity!==-1?
                    props.info.entities[props.info.entity].value
                :    
                    'Entidades'
                }
            </Fab>
        </React.Fragment>
    )
}