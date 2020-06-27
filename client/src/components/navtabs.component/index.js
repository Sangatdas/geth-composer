import React, { Component } from 'react';

import { Tabs, Tab, AppBar, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import Accounts from '../accounts.component';
import Network from '../network.component';
import Transaction from '../transaction.component';
import Admin from '../admin.component';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
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
            component="div"
            variant="body2"
        >
            {value === index && (
            <Box>
                <Typography component={"p"} variant={"body2"}>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

class NavTabs extends Component {

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
            <div className={classes.root} >
                <AppBar position="static" >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        aria-label="nav tabs example"
                        centered
                    >
                        <Tab label="Network" {...this.a11yProps(0)} />
                        <Tab label="Admin" {...this.a11yProps(1)} />
                        <Tab label="Accounts" {...this.a11yProps(2)} />
                        <Tab label="Transactions" {...this.a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <Network />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <Admin />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <Accounts />
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <Transaction />
                </TabPanel>
             </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NavTabs);