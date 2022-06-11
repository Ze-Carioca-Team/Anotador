import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CasinoIcon from '@material-ui/icons/Casino';
import CreateIcon from '@material-ui/icons/Create';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import Creator from './Creator.js';

import ToggleButton from '@material-ui/lab/ToggleButton';


var randomColor = require('randomcolor');

export default function DialogToolset(props) {
    const [alpha,setAlpha] = React.useState(false);
    function handleSelectEntity(index){
        props.setInfo({...props.info, toolsetOpen: false, entity: index});
    }
    function handleSelectIntention(index){
        props.setInfo({...props.info, toolsetOpen: false, intention: index});
    }
    function handleSelectTopic(index){
        props.setInfo({...props.info, toolsetOpen: false, topic: index});
    }
    function changeColorIntention(index){
        let newIntentions = props.info.intentions;
        newIntentions[index].color = randomColor({luminosity: 'dark'});
        props.setInfo({...props.info, intentions: newIntentions});
    }
    function changeColorEntity(index){
        let newEntities = props.info.entities;
        newEntities[index].color = randomColor({luminosity: 'dark'});
        props.setInfo({...props.info, entities: newEntities});
    }
    const deselectIntention=()=>{
        props.setInfo({...props.info, toolsetOpen: false, intention: -1});
    }
    const deselectEntity=()=>{
        props.setInfo({...props.info, toolsetOpen: false, entity: -1});
    }
    const changeAlpha=()=>{
        setAlpha(!alpha);
    }
    return(
        <React.Fragment>
                {props.info.toolsetSelected===1?
                    <React.Fragment>
                    <List dense='True'>
                        <ListItem>
                            <ToggleButton size="small" selected={alpha} onChange={changeAlpha}>
                                <SortByAlphaIcon />
                            </ToggleButton>
                            <IconButton size="small" onClick={deselectIntention}>
                                <LabelOffIcon />
                            </IconButton>
                            <Creator intention {...props}/>
                        </ListItem>
                        {/* {props.info.intentions.sort(function compare(a, b){
                            if(alpha)
                                return a.value.localeCompare(b.value)
                            else
                                return true
                        } */}
                        {props.info.intentions.map((entry, index) => (
                            <React.Fragment>
                                <Divider component="li" />
                                <ListItem button onClick={()=>handleSelectIntention(index)} style={{color: entry.color, paddingLeft:'2rem'}}>
                                    <ListItemText primary={entry.value}/>
                                    <ListItemSecondaryAction style={{marginRight:'1rem'}}>
                                        <IconButton size="small" onClick={()=>changeColorIntention(index)} edge="end" aria-label="delete">
                                            <CasinoIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={()=>alert("edit(intention)")} edge="end" aria-label="delete">
                                            <CreateIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={()=>alert("edit(intention)")} edge="end" aria-label="delete">
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </List>
                    </React.Fragment>
                :props.info.toolsetSelected===0?
                    <React.Fragment>
                        <List dense='True'>
                            <ListItem>
                                <ToggleButton size="small" selected={alpha} onChange={changeAlpha}>
                                    <SortByAlphaIcon />
                                </ToggleButton>
                                <IconButton size="small" onClick={deselectEntity}>
                                    <LabelOffIcon />
                                </IconButton>
                                <Creator entity {...props}/>
                            </ListItem>
                            {props.info.entities.map((entry, index) => (
                                <React.Fragment>
                                    <Divider component="li" />
                                    <ListItem button onClick={()=>handleSelectEntity(index)} style={{color: entry.color, paddingLeft:'2rem'}}>
                                        <ListItemText primary={entry.value}/>
                                        <ListItemSecondaryAction style={{marginRight:'1rem'}}>
                                            <IconButton size="small" onClick={()=>changeColorEntity(index)} edge="end">
                                                <CasinoIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={()=>alert("edit(entity)")} edge="end">
                                                <CreateIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={()=>alert("edit(entity)")} edge="end">
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <Creator topic {...props}/>
                        <List dense='True'>
                            {props.info.topics.map((entry, index) => (
                                <React.Fragment>
                                    <Divider component="li" />
                                    <ListItem button onClick={()=>handleSelectTopic(index)} style={{color: entry.color}}>
                                        <ListItemText primary={entry.value}/>
                                        <ListItemSecondaryAction>
                                        <IconButton size="small" onClick={()=>alert("edit(topic)")} edge="end" aria-label="delete">
                                            <CreateIcon />
                                        </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </React.Fragment>
                }
        </React.Fragment>
    )
}