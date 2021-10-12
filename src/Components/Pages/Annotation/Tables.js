import Grid from '@material-ui/core/Grid';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DialogTable from './DialogTable.js';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Tables(props) {
    const [table, setTable] = React.useState(0);
    return(
        <Grid item xs={5}>
            <Tabs value={table} indicatorColor="primary" textColor="primary" onChange={(event, n) => setTable(n)} aria-label="simple tabs example">
                <Tab label={"Ativos "+props.info.count.active} {...a11yProps(0)} />
                <Tab label={"Completos "+props.info.count.finished} {...a11yProps(1)} />
                <Tab label={"Deletados "+props.info.count.deleted} {...a11yProps(2)} />
            </Tabs>
            {table===0?<DialogTable type="active" {...props} />
            :table===1?<DialogTable type="finished" {...props} />
            :<DialogTable type="deleted" {...props} />}
        </Grid>
    )
}