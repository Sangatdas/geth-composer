const router = require('express').Router();
const EthService = require('../services/eth.service');
const EthTransactionRouter = require('./eth.transaction.routes');
const EthTransactionService = require('../services/eth.transaction.service');


router.get("/", (req, res) => {
    EthService.getAllInfo(req.headers.provider).then((response) => {
        if(response) {
            console.log("Geth Info: ", response);
            res.status(200).json(response);
        } else {
            console.log("Unable to retrieve info");
            res.status(404).json({error: "Unable to retrieve info for geth instance."});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.get("/:id/balance/", (req, res) => {
    EthService.getBalance(req.params.id, req.headers.provider).then((balance) => {
        if (balance) {
            console.log("Balance of account " + req.params.id + " is: " + balance);
            res.status(200).json({balance: balance});
        } else {
            console.log("Unable to retrieve balance");
            res.status(404).json({error: "Unable to retrieve balance for account " + req.params.id});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.get("/accounts/", (req, res) => {
    EthService.getAccounts(req.headers.provider).then((accounts) => {
        let response = {};
        response.accounts = accounts;
        if (accounts) {
            console.log("Accounts: ", accounts);
            res.status(200).send(response);
        } else {
            console.log("Unable to retrieve balance");
            res.status(404).json({error: "Unable to retrieve balance for account " + req.params.id});
        }
    }).catch((err) => {
        console.log("Error caught: ", err);
        res.sendStatus(500);
    });
});

router.use("/transaction/", EthTransactionRouter);


module.exports = router;