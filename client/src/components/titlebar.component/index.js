import React, { Component } from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Search from './search';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
});

class TitleBar extends Component {
   
    render() {
        const { classes } = this.props;
        return (
            <AppBar position='static' className={classes.root}>
                <Toolbar>
                    <Typography className={classes.title} variant='h6' noWrap>
                        Geth Composer
                    </Typography>
                    <Search />
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(TitleBar);