import React, { Component } from 'react';

import { Divider, Container, Button, Toolbar } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadAccounts } from '../actions/loadActions';
 
const styles = (theme) => ({
    title: {
      flexGrow: 1,

    },
});

class Accounts extends Component {

    render() {

        const { classes } = this.props;

        return (
          <Container>
            <List
              subheader={
                  <Toolbar component="div">
                      <div className={classes.title}><h1>Accounts</h1></div>
                      <Button variant="text" color="primary">Add Account</Button>
                  </Toolbar>
              }
            >
              <Divider/>
              {this.props.accounts.map((account) => (
                <ListItem key={account.address}>
                    <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                    <ListItemText 
                      primary={<b>{account.address}</b>}
                      secondary={"Balance: " + account.balance + "  |  Transactions Count:" + account.count}
                    />
                </ListItem>
              ))}
            </List>
          </Container>

        );
    }
}

Accounts.propTypes = {
  accounts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  accounts: state.app.accounts
});

export default connect(mapStateToProps, {loadAccounts})(withStyles(styles, {withTheme: true})(Accounts));