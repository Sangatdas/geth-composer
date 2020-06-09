import React, { Component } from 'react';

import { Tabs, Tab, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    }
});

class NavTabs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event, newValue) {
        this.setState({
            value: newValue
        });
    };
    
    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root} position="static">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    aria-label="nav tabs example"
                    textColor="primary"
                    centered
                >
                    <Tab label="Accounts" />
                    <Tab label="Network"/>
                    <Tab label="Smart Contracts"/>
                    <Tab label="Admin" />
                    <Tab label="Transactions"/>
                </Tabs>
            </Paper>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NavTabs);