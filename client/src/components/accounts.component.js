import React, { Component } from 'react';

import { Divider, Container, Button, Toolbar } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import Swal from 'sweetalert2';
import axios from 'axios';

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

    constructor(props) {
      super(props);
      this.lockAccount = this.lockAccount.bind(this);
      this.unlockAccount = this.unlockAccount.bind(this);
      this.addAccount = this.addAccount.bind(this);
    }

    addAccount() {
      Swal.fire({
        title: 'Create Account',
        html:
        '<input id="password" type="password" placeholder="Enter password for account" class="swal2-input">' + 
        '<input id="rpassword" type="password" placeholder="Re-Enter password for account" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: 'Create',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          try {
            var pwd = document.getElementById("password").value;
            if (pwd !== document.getElementById("rpassword").value) {
              throw new Error("Please enter the same password in both input boxes.")
            }

          return axios.post(`http://localhost:5000/personal/newAccount/`, {pwd: pwd}, {
              headers: {
                  provider: localStorage.getItem("web3_provider"),
              }
            })
            .then(response => {
              if (!response.data.newAccountAddress) {
                throw new Error(response)
              }
              this.props.loadAccounts(localStorage.getItem("web3_provider"));
              return response;
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Failed to create new account`
              )
            })
          } catch(err) {
            Swal.showValidationMessage(
              `Can't unlock account. ${err}`
            )
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if(result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
            Swal.fire({
              title: 'Account created successfully',
              text: `Account address: ${result.value.data.newAccountAddress}`,
              icon: 'success'
            })
          }
        })
    }

    unlockAccount() {
      Swal.fire({
        title: 'Unlock Account',
        html:
        '<input id="addr" placeholder="Enter account address" class="swal2-input">' +
        '<input id="password" type="password" placeholder="Enter password for account" class="swal2-input">' + 
        '<input id="rpassword" type="password" placeholder="Re-Enter password for account" class="swal2-input">',
        showCancelButton: true,
        confirmButtonText: 'Unlock',
        showLoaderOnConfirm: true,
        preConfirm: (addr) => {
          try {
            var pwd = document.getElementById("password").value;
            if (pwd !== document.getElementById("rpassword").value) {
              throw new Error("Please enter the same password in both input boxes.")
            }
            var acc = document.getElementById("addr").value;

          return axios.post(`http://localhost:5000/personal/unlockAccount/${acc}`, {pwd: pwd}, {
              headers: {
                  provider: localStorage.getItem("web3_provider"),
              }
            })
            .then(response => {
              if (!response.data.ok) {
                throw new Error(response)
              }
              return response;
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Failed to lock account ${acc}`
              )
            })
          } catch(err) {
            Swal.showValidationMessage(
              `Can't unlock account. ${err}`
            )
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if(result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
            Swal.fire({
              title: 'Unlocked account successfully',
              icon: 'success'
            })
          }
        })
    }


    lockAccount() {
      Swal.fire({
        title: 'Lock Account',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          placeholder: "Enter account address"
        },
        showCancelButton: true,
        confirmButtonText: 'Lock',
        showLoaderOnConfirm: true,
        preConfirm: (addr) => {
          return axios.post(`http://localhost:5000/personal/lockAccount/${addr}`, {}, {
              headers: {
                  provider: localStorage.getItem("web3_provider"),
              }
            })
            .then(response => {
              if (!response.data.ok) {
                throw new Error(response)
              }
              return response;
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Failed to lock account ${addr}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log(result.dismiss)
          if(result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
            Swal.fire({
              title: 'Locked account successfully',
              icon: 'success'
            })
          }
        })
    }

    render() {

        const { classes } = this.props;

        return (
          <Container>
            <List
              subheader={
                  <Toolbar component="div">
                      <div className={classes.title}><h1>Accounts</h1></div>
                      <Button variant="text" color="primary" onClick={this.addAccount}>Add Account</Button>
                      <Button variant="text" color="secondary" onClick={this.unlockAccount}>Unlock Account</Button>
                      <Button variant="text" style={{color: "green"}} onClick={this.lockAccount}>Lock Account</Button>
                  </Toolbar>
              }
            >
              <Divider/>
              {this.props.accounts.map((account) => (
                <ListItem key={account.address}>
                    <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                    <ListItemText 
                      primary={<b>{account.address}</b>}
                      secondary={"Balance: " + account.balance + " ETH  |  Transactions Count:" + account.count}
                    />
                </ListItem>
              ))}
            </List>
          </Container>

        );
    }
}

Accounts.propTypes = {
  accounts: PropTypes.object.isRequired,
  loadAccounts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  accounts: state.app.accounts
});

export default connect(mapStateToProps, {loadAccounts})(withStyles(styles, {withTheme: true})(Accounts));