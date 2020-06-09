import React, { Component } from 'react';

import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class AppMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: ["Set Provider", "Start Miner", "Stop Miner"],
            anchorEl: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(e) {
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleClose() {
        this.setState({
            anchorEl: null
        });
    }

    render() {

        const ITEM_HEIGHT = 48;
        var open = Boolean(this.state.anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon style={{color: "white"}} />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center', }}
                    PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch', }, }}
                >
                    {this.state.options.map((option) => (
                        <MenuItem key={option} onClick={this.handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default AppMenu;