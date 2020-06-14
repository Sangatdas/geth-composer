import React, { Component } from 'react';

import { InputBase, Button, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        border: '0.5px solid rgba(0, 0, 0, .125)',
        width: '45%'
    },
    search: {
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
    searchIcon: {
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
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: 'inherit',
      [theme.breakpoints.up('sm')]: {
        width: '70ch',
      },
    },
});


class Search extends Component {

    constructor(props) {
        super(props);
  
        this.handleSearchChange = this.handleSearchChange.bind(this);

    }
  
    handleSearchChange(e) {
      e.preventDefault();
      this.props.setValue(e.target.value);
    }

    render() {
        const { classes } = this.props;
        return (
            <Toolbar className={classes.root}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        id="tx-search"
                        placeholder="Search for transaction…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={this.handleSearchChange}
                        value={this.props.value}
                    />
                </div>
                <Button variant="contained" color="secondary" onClick={this.props.handleSearchClick}>Search</Button>
            </Toolbar>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Search);