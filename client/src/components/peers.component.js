import React, { Component } from "react";

import { Container, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core/';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

import axios from 'axios';

class Peers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            peers: []
        }
    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/admin/',
            timeout: 5000,
            headers: {'provider': 'http://localhost:8545'}
          }).get('peers')
            .then((response) => {
              this.setState({
                  peers: response.data
              });
            })
            .catch((err) => {
              console.log(err);
            });
    }

    render() {
        return (
            <Container>
                {this.state.peers.length>0?
                    <List subheader={<ListSubheader>Peers</ListSubheader>}>
                    {this.state.peers.map((peer) => (
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography><b>{peer.id}</b></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Enode"
                                            secondary={peer.enode}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Name"
                                            secondary={peer.name}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Local Address"
                                            secondary={peer.network.localAddress}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Remote Address"
                                            secondary={peer.network.remoteAddress}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Inbound"
                                            secondary={peer.network.inbound.toString()}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Trusted"
                                            secondary={peer.network.trusted.toString()}
                                        />
                                    </ListItem>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText 
                                            primary="Static"
                                            secondary={peer.network.static.toString()}
                                        />
                                    </ListItem>
                                </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </List>
                :(<Typography variant="h2" align='center'>
                        <p>No Pending Transactions</p>
                    </Typography>)                }
            </Container>
        );
    }
}

export default Peers;