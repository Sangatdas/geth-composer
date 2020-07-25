import React, { Component } from 'react';

import { Container, TextField, Button, Card, CardActions, CardContent, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Swal from 'sweetalert2';

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
        Swal.fire({
            title: "Confirm Transaction",
            text: "Do you confirm?",
            icon: "question",
            confirmButtonText: 'Confirm',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: (addr) => {
                return axios
                .post('http://localhost:5000/eth/transaction/', this.state, {
                    headers: {
                        provider: localStorage.getItem("web3_provider"),
                    }
                })
                .then((response) => {
                    return response;
                })
                .catch((err) => {
                    Swal.showValidationMessage(
                        `Failed to submit transaction.`
                    )                    
                });
    
            },
            allowOutsideClick: () => !Swal.isLoading(),
        })
        .then(result => {
            if(result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
                Swal.fire({
                  title: 'Transaction submitted successfully',
                  text: `Transaction: ${result.value.data.TxHash.transactionHash}`,
                  icon: 'success'
                })
            }    
        })
    }
    
    render() {

        const { classes } = this.props;

        return (
            <Container>
                <Card variant="outlined">
                    <Typography variant="h6" style={{margin:"5px"}}>
                        Create Transaction
                    </Typography>
                    <Divider/>
                    <form onSubmit={this.handleOnSubmit}>
                        <CardContent>
                            <TextField id="from" label="From Address" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="to" label="To Address" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="value" label="Value" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="gas" label="Gas" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="gasprice" label="Gas Price" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="data" label="Data" fullWidth className={ classes.input } onChange={this.handleOnChange} />
                            <TextField id="nonce" label="Nonce" fullWidth className={ classes.input }  onChange={this.handleOnChange} />
                            <TextField id="password" type="password" label="Password" fullWidth className={ classes.input }  onChange={this.handleOnChange} />
                        </CardContent>
                        <CardActions>
                            <Button type="submit" variant="contained" color="primary">Send Transaction</Button>
                        </CardActions>
                    </form>
                </Card>
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