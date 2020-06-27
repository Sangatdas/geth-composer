import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
                    {this.props.accounts.map((account) => (
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

Accounts.propTypes = {
  accounts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  accounts: state.app.accounts
});

export default connect(mapStateToProps, {})(withStyles(styles, {withTheme: true})(Accounts));