import React, { Component } from 'react';

import { Container, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    input: {
        margin: theme.spacing(2, 0),
    }
});

class CreateTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fromAddr: '',
            toAddr: '',
            value: '',
            gas: null,
            gasprice: null,
            data: null,
            nonce: null,
            denomination: 'Wei'
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    
    render() {

        const { classes } = this.props;

        return (
            <Container>
                <form>
                    <TextField id="fromAddr" label="From Address" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off"/>
                    <TextField id="toAddr" label="To Address" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off" />
                    <TextField id="value" label="Value" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off" />
                    <TextField id="gas" label="Gas" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off" />
                    <TextField id="gasprice" label="Gas Price" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off" />
                    <TextField id="data" label="Data" fullWidth className={ classes.input } onChange={this.handleOnChange} autoComplete="off" />
                    <TextField id="nonce" label="Nonce" fullWidth className={ classes.input }  onChange={this.handleOnChange} autoComplete="off" />
                    <Button type="submit" variant="contained" color="primary">Send Transaction</Button>
                </form>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(CreateTransaction);