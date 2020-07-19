import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import MenuBar from './components/menubar.component';
import Network from './components/network.component';
import Account from './components/accounts.component';
import Admin from './components/admin.component';
import Transaction from './components/transactions.component';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {loadGethInfo, loadAdminInfo, loadAccounts, loadPeers } from './actions/loadActions';

class App extends Component {

  constructor(props) {
    super(props);
    props.loadGethInfo(props.provider);
    props.loadAdminInfo(props.provider);
    props.loadAccounts(props.provider);

  }

  render() {
    return (
      <Router>
          <MenuBar />
          {this.props.provider?(
            <div>
              <Route exact path="/"><Network/></Route>
              <Route path="/accounts"><Account/></Route>
              <Route path="/admin"><Admin/></Route>
              <Route path="/transactions"><Transaction/></Route>
            </div>
          ):(  
            <Typography variant="h2" align='center'>
              <p>No provider set</p>
            </Typography>
          )}
      </Router>
    );  
  }
}

App.propTypes = {
  loadGethInfo: PropTypes.func.isRequired,
  loadAdminInfo: PropTypes.func.isRequired,
  loadAccounts: PropTypes.func.isRequired,
  loadPeers: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  provider: state.app.provider
});

export default connect(mapStateToProps, {loadGethInfo, loadAdminInfo, loadAccounts, loadPeers})(App);
