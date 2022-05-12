import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import React from 'react';
import Typography from '@mui/material/Typography';


function SideCard(props: any){
  return(
    <Grid item xs={6}>
      <Card>
        <CardActionArea href={"https://unicamp-cit.notion.site/unicamp-cit/CI-T-Unicamp-ca7a3fc10d9a43f09a14c5dd4d31e554"}>
          <div style={{display: 'flex'}}>
            <CardMedia style={{width: 100}} image={props.image}/>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.text}
                </Typography>
              </CardContent>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default function Cards(){
  return(
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} style={{paddingBottom: '2rem', textAlign: 'left'}}>   
      <SideCard title="Tutorial" text="Aprenda a usar a ferramenta" image="https://www.pythontutorial.net/wp-content/uploads/2020/11/tkinter-tutorial.png"/>
      <SideCard title="Metodologia" text="Como decidir entidades e intenções?" image="https://www.mahdimamouri.com/media/consulting/nlp.png"/>
      <SideCard title="Documentação" text="Como alterar a API e funções" image="https://code.visualstudio.com/assets/docs/languages/javascript/overview.png"/>
      <SideCard title="Equipe" text="Conheça nossa equipe de pesquisa!" image="https://ic.unicamp.br/~jreis/media/image1.png"/>
    </Grid>
  )
}