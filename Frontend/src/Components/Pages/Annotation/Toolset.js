import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import DialogToolset from './DialogToolset.js';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
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
      fab_topic: {
        position: 'fixed',
        bottom: theme.spacing(20),
        right: theme.spacing(4),
    },
      margin:{
          margin: theme.spacing(1),
      }
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Toolset(props) {
    const classes = useStyles();
    const closeToolset = () => {
        props.setInfo({...props.info, toolsetOpen: false})
    }
    function openToolset(i){
        props.setInfo({...props.info, toolsetOpen: true, toolsetSelected: i})
    }
    function changeToolset(i){
        props.setInfo({...props.info, toolsetSelected: i})
    }
    return(
        <React.Fragment>
            <Drawer anchor='right' open={props.info.toolsetOpen} onClose={closeToolset}>
                <Tabs value={props.info.toolsetSelected} indicatorColor="primary" textColor="primary" onChange={(event, i) => changeToolset(i)} aria-label="simple tabs example">
                    <Tab label="Entidades" {...a11yProps(0)} />
                    <Tab label="Intenções" {...a11yProps(1)} />
                    <Tab label="Domínios" {...a11yProps(2)} />
                </Tabs>
                {props.info.toolsetSelected?
                    <DialogToolset type="intention" {...props} />
                :
                    <DialogToolset type="entity" {...props} />
                }
            </Drawer>
            <Fab variant="extended" style={props.info.intention!==-1?{color:props.info.intentions[props.info.intention].color}:null} onClick={() => openToolset(1)} className={classes.fab_intention}>
                <ErrorOutlineIcon className={classes.margin}/>
                {props.info.intention!==-1?
                    props.info.intentions[props.info.intention].value
                :    
                    'Intenções'
                }
            </Fab>
            <Fab variant="extended" style={props.info.entity!==-1?{color:props.info.entities[props.info.entity].color}:null} onClick={() => openToolset(0)} className={classes.fab_entity}>
                <PermIdentityIcon className={classes.margin}/>
                {props.info.entity!==-1?
                    props.info.entities[props.info.entity].value
                :    
                    'Entidades'
                }
            </Fab>
            <Fab variant="extended" style={props.info.topic!==-1?{color:props.info.topics[props.info.topic].color}:null} onClick={() => openToolset(2)} className={classes.fab_topic}>
                <ChatBubbleOutlineIcon className={classes.margin}/>
                {props.info.topic!==-1?
                    props.info.topics[props.info.topic].value
                :    
                    'Domínios'
                }
            </Fab>
        </React.Fragment>
    )
}