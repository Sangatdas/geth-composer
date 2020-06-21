import React, { Component } from 'react';

import { Container, Typography } from '@material-ui/core';

import TransactionExpansionPanel from './TransactionExpansionPanel';

import axios from 'axios';

class PendingTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingTransactions: []
        }
    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/eth/',
            timeout: 5000,
            headers: {'provider': 'http://localhost:8545'}
          }).get('transaction')
            .then((response) => {
              this.setState({
                  pendingTransactions: response.data.pendingTransactions
              });
            })
            .catch((err) => {
              console.log(err);
            });
    }

    render() {
        return(
            <Container>
                {this.state.pendingTransactions.length>0?
                    this.state.pendingTransactions.map((transaction) => (
                        <TransactionExpansionPanel details={transaction} title={transaction.hash}/>
                    )):<Typography variant="h2" align='center'>
                            <p>No Pending Transactions</p>
                        </Typography>
                }
            </Container>
        );
    }
}

export default PendingTransaction;