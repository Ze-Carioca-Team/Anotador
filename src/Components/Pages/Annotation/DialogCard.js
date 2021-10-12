import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Creator from './Creator.js';

export default function DialogCard(props){
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function addAlpha(color, opacity) {
        const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return color + _opacity.toString(16).toUpperCase();
    }
    function handleSelectEntity(index){
        props.setInfo({...props.info, entity: index, intention: -1});
    }
    function handleSelectIntention(event,index){
        event.stopPropagation();
        if (event.ctrlKey){
            alert("Not actually deleting intention "+props.info.intentions[index].value)
        }
        else{
            props.setInfo({...props.info, entity: -1, intention: index});
        }
    }
    function handleSetIntention(i_turn){
        if(props.info.intention >= 0 && !props.info.meta[props.info.selected].turns[i_turn].intentions.includes(props.info.intention)){
            let newDialogs = props.info.data.dialogs;
            const speaker = newDialogs[props.info.selected].turns[i_turn].speaker
            const intent = speaker==="agent"? "action":"intent"
            let newMeta = props.info.meta
            newMeta[props.info.selected].turns[i_turn].intentions.push(props.info.intention);
            newMeta[props.info.selected].int++;
            props.setInfo({...props.info, meta: newMeta});
        }
    }
    function handleRemoveIntention(int,i_turn){
        let newMeta = props.info.meta
        const index_remove = newMeta[props.info.selected].turns[i_turn].intentions.indexOf(int);
        if (index_remove > -1) {
            newMeta[props.info.selected].turns[i_turn].intentions.splice(index_remove, 1);
            newMeta[props.info.selected].int--;
        }
        props.setInfo({...props.info, meta: newMeta});
    }
    function handleSetEntity(i_turn,i_split){
        if(props.info.entity >= 0){
            let selection = window.getSelection();
            const start = selection.anchorOffset;
            const end = selection.focusOffset;
            let phrase = props.info.meta[props.info.selected].turns[i_turn].entities
            let phrase_split = phrase.split('###')
            if(i_split%2===0 && end>start && phrase.indexOf(selection.toString())!==-1){
                phrase_split[i_split] = phrase_split[i_split].substring(0,start)+'###'+phrase_split[i_split].substring(start,end)+'&&&'+props.info.entity+'###'+phrase_split[i_split].substring(end)
                let newMeta = props.info.meta;
                newMeta[props.info.selected].ent++;
                newMeta[props.info.selected].turns[i_turn].entities = phrase_split.join('###')
                props.setInfo({...props.info, meta: newMeta});
            }
            else{
                alert("Selecione uma área sem uma entidade!")
            }
        }
    }
    function handleRemoveEntity(i_turn, i_split){
        const phrase = props.info.meta[props.info.selected].turns[i_turn].entities
        const phrase_split = phrase.split('###')
        const start = phrase.indexOf(phrase_split[i_split])
        const end_id = phrase.indexOf('&&&', start)
        const end = phrase.indexOf('###', start)
        const newDelex = phrase.substring(0,start-3)+phrase.substring(start,end_id)+phrase.substring(end+3)
        let newMeta = props.info.meta;
        newMeta[props.info.selected].ent--;
        newMeta[props.info.selected].turns[i_turn].entities = newDelex
        props.setInfo({...props.info, meta: newMeta});
    }
    console.log(props.info)
    return(
        <Grid item xs={12} style={{paddingBottom:'1rem',paddingTop:'1rem'}}>
            <Card>
                <CardContent>
                    <Typography variant='h6'>
                        Dialogo Nº{props.info.data.dialogs[props.info.selected].id}
                    </Typography>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" spacing={4}>
                            <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={1}>
                                <Grid item style={{width:'5rem'}}>
                                    <Typography variant="caption" display="block" style={{fontSize:'0.6rem',color:'grey'}}>
                                        Intenções
                                    </Typography>
                                    <Divider light />
                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                            {props.info.data.dialogs[props.info.selected].turns.map((turn, i_turn) => (
                                <Grid item container direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={1}>
                                    <Grid item xs={2}>
                                        {
                                            props.info.meta[props.info.selected].turns[i_turn].intentions.map((int) => (
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
                                        <Divider light />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography component="p" gutterBottom>
                                            <b>{capitalize(turn.speaker)}: </b>
                                                {props.info.meta[props.info.selected].turns[i_turn].entities.split("###").map((entry, i_split) => {
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
                                </Grid>
                            ))}
                    </Grid>
                </CardContent>
                <Container>
                    Intenções:
                    {props.info.intentions.map((entry, index) => (
                        <Button size="small" variant="outlined" style={{borderColor: entry.color, color: entry.color}} onClick={(event) => handleSelectIntention(event,index)}>{entry.value}</Button>
                    ))}
                    <Creator intention {...props}/>
                    <Divider light />
                    Entidades:
                    {props.info.entities.map((entry, index) => (
                        <Button size="small" variant="outlined" style={{borderColor: entry.color, color: entry.color}} onClick={() => handleSelectEntity(index)}>{entry.value}</Button>
                    ))}
                    <Creator entity {...props}/>
                </Container>
            </Card>
        </Grid>
    )
}