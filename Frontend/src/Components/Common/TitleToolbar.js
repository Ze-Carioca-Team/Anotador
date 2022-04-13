// Generic imports modules should be done by alphabetic order
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

export default function TitleToolbar() {
    const classes = useStyles();
    const [help, setHelp] = React.useState(false);
    const openHelp=()=>{setHelp(true)};
    const closeHelp=()=>{setHelp(false)};
    return(
        <Toolbar className={classes.toolbar}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item xs={1}>
                    <Button size="small" onClick={openHelp}>Ajuda</Button>
                    <Dialog open={openHelp} onClose={closeHelp}>
                        <DialogTitle>Sobre o Assis</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus quam dapibus massa viverra, sed convallis dolor bibendum. Morbi ornare eros vel orci porttitor, sit amet molestie nisl varius. Curabitur velit dolor, egestas quis ex eu, commodo mattis eros. In tortor magna, vulputate maximus convallis sit amet, suscipit in mauris. Praesent tempor eleifend enim ut convallis. Nam vehicula est vitae turpis fringilla vestibulum a lacinia sem. Fusce varius vulputate metus, malesuada sollicitudin arcu pulvinar id. Nam eleifend ornare erat, eu lacinia nibh iaculis ac. Donec sollicitudin risus in orci lacinia accumsan. Proin vulputate dictum viverra.
                                Feito com ❤️ pelo Andreis. Baseado no Design do Henrique.
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Grid>
                <Grid xs={10} item container direction="row" justifyContent="center" alignItems="center">
                    <Avatar src='https://dandonota.files.wordpress.com/2008/10/machado.jpg'/>
                    <Typography component="h2" variant="h5" color="inherit" align="center" noWrap style={{fontFamily: "Bookman Old Style", fontVariant: 'small-caps'}}>
                        Assis
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Select size="small" value="pt">
                        <MenuItem value="pt">PT</MenuItem>
                        <MenuItem value="en">EN</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </Toolbar>
    )
}