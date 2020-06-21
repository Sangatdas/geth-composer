import React, { Component } from 'react';

import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        width: '100%',
    },
    panel: {
        padding: '1%',
        margin: '5px',
        borderBottom: '1px solid rgba(0, 0, 0, .125)'
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanel: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
        expanded: {},
    }
});

class PeerExpansionPanel extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={classes.panel}
                    >
                        <Typography className={classes.heading}>{this.props.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <p>From: {this.props.details.from}</p>
                            <p>To: {this.props.details.to}</p>
                            <p>Value: {this.props.details.value}</p>
                            <p>Gas: {this.props.details.gas}</p>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PeerExpansionPanel);