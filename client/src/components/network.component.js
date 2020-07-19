import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import NetwworkCard from './network.info.component';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <NetwworkCard title="Chain Id" value={this.props.networkInfo.chainId} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Syncing" value={this.props.networkInfo.isSyncing?"True":"False"} info="Check whether current node is syncing or not" style={{width:'15%'}} />
                    <NetwworkCard title="Mining" value={this.props.networkInfo.isMining?"True":"False"} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Block Number" value={this.props.networkInfo.BlockNumber} info="Gives Chain Id of current network" style={{width:'15%'}} />
                    <NetwworkCard title="Protocol Version" value={this.props.networkInfo.ProtocolVersion} info="Gives protocol version of current network" style={{width:'20%'}} />
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="WorkTarget" value={this.props.networkInfo.workTarget} info="Gives work target of current network" style={{width:'45%'}} />
                    <NetwworkCard title="Hash Rate" value={this.props.networkInfo.HashRate} info="Gives Chain Id of current network" />                    
                    <NetwworkCard title="Gas Price" value={this.props.networkInfo.GasPrice} info="Gives Chain Id of current network" />
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="Current Block" value={this.props.networkInfo.currentBlock} info="Gives block id of current block" style={{width:'45%'}} />
                    <NetwworkCard title="Coinbase Address" value={this.props.networkInfo.coinbase} info="Gives coinbase address of current node"  style={{width:'45%'}} />
                    
                </div>
                <div className={classes.root}>
                    <NetwworkCard title="Seed Hash" value={this.props.networkInfo.seedHash} info="Gives seed hash of current network" style={{width:'50%'}} />    
                    <NetwworkCard title="Node Info" value={this.props.networkInfo.nodeInfo} info="Gives version info of current node" style={{width:'40%'}} />
                </div>
            </div>
        );
    }

}

Network.propTypes = {
    networkInfo: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    networkInfo: state.app.gethInfo
});

export default connect(mapStateToProps, {})(withStyles(styles, {withTheme: true})(Network));