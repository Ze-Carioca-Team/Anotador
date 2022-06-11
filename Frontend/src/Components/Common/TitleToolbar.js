import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.default',
    },
}));

export default function TitleToolbar(props){
    const theme = useTheme();
    const classes = useStyles();
    const [openHelp, setOpenHelp] = React.useState(false);
    const changeTheme=()=>{
        props.setInfo({...props.info, theme: props.info.theme==='light'?'dark':'light'})
    }
    return(
        <Toolbar className={classes.toolbar}>
            <Dialog open={openHelp} onClose={() => {setOpenHelp(false)}}>
                <DialogTitle>{"Sobre o IAnotador"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus quam dapibus massa viverra, sed convallis dolor bibendum. Morbi ornare eros vel orci porttitor, sit amet molestie nisl varius. Curabitur velit dolor, egestas quis ex eu, commodo mattis eros. In tortor magna, vulputate maximus convallis sit amet, suscipit in mauris. Praesent tempor eleifend enim ut convallis. Nam vehicula est vitae turpis fringilla vestibulum a lacinia sem. Fusce varius vulputate metus, malesuada sollicitudin arcu pulvinar id. Nam eleifend ornare erat, eu lacinia nibh iaculis ac. Donec sollicitudin risus in orci lacinia accumsan. Proin vulputate dictum viverra.
                        Feito com ❤️ pelo Andreis. Baseado no Design do Henrique.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item xs={6} container  direction="row" justifyContent="flex-start" alignItems="center">
                    <Button size="small" onClick={() => {setOpenHelp(true)}}>Ajuda</Button>
                </Grid>
                <Grid item xs={2} container direction="row" justifyContent="center" alignItems="center" style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Avatar src='https://dandonota.files.wordpress.com/2008/10/machado.jpg'/>
                    <Typography component="h2" variant="h5" color="inherit" align="center" noWrap style={{fontFamily: "Bookman Old Style", fontVariant: 'small-caps'}}>
                        &nbsp;Assis
                    </Typography>
                </Grid>
                <Grid item xs={6} container  direction="row" justifyContent="flex-end" alignItems="center">
                    <IconButton onClick={changeTheme}>
                        {props.info.theme==='light'?<Brightness2Icon />:<WbSunnyIcon />}
                    </IconButton>
                    <IconButton href="https://github.com/ZeCariocaUnicamp/Assis" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon />
                    </IconButton>
                    <Select size="small" value="pt">
                        <MenuItem value="pt">PT</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </Toolbar>
    )
}