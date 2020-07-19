import React, { Component } from 'react';

import { Tabs, Tab, Paper, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import PendingTransaction from './transactions.pending.view.component';
import TransactionReceipt from './transaction.receipt.view.component';
import Transaction from './transaction.view.component';
import CreateTransaction from './transaction.create.component';

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

class Transactions extends Component {
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
                        style={{margin:'0'}}
                    >
                        <Tab label="Pending Transactions" {...this.a11yProps(0)} />
                        <Tab label="Transaction Receipt" {...this.a11yProps(1)} />
                        <Tab label="Transaction Info" {...this.a11yProps(2)} />
                        <Tab label="Send Transaction" {...this.a11yProps(3)} />
                    </Tabs>
                </Paper>
                <TabPanel value={this.state.value} index={0}>
                    <PendingTransaction />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <TransactionReceipt />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <Transaction />
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <CreateTransaction />
                </TabPanel>
            </div>
        );
    }

}

export default withStyles(styles, {withTheme: true})(Transactions);