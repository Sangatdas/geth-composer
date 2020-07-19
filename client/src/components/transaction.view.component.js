import React, { Component } from 'react';

import Search from './commons/search';
import { Paper, Typography } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
          headers: {'provider': this.props.provider}
        }).get(this.state.hash)
          .then((response) => {
            this.setState({
                tx: response.data,
                searchClicked: true
            });
            console.log(tx);
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
                {this.state.searchClicked?(
                <Paper style={{margin: '3%'}} variant="outlined">
                        {this.state.tx?(
                            <div>
                                <Typography variant="h6" style={{margin:"10px"}}>
                                    Transaction Hash: {this.state.tx.hash}
                                </Typography>
                                <List>
                                    
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Block Hash"
                                            secondary={this.state.tx.blockHash}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Block Number"
                                            secondary={this.state.tx.blockNumber}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="From"
                                            secondary={this.state.tx.from}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="To"
                                            secondary={this.state.tx.to}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Value"
                                            secondary={this.state.tx.value}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Gas"
                                            secondary={this.state.tx.gas}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Gas Price"
                                            secondary={this.state.tx.gasPrice}
                                        />
                                    </ListItem>
                                
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Input"
                                            secondary={this.state.tx.input}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Nonce"
                                            secondary={this.state.tx.nonce}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Transaction Index"
                                            secondary={this.state.tx.transactionIndex}
                                        />
                                    </ListItem>
                                </List>
                            </div>
                        ):<Typography variant="h2" align='center'>
                        <p>No Transactions found. Please try again with a different hash.</p>
                        </Typography>
                        }
                </Paper>
                ):null}
            </div>
        );
    }

}

Transaction.propTypes = {
    provider: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    provider: state.app.provider
});

export default connect(mapStateToProps, {})(Transaction);