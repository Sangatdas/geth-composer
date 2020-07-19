import React, { Component } from 'react';

import { Container, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core/';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

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
                    <List subheader={<ListSubheader>Pending Transactions</ListSubheader>}>
                        {this.state.pendingTransactions.map((transaction) => (
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography><b>{transaction.hash}</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <List>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="From"
                                                secondary={transaction.from}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="To"
                                                secondary={transaction.to}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="Nonce"
                                                secondary={transaction.nonce}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="Gas"
                                                secondary={transaction.gas}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="Gas Price"
                                                secondary={transaction.gasPrice}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="Value"
                                                secondary={transaction.value}
                                            />
                                        </ListItem>
                                       
                                        <ListItem>
                                            <ListItemIcon><SettingsIcon/></ListItemIcon>
                                            <ListItemText 
                                                primary="Input"
                                                secondary={transaction.input}
                                            />
                                        </ListItem>
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </List>
                    :(<Typography variant="h2" align='center'>
                            <p>No Pending Transactions</p>
                        </Typography>)
                }
            </Container>
        );
    }
}

export default PendingTransaction;