import React, { Component } from "react";

import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import axios from 'axios';

const styles = (theme) => ({
    root: {
      padding: theme.spacing(3)
    }
});

class NodeInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nodeInfo: {},
            ports: {},
            eth: {},
            config: {}
        }
    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/admin/',
            timeout: 5000,
            headers: {'provider': 'http://localhost:8545'}
          }).get('nodeInfo')
            .then((response) => {   
                this.setState({
                    nodeInfo: response.data,
                    ports: response.data.ports,
                    eth: response.data.protocols.eth,
                    config: response.data.protocols.eth.config
                });
            })
            .catch((err) => {
              console.log(err);
            });        
    }
  
    render() {
        const { classes } = this.props;

        return (
            <Paper p={3} className={classes.root} wrap="wrap">
                <Typography>
                    Node Id: {this.state.nodeInfo.id}
                </Typography>
                <Typography>
                    Name: {this.state.nodeInfo.name}
                </Typography>
                <Typography noWrap>
                    {this.state.nodeInfo.enode}
                </Typography>
                <Typography>
                    {this.state.nodeInfo.enr}
                </Typography>
                <Typography>
                    IP: {this.state.nodeInfo.ip}
                </Typography>
                <Typography>
                    Ports: 
                    <Typography>
                        Discovery: {this.state.ports.discovery}
                        Listener: {this.state.ports.listener}
                    </Typography>
                </Typography>                
                <Typography>
                    Listener Address: {this.state.nodeInfo.listenAddr}
                </Typography>                
                <Typography>
                    Protocols: 
                    <Typography>
                        Eth:
                        <Typography>
                            Network: {this.state.eth.network}
                            Difficulty: {this.state.eth.difficulty}
                            Genesis: {this.state.eth.genesis}
                            Config: 
                            <Typography>
                                ChainId: {this.state.config.chainId}
                                HoemsteadBlock: {this.state.config.homesteadBlock}
                                Eip150Block: {this.state.config.eip150Block}
                                Eip150Hash: {this.state.config.eip150Hash}
                                Eip155Block: {this.state.config.eip155Block}
                                Eip158Block: {this.state.config.eip158Block}
                            </Typography>
                            Head: {this.state.eth.head}
                        </Typography>
                    </Typography>
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NodeInfo);