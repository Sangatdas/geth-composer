import React, { Component } from 'react';

import { Typography, Card, withStyles } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
        width: theme.spacing(50),
    }
});

class NetwworkCard extends Component {

    render() {

        const { classes } = this.props;

        return (
            <Card className={classes.root} variant="outlined" style={this.props.style}>
                <Typography variant="h4" component="div">
                    <b>{this.props.title}:</b>
                </Typography>
                <Typography variant="h5" component="div" style={{textAlign: 'center'}}>
                    {this.props.value}
                </Typography><br/>
                <Typography variant="body2" component="div">
                    Info: {this.props.info}
                </Typography>
            </Card>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NetwworkCard);