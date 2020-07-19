import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, AppBar, Toolbar, IconButton, SwipeableDrawer, Divider } from '@material-ui/core'
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from '@material-ui/core'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import InfoIcon from '@material-ui/icons/Info';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';

import Search from './search.component';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    menuListItem: {
        color: 'black',
        textDecoration: 'none'
    },
});

class MenuBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
        
        this.onToggle = this.onToggle.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    onToggle() {
        this.setState({
            isOpen: this.state.isOpen ? false : true
        });
    }

    closeDrawer() {
        this.setState({
            isOpen: false
        })
    }

    openDrawer() {
        this.setState({
            isOpen: true
        })
    }

    render() {
    
        const { classes } = this.props;

        return(
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.onToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Geth Composer
                            </Typography>
                            <Search/>
                        </Toolbar>
                    </AppBar>
                </div>
                <React.Fragment>
                    <SwipeableDrawer
                    anchor='left'
                    open={this.state.isOpen}
                    onClose={this.closeDrawer}
                    onOpen={this.openDrawer}
                    >
                        <List
                            subheader={
                                <ListSubheader component="div">
                                    Menu
                                </ListSubheader>
                            }
                        >
                            <Divider/>
                            <Link to="/" className={classes.menuListItem} onClick={this.closeDrawer}>
                                <ListItem button>                            
                                    <ListItemIcon><NetworkCheckIcon /></ListItemIcon>
                                    <ListItemText primary="Network"/>
                                </ListItem>
                            </Link>
                            <Link to="/accounts" className={classes.menuListItem} onClick={this.closeDrawer}>
                                <ListItem button>
                                    <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                                    <ListItemText primary="Accounts" />
                                </ListItem>
                            </Link>
                            <Link to="/admin" className={classes.menuListItem} onClick={this.closeDrawer}>
                                <ListItem button>
                                    <ListItemIcon><InfoIcon /></ListItemIcon>
                                    <ListItemText primary="Admin" />
                                </ListItem>
                            </Link>
                            <Link to="/transactions" className={classes.menuListItem} onClick={this.closeDrawer}>
                                <ListItem button>
                                    <ListItemIcon><SyncAltIcon /></ListItemIcon>
                                    <ListItemText primary="Transactions" />
                                </ListItem>
                            </Link>
                        </List>
                    </SwipeableDrawer>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MenuBar);
