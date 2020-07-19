import React, { Component } from "react";

import { Container, Typography } from '@material-ui/core';

import PeerExpansionPanel from './peer.component';

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
                    this.state.peers.map((peer) => (
                        <PeerExpansionPanel details={peer} title={peer.id}/>
                    )):<Typography variant="h2" align='center'>
                            <p>No peers found</p>
                        </Typography>
                }
            </Container>
        );
    }
}

export default Peers;