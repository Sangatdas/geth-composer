import React, { Component } from "react";

import { Container, Typography, Toolbar, Button } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core/';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import Swal from 'sweetalert2';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

import axios from 'axios';

class Peers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            peers: []
        }
        this.addPeer = this.addPeer.bind(this);
    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/admin/',
            timeout: 5000,
            headers: {'provider': localStorage.getItem("web3_provider")}
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

    addPeer() {
        Swal.fire({
            title: 'Add Peer',
            input: 'textarea',
            inputPlaceHolder: 'Enter enode',
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: (enode) => {   
              return axios.post(`http://localhost:5000/admin/addPeer/`, {}, {
                    headers: {
                        provider: localStorage.getItem("web3_provider"),
                        enode: enode
                    }
                })
                .then(response => {
                  if (!response.data.msg) {
                    throw new Error(response)
                  }
                  return response;
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Failed to add peer with enode: ${enode}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if(result.dismiss !== "cancel" && result.dismiss !== "backdrop") {
                Swal.fire({
                  title: 'Added peer successfully',
                  icon: 'success'
                })
              }
            })
    }

    render() {
        return (
            <Container>
                {this.state.peers.length>0?
                    <List subheader={
                        <Toolbar component="div">
                            <div style={{flexGrow: 1}}><h1>Peers</h1></div>
                            <Button variant="text" color="primary" onClick={this.addPeer}>Add Peer</Button>
                        </Toolbar>  
                    }
                    >
                    {this.state.peers.map((peer) => (
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography><b>{peer.id}</b></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <List>
                                   
                                    <ListItem>
                                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                                        <ListItemText style={{wordBreak: 'break-word'}}
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
                :(<Typography variant="h3" align='center'>
                        <p>No Peers added in network</p>
                        <Button variant="contained" color="primary" size="large" onClick={this.addPeer}>Add Peer</Button>
                    </Typography>)}
            </Container>
        );
    }
}

export default Peers;