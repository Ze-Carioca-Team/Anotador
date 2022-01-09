import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import { makeStyles} from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import React from 'react';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CreateIcon from '@material-ui/icons/Create';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';
import CasinoIcon from '@material-ui/icons/Casino';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import Creator from './Creator.js';

export default function DialogToolset(props) {
    function handleSelectEntity(index){
        props.setInfo({...props.info, toolsetOpen: false, entity: index});
    }
    function handleSelectIntention(index){
        props.setInfo({...props.info, toolsetOpen: false, intention: index});
    }
    function handleSelectTopic(index){
        props.setInfo({...props.info, toolsetOpen: false, topic: index});

    }
    return(
        <React.Fragment>
                {props.info.toolsetSelected==1?
                    <React.Fragment>
                    <Creator intention {...props}/>
                    <List dense='True'>
                        {props.info.intentions.map((entry, index) => (
                            <ListItem button onClick={()=>handleSelectIntention(index)} style={{color: entry.color}}>
                                <ListItemText primary={'- ' + entry.value}/>
                                <ListItemSecondaryAction>
                                <IconButton onClick={()=>alert("edit(intention)")} edge="end" aria-label="delete">
                                    <CreateIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            
                        ))}
                    </List>
                    </React.Fragment>
                :props.info.toolsetSelected==0?
                    <React.Fragment>
                        <Creator entity {...props}/>
                        <List dense='True'>
                            {props.info.entities.map((entry, index) => (
                                <ListItem button onClick={()=>handleSelectEntity(index)} style={{color: entry.color}}>
                                    <ListItemText primary={'- ' + entry.value}/>
                                    <ListItemSecondaryAction>
                                    <IconButton onClick={()=>alert("edit(entity)")} edge="end" aria-label="delete">
                                        <CreateIcon />
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Creator topic {...props}/>
                        <List dense='True'>
                            {props.info.topics.map((entry, index) => (
                                <ListItem button onClick={()=>handleSelectTopic(index)} style={{color: entry.color}}>
                                    <ListItemText primary={'- ' + entry.value}/>
                                    <ListItemSecondaryAction>
                                    <IconButton onClick={()=>alert("edit(topic)")} edge="end" aria-label="delete">
                                        <CreateIcon />
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </React.Fragment>
                }
        </React.Fragment>
    )
}