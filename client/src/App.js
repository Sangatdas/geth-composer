import React, { Component } from 'react';

import './App.css';

import { Typography } from '@material-ui/core';

import TitleBar from './components/titlebar.component';
import NavTabs from './components/navtabs.component';

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
      <div>
          <TitleBar />
          {this.props.provider?
            <NavTabs />:
            <Typography variant="h2" align='center'>
              <p>No provider set</p>
            </Typography>
          }
      </div>
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
