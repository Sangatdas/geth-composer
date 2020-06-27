import React, { Component } from "react";

import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = (theme) => ({
    root: {
      padding: theme.spacing(3)
    }
});

class NodeInfo extends Component {
 
    render() {
        const { classes } = this.props;

        return (
            <Paper p={3} className={classes.root} wrap="wrap">
                <Typography>
                    Node Id: {this.props.nodeInfo.id}
                </Typography>
                <Typography>
                    Name: {this.props.nodeInfo.name}
                </Typography>
                <Typography noWrap>
                    {this.props.nodeInfo.enode}
                </Typography>
                <Typography>
                    {this.props.nodeInfo.enr}
                </Typography>
                <Typography>
                    IP: {this.props.nodeInfo.ip}
                </Typography>
                <Typography>
                    Ports: 
                    <Typography>
                        Discovery: {this.props.ports.discovery}
                        Listener: {this.props.ports.listener}
                    </Typography>
                </Typography>                
                <Typography>
                    Listener Address: {this.props.nodeInfo.listenAddr}
                </Typography>                
                <Typography>
                    Protocols: 
                    <Typography>
                        Eth:
                        <Typography>
                            Network: {this.props.eth.network}
                            Difficulty: {this.props.eth.difficulty}
                            Genesis: {this.props.eth.genesis}
                            Config: 
                            <Typography>
                                ChainId: {this.props.config.chainId}
                                HoemsteadBlock: {this.props.config.homesteadBlock}
                                Eip150Block: {this.props.config.eip150Block}
                                Eip150Hash: {this.props.config.eip150Hash}
                                Eip155Block: {this.props.config.eip155Block}
                                Eip158Block: {this.props.config.eip158Block}
                            </Typography>
                            Head: {this.props.eth.head}
                        </Typography>
                    </Typography>
                </Typography>
            </Paper>
        );
    }
}

NodeInfo.propTypes = {
    nodeInfo: PropTypes.object.isRequired,
    ports: PropTypes.object.isRequired,
    eth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    nodeInfo: state.app.nodeInfo,
    ports: state.app.ports,
    eth: state.app.eth,
    config: state.app.config
});

export default connect(mapStateToProps, {})(withStyles(styles, {withTheme: true})(NodeInfo));