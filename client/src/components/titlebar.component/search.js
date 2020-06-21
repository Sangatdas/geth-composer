import React, { Component } from 'react';

import { InputBase, Button, Toolbar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { fade, withStyles } from '@material-ui/core/styles';

import axios from 'axios';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    settings: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    settingsIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
});


class Search extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
          tx: ''
        }
  
        this.handleSetProviderChange = this.handleSetProviderChange.bind(this);
        this.handleSetProviderClick = this.handleSetProviderClick.bind(this);
    }
  
    handleSetProviderChange(e) {
        e.preventDefault();
        this.setState({
          tx: e.target.value
        })
    }
  
    handleSetProviderClick(e) {
        e.preventDefault();
        axios.create({
          baseURL: 'http://localhost:5000/eth/transaction/',
          timeout: 5000,
          headers: {'provider': 'http://localhost:8545'}
        }).get(this.state.tx)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
    }

    render() {
        const { classes } = this.props;
        return (
            <Toolbar>
                <div className={classes.settings}>
                    <div className={classes.settingsIcon}>
                        <SettingsIcon />
                    </div>
                    <InputBase
                        id="tx-search"
                        placeholder="Set current provider as…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.handleSetProviderChange}
                        value={this.state.tx}
                        autoComplete="on"
                    />
                </div>
                <Button variant="contained" color="secondary" onClick={this.handleSetProviderClick}>Set Provider</Button>
            </Toolbar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Search);