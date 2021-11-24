import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    tablepaper: {
        height: 600,
        width: '100%',
        marginTop: theme.spacing(3),
        overflow: 'auto',
    },
    tableRow: {
        "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: '#e8eaf6',
        }
    }
}));

export default function DialogTable(props){
    const classes = useStyles();
    function select(index){
        props.setInfo({...props.info, drawer:false, selected: index});
    }
    function change(index,newStatus){
        let newMeta = props.info.meta;
        const oldStatus = newMeta[index].status
        newMeta[index].status=newStatus
        let newCount = props.info.count;
        newCount[oldStatus]--;
        newCount[newStatus]++;
        props.setInfo({...props.info, meta: newMeta, count: newCount});
    }
    return(
        <List>
            {props.info.data.dialogs.map((entry, index) => {
                if(props.type===props.info.meta[index].status) 
                    return(
                        <ListItem>
                            <ListItemText primary={"ID"+entry.id}/>
                            <ListItemSecondaryAction>
                                <IconButton size='small' onClick={()=>select(index)}>
                                    <CreateIcon />
                                </IconButton>
                                {props.info.meta[index].status==="active"?
                                    <React.Fragment>
                                        <IconButton size='small' onClick={()=>change(index,"finished")}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton size='small' onClick={()=>change(index,"deleted")}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </React.Fragment>
                                :
                                    <IconButton size='small' onClick={()=>change(index,"active")}>
                                        <KeyboardReturnIcon />
                                    </IconButton>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                else
                    return null;
            })}
        </List>
    )
}