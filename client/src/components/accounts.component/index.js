import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

  
const styles = (theme) => ({
    table: {
      minWidth: 700,
    },
});

class Accounts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accounts: []
        }


    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/api/',
            timeout: 5000,
            headers: {'provider': 'http://localhost:8545'}
          }).get('accounts')
            .then((response) => {   
              this.setState({
                  accounts: response.data
              });
            })
            .catch((err) => {
              console.log(err);
            });        
    }

    render() {

        const { classes } = this.props;

        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Account Address</StyledTableCell>
                    <StyledTableCell align="left">Balance</StyledTableCell>
                    <StyledTableCell align="left">Transaction Count</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.accounts.map((account) => (
                    <StyledTableRow key={account.address}>
                        <StyledTableCell component="th" scope="row">
                        {account.address}
                        </StyledTableCell>
                        <StyledTableCell align="left">{account.balance}</StyledTableCell>
                        <StyledTableCell align="left">{account.count}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Accounts);