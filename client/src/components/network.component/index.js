import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import NetwworkCard from './networkInfoCard';

import axios from 'axios';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(2),
          height: theme.spacing(16),
        },
      },
});

class Network extends Component {

    constructor(props) {
        super(props);

        this.state = {
            networkInfo: {}
        }
    }

    componentDidMount() {
        axios.create({
            baseURL: 'http://localhost:5000/eth/',
            timeout: 5000,
            headers: {'provider': 'http://localhost:8545'}
          }).get('/')
            .then((response) => {   
              this.setState({
                  networkInfo: response.data
              });
            })
            .catch((err) => {
              console.log(err);
            });      
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <NetwworkCard title="Chain Id" value={this.state.networkInfo.chainId} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Syncing" value={this.state.networkInfo.isSyncing?"True":"False"} info="Check whether current node is syncing or not" style={{width:'15%'}} />
                    <NetwworkCard title="Mining" value={this.state.networkInfo.isMining?"True":"False"} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Block Number" value={this.state.networkInfo.BlockNumber} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Protocol Version" value={this.state.networkInfo.ProtocolVersion} info="Gives protocol version of current network" style={{width:'20%'}} />
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="WorkTarget" value={this.state.networkInfo.workTarget} info="Gives work target of current network" style={{width:'45%'}} />
                    <NetwworkCard title="Hash Rate" value={this.state.networkInfo.HashRate} info="Gives Chain Id of current network" />                    
                    <NetwworkCard title="Gas Price" value={this.state.networkInfo.GasPrice} info="Gives Chain Id of current network" />
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="Current Block" value={this.state.networkInfo.currentBlock} info="Gives block id of current block" style={{width:'45%'}} />
                    <NetwworkCard title="Coinbase Address" value={this.state.networkInfo.coinbase} info="Gives coinbase address of current node"  style={{width:'45%'}} />
                    
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="Seed Hash" value={this.state.networkInfo.seedHash} info="Gives seed hash of current network" style={{width:'50%'}} />    
                    <NetwworkCard title="Node Info" value={this.state.networkInfo.nodeInfo} info="Gives version info of current node" style={{width:'40%'}} />
                </div>
            </div>
        );
    }

}

export default withStyles(styles, {withTheme: true})(Network);