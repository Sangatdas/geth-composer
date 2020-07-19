import React, { Component } from 'react';

import { Container, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';

const styles = (theme) => ({
    input: {
        margin: theme.spacing(2, 0),
    }
});

class CreateTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            value: '',
            gas: null,
            gasprice: null,
            data: null,
            nonce: null,
            password: '',
            tx: {},
            // denomination: 'Wei'
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault();
        var pwd = prompt("Enter password of account");
        this.setState({password: pwd});
        console.log(this.state);
        axios
            .post('http://localhost:5000/eth/transaction/', this.state)
            .then((response) => {
                this.setState({
                    tx: response.data,
                    searchClicked: true
                });
                alert("Transaction Hash: " + this.state.tx.transactionHash + "\nBlock Hash: " + this.state.tx.blockHash);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    render() {

        const { classes } = this.props;

        return (
            <Container>
                <form onSubmit={this.handleOnSubmit}>
                    <TextField id="from" label="From Address" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="to" label="To Address" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="value" label="Value" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="gas" label="Gas" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="gasprice" label="Gas Price" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="data" label="Data" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                    <TextField id="nonce" label="Nonce" fullWidth className={ classes.input }  onChange={this.handleOnChange} />
                    <TextField id="password" type="password" label="Nonce" fullWidth className={ classes.input }  onChange={this.handleOnChange} />
                    <Button type="submit" variant="contained" color="primary">Send Transaction</Button>
                </form>
            </Container>
        );
    }
}

CreateTransaction.propTypes = {
    provider: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    provider: state.app.provider
});

export default connect(mapStateToProps, {})(withStyles(styles, {withTheme: true})(CreateTransaction));