import Link from '@material-ui/core/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    return(
        <footer>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/ZeCariocaUnicamp/Assis">
                    Zé Carioca Team (Github)
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    )
}