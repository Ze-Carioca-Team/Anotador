import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';


import Tables from './Annotation/Tables.js';
import DialogCard from './Annotation/DialogCard.js';

export default function Annotation(props) {
    return(
        <Grid item container xs={12} direction="row" justifyContent="flex-start" alignItems="center" spacing={1} style={{paddingTop:'1rem'}}>       
            <Tables {...props}/>
            <Grid item container xs={7} direction="column" justifyContent="flex-start" alignItems="center">
                {props.info.selected!==-1?
                    <DialogCard {...props}/>
                :
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography style={{color: 'grey'}}>
                                    Intenções
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Selecione um dialogo para começar
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}