const router = require('express').Router();

const PersonalService = require('../services/personal.service');

router.post('/newAccount', (req, res) => {
    PersonalService.createNewAccount(req.body.pwd, req.headers.provider).then((addr) => {
        if(addr) {
            console.log("Account created: ", addr);
            res.status(200).json({newAccountAddress: addr});
        } else {
            console.log("Unable to create account");
            res.status(400).json({error: "Unable to create account."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.post('/lockAccount/:address', (req, res) => {
    PersonalService.lockAccount(req.params.address, req.headers.provider).then((locked) => {
        if(locked) {
            console.log("Account Locked: ", req.params.address);
            res.sendStatus(204);
        } else {
            console.log("Unable to lock account");
            res.status(400).json({error: "Unable to lock account."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.post('/unlockAccount/:address', (req, res) => {
    PersonalService.unlockAccount(req.params.address, req.body.pwd, req.headers.provider).then((unlocked) => {
        if(unlocked) {
            console.log("Account Unlocked: ", req.params.address);
            res.sendStatus(204);
        } else {
            console.log("Unable to unlock account");
            res.status(400).json({error: "Unable to lock account. Please check if you're entering correct password for corresponding account."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

module.exports = router;