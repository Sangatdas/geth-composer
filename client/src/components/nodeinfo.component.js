import React, { Component } from "react";

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader, Divider, Collapse } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import WifiIcon from '@material-ui/icons/Wifi';
import DnsIcon from '@material-ui/icons/Dns';
import InfoIcon from '@material-ui/icons/Info';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const styles = (theme) => ({
    root: {
      padding: theme.spacing(3)
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class NodeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openProtocols: false,
            openEth: false,
            openConfig: false,
        }
        this.expandProtocols = this.expandProtocols.bind(this);
        this.expandEth = this.expandEth.bind(this);
        this.expandConfig = this.expandConfig.bind(this);

    }

    expandProtocols() {
        this.setState({
            openProtocols: this.state.openProtocols ? false : true
        });
    }

    expandEth() {
        this.setState({
            openEth: this.state.openEth ? false : true
        });
    }

    expandConfig() {
        this.setState({
            openConfig: this.state.openConfig ? false : true
        });
    }
 
    render() {
        const { classes } = this.props;

        return (
            <Paper p={3} className={classes.root} wrap="wrap">
                <List
                    subheader={
                        <ListSubheader component="div">
                            Node Info
                        </ListSubheader>
                    }
                >
                    <Divider/>
                    <ListItem button>                            
                        <ListItemIcon><LaptopMacIcon /></ListItemIcon>
                        <ListItemText
                            primary="Node Id"
                            secondary={this.props.nodeInfo.id}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><DnsIcon /></ListItemIcon>
                        <ListItemText 
                            primary="Name"
                            secondary={this.props.nodeInfo.name}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><LaptopMacIcon /></ListItemIcon>
                        <ListItemText 
                            primary="Enode"
                            secondary={this.props.nodeInfo.enode}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><LaptopMacIcon /></ListItemIcon>
                        <ListItemText
                            primary="Enr"
                            secondary={this.props.nodeInfo.enr}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><WifiIcon /></ListItemIcon>
                        <ListItemText
                            primary="IP"
                            secondary={this.props.nodeInfo.ip}
                        />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SettingsInputComponentIcon /></ListItemIcon>
                        <ListItemText
                            primary="Ports"
                            secondary={"Discovery: " + this.props.ports.discovery + "  |  Listener: " + this.props.ports.listener}
                        />
                    </ListItem>
                    <ListItem id="openProtocols" button onClick={this.expandProtocols}>
                        <ListItemIcon><InfoIcon /></ListItemIcon>
                        <ListItemText primary="Protocols" />
                        {this.state.openProtocols ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openProtocols} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem id="openEth" button onClick={this.expandEth}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="Eth" />
                                {this.state.openEth ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.openEth} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <WifiIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Network"
                                            secondary={this.props.eth.network}    
                                        />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InfoIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Difficulty"
                                            secondary={this.props.eth.difficulty}
                                        />
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InfoIcon />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Genesis"
                                            secondary={this.props.eth.genesis}
                                        />
                                    </ListItem>
                                    <ListItem id="openConfig" button onClick={this.expandConfig}>
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Config" />
                                        {this.state.openConfig ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.openConfig} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary="Chain Id"
                                                    secondary={this.props.config.chainId}
                                                />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText 
                                                    primary="HomesteadBlock"
                                                    secondary={this.props.config.homesteadBlock}
                                                />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Eip150Block"
                                                    secondary={this.props.config.eip150Block}
                                                />
                                            </ListItem>                                
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Eip150Hash"
                                                    secondary={this.props.config.eip150Hash}
                                                />
                                            </ListItem>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Eip155Block"
                                                    secondary={this.props.config.eip155Block}
                                                />
                                            </ListItem>                                
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <AccountTreeIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Eip158Block"
                                                    secondary={this.props.config.eip158Block}
                                                />
                                            </ListItem>                                
                                        </List>
                                    </Collapse>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <AccountTreeIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Head"
                                            secondary={this.props.eth.head}
                                        />
                                    </ListItem>   
                                </List>
                            </Collapse>
                        </List>
                    </Collapse>
                </List>
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