import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function DownloadPage(props) {
    // Terminar na V0:
    // - entidades no arquivo de saida
    // - tirar dialogos marcadas como deletados
    // V0.1:
    // - Passar a tabela para o drawer lateral
    // - Nova barra de ferramentas
    // - Deletar intenções e entidades (usar o marcador)
    function download() {
        const filename = props.info.filename.substring(0,props.info.filename.length-5)+'_anotado.json';
        let output = props.info.data;
        let meta = props.info.meta;
        let intention_names = props.info.intentions.map((e) => (e.value))
        let entity_names = props.info.entities.map((e) => (e.value))
        output.ontology["slot-values"] = {}
        if(!Array.isArray(output.ontology.intents)){
            output.ontology.intents = []
        }
        if(!Array.isArray(output.ontology.actions)){
            output.ontology.actions = []
        }
        // console.log(props.info)
        for(let d=0;d<output.dialogs.length;d++){
            for(let t=0;t<output.dialogs[d].turns.length;t++){
                let turn = output.dialogs[d].turns[t]
                let turn_meta = meta[d].turns[t]
                // Intenções
                let intent_type_ont = turn.intent?'intents':'actions'
                let intent_type = turn["turn-num"]%2?'action':'intent'
                console.log(intent_type);
                turn[intent_type] = ''
                for(let i=0;i<turn_meta.intentions.length;i++){
                    let intention = intention_names[turn_meta.intentions[i]]
                    if(!output.ontology[intent_type_ont]){
                        output.ontology[intent_type_ont] = [intention]
                    }
                    else if(!output.ontology[intent_type_ont].includes(intention)){
                        output.ontology[intent_type_ont].push(intention)
                    }
                    turn[intent_type] = turn[intent_type] +'['+intention+']'
                }
                // Entidades
                let meta_delex = meta[d].turns[t].entities.split('###')
                let final_delex = ''
                turn['slot-values'] = {}
                for(let i=0;i<meta_delex.length;i++){
                    let start_id = meta_delex[i].indexOf('&&&')
                    if(start_id===-1){
                        final_delex = final_delex + meta_delex[i]
                    }
                    else{
                        let entity = entity_names[meta_delex[i].substring(start_id+3)]
                        let value = meta_delex[i].substring(0,start_id)
                        final_delex = final_delex + '['+entity+']'
                        // Adicionando na ontologia
                        if(!output.ontology['slot-values'][entity]){
                            output.ontology['slot-values'][entity] = [value]
                        }
                        else if(!output.ontology['slot-values'][entity].includes(value)){
                            output.ontology['slot-values'][entity].push(value)
                        }
                        // Adicionando no slot-values
                        if(!(entity in turn['slot-values'])){
                            turn['slot-values'][entity]=value;
                        }
                        else{
                            if(Array.isArray(turn['slot-values'][entity])){
                                if(!turn['slot-values'][entity].includes(value)){
                                    turn['slot-values'][entity].push(value);
                                }
                            }
                            // Se não for uma lista, preciso ou verificar se não é o mesmo valor, ou criar uma lista
                            else{
                                if(!(value===turn['slot-values'][entity])){
                                    let newList = [turn['slot-values'][entity],value];
                                    turn['slot-values'][entity] = newList;
                                }
                            }
                        }
                    }
                }
                turn["utterance_delex"] = final_delex;
            }
        }
        var file = new Blob([JSON.stringify(output,undefined,2)], {type: "application/json"});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"), url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
    return(
        <Grid item container direction="column" justifyContent="center" alignItems="center">
            <Typography style={{paddingTop:'13rem',paddingBottom:'2rem'}}>
                Parabéns, seu dataset está anotado!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<GetAppIcon />}
                onClick={() => download()}
                >
                Download
            </Button>
        </Grid>
    )
}
