import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditText(props){
    const [text, setText] = React.useState(getText());
    const changeText = (event) => {
        setText(event.target.value);
    };
    function getText(){
        let text = props.info.meta[props.info.selected].turns[props.info.edit].entities;
        return text.split("&&&").map((entry,i) => i!==0?entry.slice(entry.indexOf('###')):entry).join('').replaceAll("###","")
    }
    const close = () => {
        props.setInfo({...props.info, edit:-1});
    };
    const reload = () => {
        let newMeta = props.info.meta;
        newMeta[props.info.selected].turns[props.info.edit].entities = props.info.data.dialogs[props.info.selected].turns[props.info.edit].utterance;
        props.setInfo({...props.info, meta: newMeta, edit:-1});
    };
    const save = () => {
        let newMeta = props.info.meta;
        newMeta[props.info.selected].turns[props.info.edit].entities=text;
        props.setInfo({...props.info, meta: newMeta, edit:-1});
    }
    return (
        <Dialog open={props.info.edit!==-1} fullWidth>
        <DialogTitle>Editar Turno</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            label="Texto"
            multiline
            value={text}
            onChange={changeText}
            fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={reload} color="primary">
                Recarregar
            </Button>
            <Button onClick={close} color="primary">
                Cancelar
            </Button>
            <Button onClick={save} color="primary">
                Salvar
            </Button>
        </DialogActions>
        </Dialog>
    );
}