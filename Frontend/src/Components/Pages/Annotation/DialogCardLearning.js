import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import EditText from './EditText.js';

const incomingHex = '#E8E8E8'; // '#b5d9a7'
const outgoingHex = '#C8C8C8'; // '#b9d5f0'

const useStyles = makeStyles({
    incoming: {
        background: incomingHex,
        padding: '18px 20px',
        lineHeight: '26px',
        fontSize: '16px',
        borderRadius: '7px',
        width: '90%',
        position: 'relative',
        '&::after': {
            bottom: '100%',
            left: '5%',
            border: 'solid transparent',
            content: '" "',
            height: '0',
            width: '0',
            position: 'absolute',
            pointerEvents: 'none',
            borderBottomColor: incomingHex,
            borderWidth: '10px',
            marginLeft: '-10px',
          }
    },
    outgoing:{
        background: outgoingHex,
        padding: '18px 18px',
        lineHeight: '26px',
        fontSize: '16px',
        borderRadius: '7px',
        width: '90%',
        position: 'relative',
        '&::after': {
            bottom: '100%',
            left: '95%',
            border: 'solid transparent',
            content: '" "',
            height: '0',
            width: '0',
            position: 'absolute',
            pointerEvents: 'none',
            borderBottomColor: outgoingHex,
            borderWidth: '10px',
            marginLeft: '-10px',
          }
    }
  });

export default function DialogCard(props){
    const classes = useStyles();
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function addAlpha(color, opacity) {
        const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }
    
    function handleSetIntention(i_turn){
        return false
    }
    function handleRemoveIntention(int,i_turn){
        return false
    }
    function handleSetEntity(i_turn,i_split){
        return false
    }
    function handleRemoveEntity(i_turn, i_split){
        return false
    }
    function editTurn(i_turn){
        return false
    }
    function setTopic(i_turn){
        return false   
    }
    function checkPreviousTopic(i_turn){
        return false
    }
    function checkFutureTopic(i_turn){
        return false
    }
    return(
        <Grid item xs={4} container direction="column" justifyContent="center" alignItems="stretch">
            {props.info.edit!==-1?<EditText {...props}/>:null}
            {props.info.dataLearning.dialogs[props.info.learning].turns.map((turn, i_turn) => (
                <Grid item container direction="column" justifyContent="flex-start" alignItems={turn.speaker==='agent'?"flex-start":"flex-end"}>
                    {checkPreviousTopic(i_turn)?
                        <Grid item container style={{position: 'relative'}} xs={12}>
                            <div style={{width: '100%', height: '10px', borderBottom: '1px solid '+props.info.topics[props.info.metaLearning[props.info.learning].turns[i_turn].topic].color, textAlign: 'center'}}>
                                <span style={{backgroundColor: 'white', padding: '0 1rem', color: props.info.topics[props.info.metaLearning[props.info.learning].turns[i_turn].topic].color}}>
                                    {props.info.topics[props.info.metaLearning[props.info.learning].turns[i_turn].topic].value}
                                </span>
                            </div>
                            <Divider/>
                        </Grid>
                    :
                        null
                    } 
                    <Grid item style={{padding:'0.5rem'}}>
                        <b>
                            {turn.speaker==='agent'?capitalize(turn.speaker):null}
                            <span style={{cursor: 'pointer'}} onClick={()=>editTurn(i_turn)}> ✎ </span>
                            <span style={{cursor: 'pointer'}} onClick={()=>setTopic(i_turn)}> 📌 </span>
                            {turn.speaker==='client'?capitalize(turn.speaker):null}
                        </b>
                    </Grid>
                    <Grid xs={12} item className={turn.speaker==='agent'?classes.incoming:classes.outgoing} component={Paper}>
                        <Typography component="p" gutterBottom>
                            {props.info.metaLearning[props.info.learning].turns[i_turn].entities.split("###").map((entry, i_split) => {
                                if(i_split%2){
                                    const i_id = entry.indexOf('&&&')
                                    const color = props.info.entities[entry.substring(i_id+3)].color
                                    return <span onClick={()=>handleRemoveEntity(i_turn, i_split)} style={{border:'thin solid '+color, borderRadius: '5px', padding:'2px', cursor: 'pointer', color:color}} className='noselect'>{entry.substring(0,i_id)}
                                        <span style={{fontSize: '8px', display: 'table-cell', verticalAlign: 'middle', backgroundColor: addAlpha(color,0.3), padding:'2px', borderRadius:'4px'}}>{props.info.entities[entry.substring(i_id+3)].value}</span>
                                    </span>
                                }else
                                    return <span onMouseUp={()=>handleSetEntity(i_turn,i_split)}>{entry}</span>
                            })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {props.info.metaLearning[props.info.learning].turns[i_turn].intentions.map((int) => (
                                <ButtonBase onClick={()=>{handleRemoveIntention(int,i_turn)}} style={{padding:'1px', border:'thin solid '+props.info.intentions[int].color, borderRadius:'5px'}}>
                                    <Typography variant="caption" display="block" style={{fontSize:'0.6rem',color:props.info.intentions[int].color}}>
                                        {props.info.intentions[int].value}
                                    </Typography>
                                </ButtonBase>
                            ))
                        }
                        <ButtonBase onClick={()=>handleSetIntention(i_turn)} style={{padding:'1px 3px 1px 3px', border:'thin solid grey', borderRadius:'5px'}}>
                            <Typography variant="caption" display="block" style={{fontSize:'0.6rem',color:'grey'}}>
                                +
                            </Typography>
                        </ButtonBase>
                    </Grid>
                    {checkFutureTopic(i_turn)?
                        <Grid item container style={{position: 'relative'}} xs={12}>
                            <div style={{width: '100%', height: '10px', borderBottom: '1px solid '+props.info.topics[props.info.metaLearning[props.info.learning].turns[i_turn].topic].color, textAlign: 'center'}}>
                            </div>
                            <Divider/>
                        </Grid>
                    :
                        null
                    }  
                </Grid>
            ))}
        </Grid>
    )
}