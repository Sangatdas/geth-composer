import React, { Component } from "react";

import { Tabs, Tab, Paper, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import NodeInfo from "./nodeinfo.component";
import Peers from './peers.component';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}


class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleChange(event, newValue) {
        this.setState({
            value: newValue
        });
    };
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.root} position="static">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        aria-label="nav tabs example"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Node Information" {...this.a11yProps(0)} />
                        <Tab label="Peers" {...this.a11yProps(1)} />
                    </Tabs>
                </Paper>
                <TabPanel value={this.state.value} index={0}>
                    <NodeInfo />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <Peers />
                </TabPanel>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Admin);