import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    return(
        <footer>
            <Typography variant="body2" align="center" color="textSecondary" component="p">
                {/* <ink href="#" color="inherit" onClick={() => {setOpenHelp(true)}}>
                    Sobre | Ajuda
                </Link>L */}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    IC do prof. Julio
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
}