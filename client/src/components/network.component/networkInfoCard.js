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
                <Typography variant="h4" component="p">
                    <b>{this.props.title}:</b>
                </Typography>
                <Typography variant="h5" component="p" style={{textAlign: 'center'}}>
                    {this.props.value}
                </Typography><br/>
                <Typography variant="body2" component="p">
                    Info: {this.props.info}
                </Typography>
            </Card>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NetwworkCard);