import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

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
        props.setInfo({...props.info, selected: index});
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
        <TableContainer component={Paper} className={classes.tablepaper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dialogo</TableCell>
                        <TableCell>Turnos | Int. | Ent.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.info.data.dialogs.map((entry, index) => {
                        if(props.type===props.info.meta[index].status) 
                            return(
                                <TableRow hover selected={props.info.selected===index} className={classes.tableRow} key={index}>
                                    <TableCell>ID{entry.id}</TableCell>
                                    <TableCell>{entry.turns.length} | {props.info.meta[index].int} | {props.info.meta[index].ent}</TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                </TableRow>
                            )
                        else
                            return null;
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}