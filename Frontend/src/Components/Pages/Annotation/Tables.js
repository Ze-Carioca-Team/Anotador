import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import DialogTable from './DialogTable.js';

const useStyles = makeStyles((theme) => ({
    fab_dialogue: {
        position: 'fixed',
        bottom: theme.spacing(4),
        left: theme.spacing(4),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Tables(props) {
    const classes = useStyles();
    const [table, setTable] = React.useState(0);
    const openDrawer = () => {
        props.setInfo({...props.info, drawer: true});
    }
    const closeDrawer = () => {
        props.setInfo({...props.info, drawer: false});
    }
    return(
        <React.Fragment>
            <Drawer anchor='left' open={props.info.drawer} onClose={closeDrawer}>
                <Tabs value={table} indicatorColor="primary" textColor="primary" onChange={(event, n) => setTable(n)} aria-label="simple tabs example">
                    <Tab label={"Ativos "+props.info.count.active} {...a11yProps(0)} />
                    <Tab label={"Completos "+props.info.count.finished} {...a11yProps(1)} />
                    <Tab label={"Deletados "+props.info.count.deleted} {...a11yProps(2)} />
                </Tabs>
                {table===0?<DialogTable type="active" {...props} />
                :table===1?<DialogTable type="finished" {...props} />
                :<DialogTable type="deleted" {...props} />}
            </Drawer>
            <Fab variant="extended" onClick={openDrawer} className={classes.fab_dialogue}>
                <ChatBubbleOutlineIcon className={classes.margin}/>
                Dialogos {props.info.count.finished}/{props.info.count.active+props.info.count.finished}
            </Fab>
        </React.Fragment>
    )
}