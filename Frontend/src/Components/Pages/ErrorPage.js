import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ErrorPage(props) {
    return(
        <Grid item container direction="column" justifyContent="center" alignItems="center">
            <Typography style={{paddingTop:'13rem',paddingBottom:'2rem'}}>
                Olá, se você está vendo essa página, há algum problema na navegação dos passos. Por favor informe os administradores sobre o problema.
            </Typography>
        </Grid>
    )
}