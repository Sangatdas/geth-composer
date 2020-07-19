import React, { Component } from 'react';

import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import Search from './commons/search';

import axios from 'axios';
import { Paper, Typography } from '@material-ui/core';

class TransactionReceipt extends Component {

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
        }).get(this.state.hash+"/receipt/")
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
                {this.state.searchClicked?(
                <Paper style={{margin: '3%'}} variant="outlined">
                {this.state.tx?(
                    <div>
                        <Typography variant="h6" style={{margin:"10px"}}>
                            Transaction Hash: {this.state.tx.transactionHash}
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
                                    primary="Root"
                                    secondary={this.state.tx.root}
                                />
                            </ListItem>
                        
                            <ListItem>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                <ListItemText 
                                    primary="Cummulative Gas Used"
                                    secondary={this.state.tx.cumulativeGasUsed}
                                />
                            </ListItem>
                        
                            <ListItem>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                <ListItemText 
                                    primary="Gas Used"
                                    secondary={this.state.tx.gasUsed}
                                />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><SettingsIcon/></ListItemIcon>
                                <ListItemText 
                                    primary="Contract Address"
                                    secondary={this.state.tx.contractAddress}
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

export default TransactionReceipt;