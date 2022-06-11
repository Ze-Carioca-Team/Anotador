import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Footer from './Common/Footer.js';
import TitleToolbar from './Common/TitleToolbar.js';
import Forms from './Common/Forms.js';
import AnnotationPage from './Pages/AnnotationPage.js';
import LearningPage from './Pages/LearningPage.js';
import DownloadPage from './Pages/DownloadPage.js';
import UploadPage from './Pages/UploadPage.js';
import ErrorPage from './Pages/ErrorPage.js';


const lighttheme = createTheme({
    palette: {
        type: "light",
        main: '#123'
    }
});
const darktheme = createTheme({
    palette: {
        type: "dark",
    }
});

export default function Page() {
    const [info, setInfo] = React.useState({
      filename: '',
      step: -1,
      selected: -1,
      data: {},
      meta: [],
      intention: -1,
      intentions: [],
      count: {active: 0, finished: 0, deleted: 0},
      entity: -1,
      topic: -1,
      topics: [],
      drawer: false,
      toolsetOpen: false,
      toolsetSelected: 0,
      edit: -1,
      entities: [],
      learning: -1,
      dataLearning: {},
      metaLearning: [],
      forms: true,
      theme: useMediaQuery('(prefers-color-scheme: dark)')?'dark':'light',
      color:'red',
    });
    function handleStep(nstep){
      setInfo({...info, step: nstep});
    }
    
    const sendInfo = {info, setInfo}
    return (
        <MuiThemeProvider theme={info.theme === 'light' ? lighttheme : darktheme}>
            {console.log(info)}
            <CssBaseline />
            <div style={{minHeight:'97vh'}}>
                <Container maxWidth="lg">
                    <TitleToolbar {...sendInfo}/>
                </Container>
                <div style={{paddingRight:'1rem',paddingLeft:'3rem'}}>
                    {0 <= info.step && info.step <= 3? 
                        <main>
                            <Grid container xs={12} direction="column" justifyContent="flex-start" alignItems="center">
                                <Grid item xs={6}>
                                    <Stepper activeStep={info.step} alternativeLabel style={{ backgroundColor: "transparent" }}>
                                        <Step key={0}>
                                            <StepLabel>Anotador</StepLabel>
                                        </Step>
                                        <Step key={1}>
                                            <StepLabel>Baixar</StepLabel>
                                        </Step>
                                    </Stepper>
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                        <Button onClick={() => {handleStep(info.step-1)}}>Voltar</Button>
                                        <Button disabled={info.step>=2} onClick={() => {handleStep(info.step+1)}}>Avançar</Button>
                                    </ButtonGroup>
                                </Grid>
                                {info.step === 0?
                                    <AnnotationPage {...sendInfo}/>
                                :info.step === 1?
                                    <DownloadPage {...sendInfo}/>
                                :
                                    <ErrorPage />
                                }
                            </Grid>
                        </main>
                    :
                        <UploadPage {...sendInfo} />
                    }
                </div>
            </div>
            <Footer />
        </MuiThemeProvider>
	);
}