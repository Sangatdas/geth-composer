import React, { Component } from 'react';

import Search from '../commons/search';

import axios from 'axios';

class TransactionReceipt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tx: ''
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
        }).get(this.state.tx+"/receipt/")
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
    }

    setValue(value) {
        this.setState({
            tx: value
        })
    }

    render() {
        return(
            <Search handleSearchClick={this.handleSearchClick} setValue={this.setValue} value={this.state.tx}/>
        );
    }

}

export default TransactionReceipt;