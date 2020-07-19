import React, { Component } from 'react';

import { InputBase, Button, Toolbar } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { fade, withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setProvider } from '../actions/setActions';
import { loadGethInfo, loadAdminInfo, loadAccounts } from '../actions/loadActions';

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
          provider: localStorage.getItem("web3_provider")
        }
  
        this.handleSetProviderChange = this.handleSetProviderChange.bind(this);
        this.handleSetProviderClick = this.handleSetProviderClick.bind(this);
    }
  
    handleSetProviderChange(e) {
        e.preventDefault();
        this.setState({
          provider: e.target.value
        })
    }
  
    handleSetProviderClick(e) {
        e.preventDefault();
        this.props.loadGethInfo(this.state.provider);
        this.props.loadAdminInfo(this.state.provider);
        this.props.loadAccounts(this.state.provider);
        this.props.setProvider(this.state.provider);
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
                        value={this.state.provider}
                        autoComplete="off"
                    />
                </div>
                <Button variant="contained" color="secondary" onClick={this.handleSetProviderClick}>Set Provider</Button>
            </Toolbar>
        );
    }
}

Search.propTypes = {
  setProvider: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  provider: state.app.provider
});


export default connect(mapStateToProps, {setProvider, loadGethInfo, loadAdminInfo, loadAccounts})(withStyles(styles, { withTheme: true })(Search));