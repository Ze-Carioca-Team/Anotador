import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'center',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        marginLeft: '3rem',
        marginRight: '3rem',
    },
}));

export default function TitleToolbar() {
    const classes = useStyles();
    const [openHelp, setOpenHelp] = React.useState(false);
    return(
        <Toolbar className={classes.toolbar}>
            <Button size="small" onClick={() => {setOpenHelp(true)}}>Sobre | Ajuda</Button>
            <Dialog
                open={openHelp}
                onClose={() => {setOpenHelp(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Sobre o IAnotador"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus quam dapibus massa viverra, sed convallis dolor bibendum. Morbi ornare eros vel orci porttitor, sit amet molestie nisl varius. Curabitur velit dolor, egestas quis ex eu, commodo mattis eros. In tortor magna, vulputate maximus convallis sit amet, suscipit in mauris. Praesent tempor eleifend enim ut convallis. Nam vehicula est vitae turpis fringilla vestibulum a lacinia sem. Fusce varius vulputate metus, malesuada sollicitudin arcu pulvinar id. Nam eleifend ornare erat, eu lacinia nibh iaculis ac. Donec sollicitudin risus in orci lacinia accumsan. Proin vulputate dictum viverra.
                        Feito com ❤️ pelo Andreis. Baseado no Design do Henrique.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                align="center"
                noWrap
                className={classes.toolbarTitle}
                >
                IAnotador
            </Typography>
            <IconButton>
                <GitHubIcon />
            </IconButton>
            <Button variant="outlined" size="small">
                Source
            </Button>
        </Toolbar>
    )
}