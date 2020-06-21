import React, { Component } from 'react';

import Search from '../commons/search';
import { Paper, Typography } from '@material-ui/core';

import axios from 'axios';

class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            tx: {},
            searchClicked: false
        }

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    handleSearchClick(e, tx) {
        e.preventDefault();
        axios.create({
          baseURL: 'http://localhost:5000/eth/transaction/',
          timeout: 5000,
          headers: {'provider': 'http://localhost:8545'}
        }).get(this.state.hash)
          .then((response) => {
            this.setState({
                tx: response.data,
                searchClicked: true
            });
          })
          .catch((err) => {
            console.log(err);
          })
    }

    setValue(value) {
        this.setState({
            hash: value
        })
    }

    render() {
        return(
            <div>
                <Search handleSearchClick={this.handleSearchClick} setValue={this.setValue} value={this.state.hash}/>
                <Paper style={{margin: '3%'}}>
                    {this.state.searchClicked?(
                        this.state.tx?(
                        <Typography>{this.state.tx.blockHash}</Typography>
                        ):<Typography variant="h2" align='center'>
                        <p>No Transactions found. Please try again with a different hash.</p>
                        </Typography>):null}
                </Paper>
            </div>
        );
    }

}

export default Transaction;