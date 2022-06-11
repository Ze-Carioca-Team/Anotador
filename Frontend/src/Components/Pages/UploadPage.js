import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import {DropzoneAreaBase} from 'material-ui-dropzone';
import randomColor from 'randomcolor';

const useStyles = makeStyles((theme) => ({
    dropzone: {
        paddingTop: '1rem',
        margin: 'auto',
        maxWidth: '50rem',
        textAlign: 'center'
    },
    card: {
        textAlign: 'left'   
    },
    continueButton: {
        marginTop: '1rem',
    },
}));

function SideCard(props){
    return(
      <Grid item xs={6}>
        <Card xs={6}>
          <CardActionArea href={"https://unicamp-cit.notion.site/unicamp-cit/CI-T-Unicamp-ca7a3fc10d9a43f09a14c5dd4d31e554"}>
            <div style={{display: 'flex'}}>
              <CardMedia style={{width: 100}} image={props.image}/>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.text}
                  </Typography>
                </CardContent>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
  
  function Cards(){
      return(
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} style={{paddingBottom: '2rem', textAlign: 'left'}}>   
          <SideCard title="Tutorial" text="Aprenda a usar a ferramenta" image="https://www.pythontutorial.net/wp-content/uploads/2020/11/tkinter-tutorial.png"/>
          <SideCard title="Metodologia" text="Como decidir entidades e intenções?" image="https://www.mahdimamouri.com/media/consulting/nlp.png"/>
          <SideCard title="Documentação" text="Como alterar a API e funções" image="https://code.visualstudio.com/assets/docs/languages/javascript/overview.png"/>
          <SideCard title="Equipe" text="Conheça nossa equipe de pesquisa!" image="https://ic.unicamp.br/~jreis/media/image1.png"/>
        </Grid>
      )
  }

export default function UploadPage(props) {
    const classes = useStyles();
    const [settings, setSettings] = React.useState({
        todo: {
            manual: true,
            verification: false,
            download: false,
        },
        filename: '',
        data: {dialogs: []},
        open: false,
        range: [0,100],
    });
    function handleTodo(event){
        setSettings({...settings, todo: {...settings.todo, [event.target.name]: event.target.checked}});
    }
    const handleRange = (event,range) => {
        setSettings({...settings, range: range});
    }
    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    var printError = function(error, explicit) {
        console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
    }
    function handleFile(fileObjs){
        const filename = fileObjs[0].file.name
        console.log(filename +'-'+fileObjs[0].file)
        try {
            let result = JSON.parse(b64DecodeUnicode(fileObjs[0].data.substring(29)));
            setTemp(filename,result);
        } catch (e) {
            alert("Seu .json está com problemas, verifique se ele não há caracteres faltando ou errados\n(veja o erro no console.log)");
            if (e instanceof SyntaxError) {
                printError(e, true);
            } else {
                printError(e, false);
            }
        }
    } 
    function seeExample(){
        const example = require('../../ExampleData/creditos_placa_errada_8.json');
        setTemp('creditos_placa_errada_8.json',example)
    }
    function setTemp(filename,json_data){
        setSettings({...settings, filename: filename, data:json_data, range: [0,json_data.dialogs.length-1], open: true});
    }
    function handleConfirm(){
        let json_data = settings.data
        // TODO depois corrige isso aqui pra nao descartar dialogos
        // json_data.dialogs = json_data.dialogs.slice(settings.range[0],settings.range[1]);
        let meta = []
        let count = {active: json_data.dialogs.length, finished: 0, deleted: 0}
        let entities_id = Object.keys(json_data.ontology['slot-values']);
        let entities = entities_id.map((value) => ({color: randomColor({luminosity: 'dark'}), value: value}))
        let intentions_id = json_data.ontology.intents.concat(json_data.ontology.actions);
        intentions_id = [...new Set(intentions_id)].sort();
        let intentions = intentions_id.map((value) => ({color: randomColor({luminosity: 'dark'}), value: value}))
        console.log(json_data.dialogs.length);
        for(let d=0;d<json_data.dialogs.length;d++){
            let turnmeta = []
            let int = 0;
            let ent = 0;
            for(let t=0;t<json_data.dialogs[d].turns.length;t++){
                let turn = json_data.dialogs[d].turns[t]
                // Parte das intenções
                let intent_name = turn.speaker==="client"?"intent":"action";
                let intents_str = turn[intent_name]
                let intention_list = []
                if(intents_str&&intents_str!==""){
                    let intents = turn[intent_name].replace("]","").split("[");
                    // Criar intenção que não está na lista
                    for(let i=0;i<intents.length;i++){
                        let intent = intents[i].replace("]","")
                        if(intent!==''){
                            if(!intentions_id.includes(intent)){
                                intentions_id.push(intent)
                                intentions.push({color: randomColor({luminosity: 'dark'}), value: intent})
                            }
                            intention_list.push(intentions_id.indexOf(intent));
                            int++;
                        }
                    }
                }
                // Parte das entidades
                let newDelex = '';
                if(turn.utterance_delex){
                    let oldDelex = turn.utterance_delex;
                    let oldDelex_split = oldDelex.split('[')
                    for(let i=0;i<oldDelex_split.length;i++){
                        let end = oldDelex_split[i].indexOf(']')
                        if(end!==-1){
                            let entity = oldDelex_split[i].substring(0,end);
                            let value = turn["slot-values"][entity]
                            if(!entities_id.includes(entity)){
                                entities_id.push(entity)
                                entities.push({color: randomColor({luminosity: 'dark'}), value: entity})
                            }
                            let entity_id = entities_id.indexOf(entity)
                            if(Array.isArray(value)){
                                newDelex = newDelex + '###'+value.shift()+'&&&'+entity_id+'###'+oldDelex_split[i].substring(end+1)
                            }
                            else{
                                newDelex = newDelex + '###'+value+'&&&'+entity_id+'###'+oldDelex_split[i].substring(end+1)
                            }
                            ent++;
                        }
                        else{
                            newDelex = newDelex + oldDelex_split[i]
                        }
                    }
                }
                turnmeta.push({
                    intentions: intention_list,
                    topic: -1,
                    entities: newDelex?newDelex:json_data.dialogs[d].turns[t].utterance
                })
            }
            meta.push({int: int, ent: ent, status:"active", turns: turnmeta})
        }
        props.setInfo({...props.info, entities: entities, intentions: intentions, filename: settings.filename, data: json_data, meta: meta, count: count, step: 0});
        setSettings({
            todo: {
                manual: true,
                verification: false,
                download: false,
            },
            data: {dialogs: []},
            open: false,
            dialogs: 0,
        })
    }


    return(
        <main className={classes.dropzone}>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} style={{paddingBottom: '2rem'}}>
                <Cards />
            </Grid>
            <DropzoneAreaBase
                dropzoneText="Adicione as conversas do seu Chatbot"
                onAdd={(fileObjs) => {handleFile(fileObjs)}}
                />
            <Button variant="contained" color="primary" className={classes.continueButton} onClick={() => seeExample()}>
                Veja os dados de Exemplo
            </Button>
            <Dialog
                open={settings.open}
                onClose={() => setSettings({...settings, data: {dialogs: []}, open: false})}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='sm'
                fullWidth={true}
                >
                <DialogContent>
                    <Typography variant='h5'>
                        {"Arquivo " + settings.filename}
                    </Typography>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                        <Typography variant="h6">
                            O que você deseja fazer?
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                            control={<Switch disabled checked={settings.todo.manual} onChange={handleTodo} color="primary" name="manual" />}
                            label="Anotação Manual"
                            />
                            {settings.todo.manual?
                                <>
                                    <Slider value={settings.range} onChange={handleRange} aria-labelledby="range-slider"
                                        step={1}
                                        min={0}
                                        max={settings.data.dialogs.length-1}
                                        valueLabelFormat={(value) => {return value}}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography variant="caption">
                                        Você anotará <b>{Math.floor(settings.range[1]-settings.range[0])+1}</b> dialogos (ID{settings.data.dialogs[settings.range[0]]?settings.data.dialogs[settings.range[0]].id:0} - ID{settings.data.dialogs[settings.range[1]]?settings.data.dialogs[settings.range[1]].id:0})
                                    </Typography>
                                </>
                            :null}
                            <FormControlLabel
                            control={<Switch disabled checked={settings.todo.verification} onChange={handleTodo} color="primary" name="verification" />}
                            label="Active Learning"
                            />
                            <FormControlLabel
                            control={<Switch disabled checked={settings.todo.download} onChange={handleTodo} color="primary" name="download" />}
                            label="Donwload do Dataset"
                            />
                        </FormGroup>
                        {!settings.todo.manual && !settings.todo.verification?
                        <Typography variant="caption">
                            A IA pré-treinada fará <b>toda a anotação</b> para você
                        </Typography>
                        :settings.todo.manual && !settings.todo.verification?
                        <Typography variant="caption">
                            Você irá anotar algumas <b>intenções e entidades</b> para a IA.
                        </Typography>
                        :settings.todo.manual && settings.todo.verification?
                        <Typography variant="caption">
                            Você irá anotar <b>intenções, entidades,</b> e ainda ajudar a <b>verificar</b> as que a IA anotou.
                        </Typography>
                        :
                        <Typography variant="caption">
                            Você irá <b>conferir e arrumar</b> as anotações feitas pela IA.
                        </Typography>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSettings({...settings, data: {dialogs: []}, open: false})} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => handleConfirm()} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </main>
    )
}
