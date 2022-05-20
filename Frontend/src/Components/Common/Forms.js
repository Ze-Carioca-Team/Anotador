import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export default function Forms(props){
    const close=()=>{
        props.setInfo({...props.info, forms: false})
    }
    return(
        <Dialog open={props.info.forms} onClose={close}>
            <DialogTitle>{"Ajude a melhorar o Anotador!"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Olá! Seja bem-vindo ao ASSIS, a ferramenta anotadora de mensagens para NLP! Para avaliar a usabilidade do nosso aplicativo, estamos pedindo para os usuários completarem um questionário de usabilidade no final da anotação.
                    <br /><br />
                    <b>Se você nunca utilizou a ferramenta antes</b>, basta clicar no botão ajuda ou nos tutoriais. Disponibilizamos alguns <b>dados de exemplo</b> também!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" autoFocus onClick={close}>
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>
    )
}